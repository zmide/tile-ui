import { parseColorRgb, resolveTheme } from './theme';
import type { LivelinePalette, ThemeMode } from './types';

/** A browser-resolved snapshot; safe to consume from pure palette functions/render code. */
export interface LivelineAppearance {
	mode: ThemeMode;
	/** Do not emit a data-theme boundary when inheriting the stylesheet's mode. */
	inherited?: boolean;
	palette: Partial<LivelinePalette>;
	colors: Record<string, string>;
}

function colorMode(value: string): ThemeMode | undefined {
	const mode = value.trim();
	return mode === 'light' || mode === 'dark' ? mode : undefined;
}

function concreteColor(color: string): boolean {
	return /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color.trim()) || /^rgba?\([\d\s.,%+\-/]+\)$/i.test(color.trim());
}

/** Resolve the browser's supported CSS colors to sRGB before any canvas color math. */
function colorResolver(element: HTMLElement): { resolve: (color: string) => string | undefined; destroy: () => void } {
	const document = element.ownerDocument;
	const view = document.defaultView!;
	const probe = document.createElement('span');
	probe.setAttribute('aria-hidden', 'true');
	probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;overflow:hidden';
	element.appendChild(probe);
	let context: CanvasRenderingContext2D | null | undefined;
	const cache = new Map<string, string | undefined>();
	return {
		resolve(color) {
			if (cache.has(color)) return cache.get(color);
			// Avoid changing legacy accents (and avoid browser work for their gradients).
			if (concreteColor(color)) return color;
			probe.style.color = '';
			probe.style.color = color;
			if (!probe.style.color) return undefined;
			const computed = view.getComputedStyle(probe).color;
			let resolved: string | undefined;
			if (concreteColor(computed)) {
				const [r, g, b] = parseColorRgb(computed);
				const alpha = computed.match(/[,/]\s*([\d.]+%?)\s*\)$/)?.[1];
				// Only rgba/comma-fourth-channel and slash syntax contain an alpha channel.
				const hasAlpha = computed.includes('/') || computed.split(',').length === 4;
				const a = hasAlpha && alpha ? parseFloat(alpha) / (alpha.endsWith('%') ? 100 : 1) : 1;
				resolved = `rgba(${r}, ${g}, ${b}, ${a})`;
			} else if (computed && !computed.includes('var(')) {
				// getComputedStyle may retain oklch()/color()/color-mix(). Rasterization
				// converts those supported browser colors to concrete, clipped sRGB.
				try {
					if (context === undefined) {
						const canvas = document.createElement('canvas');
						canvas.width = canvas.height = 1;
						context = canvas.getContext('2d', { willReadFrequently: true });
					}
					if (context) {
						context.clearRect(0, 0, 1, 1);
						context.fillStyle = computed;
						context.fillRect(0, 0, 1, 1);
						const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
						resolved = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
					}
				} catch {
					// Non-browser renderers may not implement canvas; retain legacy colors.
				}
			}
			cache.set(color, resolved);
			return resolved;
		},
		destroy: () => probe.remove(),
	};
}

/**
 * Browser boundary for the generic --tile-color-mode contract. Omitted themes read
 * the parent so the adapter's own resolved data-theme does not lock inheritance.
 * Explicit themes never inherit a conflicting parent's semantic palette.
 */
export function readLivelineAppearance(element?: HTMLElement | null, theme?: ThemeMode, colors: readonly string[] = []): LivelineAppearance {
	const fallback: LivelineAppearance = { mode: theme ?? 'dark', palette: {}, colors: {} };
	const view = element?.ownerDocument.defaultView;
	if (!element || !view) return fallback;
	const computed = view.getComputedStyle(element);
	const inheritedMode = element.parentElement ? colorMode(view.getComputedStyle(element.parentElement).getPropertyValue('--tile-color-mode')) : undefined;
	const mode = theme ?? inheritedMode ?? 'dark';
	const themed = colorMode(computed.getPropertyValue('--tile-color-mode')) === mode;
	const resolver = colorResolver(element);
	try {
		const resolvedColors: Record<string, string> = {};
		for (const color of colors) {
			const resolved = resolver.resolve(color);
			if (resolved) resolvedColors[color] = resolved;
		}
		const palette: Partial<LivelinePalette> = {};
		if (themed) {
			const semantic = (...names: string[]) => {
				const value = names.map((name) => computed.getPropertyValue(name).trim()).find(Boolean);
				return value ? resolver.resolve(value) : undefined;
			};
			const background = semantic('--tile-liveline-background', '--background');
			const foreground = semantic('--tile-liveline-foreground', '--foreground');
			const muted = semantic('--tile-liveline-muted-foreground', '--muted-foreground');
			const border = semantic('--tile-liveline-border', '--border');
			const surface = semantic('--tile-liveline-tooltip-background', '--popover', '--background');
			const text = semantic('--tile-liveline-tooltip-foreground', '--popover-foreground', '--foreground');
			if (background) palette.bgRgb = parseColorRgb(background);
			if (foreground) palette.tooltipText = foreground;
			if (muted) palette.gridLabel = palette.refLabel = palette.timeLabel = muted;
			if (border) palette.gridLine = palette.refLine = palette.crosshairLine = palette.tooltipBorder = border;
			if (surface) palette.tooltipBg = palette.badgeOuterBg = surface;
			if (text) palette.tooltipText = text;
		}
		return { mode, inherited: !theme && Boolean(inheritedMode), palette, colors: resolvedColors };
	} finally {
		resolver.destroy();
	}
}

/** Pure palette construction from a browser snapshot (or the legacy SSR default). */
export function resolveLivelinePalette(color: string, appearance: LivelineAppearance): LivelinePalette {
	// Unsupported browser colors must not quietly become parseColorRgb's gray.
	const resolved = appearance.colors[color] ?? (concreteColor(color) ? color : '#3b82f6');
	return { ...resolveTheme(resolved, appearance.mode), ...appearance.palette };
}

/** Observe only theme-bearing ancestors, never canvas/value DOM mutations. */
export function observeLivelineAppearance(
	element: HTMLElement,
	read: () => { theme?: ThemeMode; colors: readonly string[] },
	onChange: (appearance: LivelineAppearance) => void,
): () => void {
	const view = element.ownerDocument.defaultView;
	let previous = '';
	const update = () => {
		const { theme, colors } = read();
		const appearance = readLivelineAppearance(element, theme, colors);
		const next = JSON.stringify(appearance);
		if (next !== previous) {
			previous = next;
			onChange(appearance);
		}
	};
	const observer = view?.MutationObserver ? new view.MutationObserver(update) : undefined;
	for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
		observer?.observe(ancestor, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
	}
	// Covers a stylesheet loaded after mounting without observing unrelated DOM updates.
	view?.addEventListener('load', update, true);
	update();
	return () => {
		observer?.disconnect();
		view?.removeEventListener('load', update, true);
	};
}
