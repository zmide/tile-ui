// @vitest-environment jsdom

import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const engine = vi.hoisted(() => ({ update: vi.fn(), destroy: vi.fn() }));
const create = vi.hoisted(() => vi.fn(() => engine));
vi.mock('@tile-ui/core/liveline', async (importOriginal) => ({ ...(await importOriginal<typeof import('@tile-ui/core/liveline')>()), createLivelineEngine: create }));

import { observeLivelineAppearance, readLivelineAppearance } from '@tile-ui/core/liveline';
import { Liveline } from '../src/components/liveline/liveline';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const roots: Root[] = [];
const data = [{ time: 1, value: 10 }];

function mount(theme?: 'light' | 'dark') {
	const host = document.createElement('div');
	document.body.appendChild(host);
	const root = createRoot(host);
	roots.push(root);
	act(() => root.render(<Liveline data={data} value={10} theme={theme} color="var(--test-accent)" />));
	return { host, root, widget: host.querySelector<HTMLElement>('[data-slot="liveline"]')! };
}

beforeEach(() => {
	vi.clearAllMocks();
	const native = window.getComputedStyle.bind(window);
	// jsdom does not inherit custom properties or resolve var()/oklch(). Simulate
	// only the browser color boundary; framework lifecycles and mutations are real.
	vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
		const computed = native(element);
		let mode = 'dark';
		for (let node: Element | null = element; node; node = node.parentElement) {
			const declared = node.getAttribute('data-theme') ?? (node.classList.contains('light') ? 'light' : node.classList.contains('dark') ? 'dark' : undefined);
			if (declared) {
				mode = declared;
				break;
			}
		}
		const marked = document.documentElement.hasAttribute('data-styled');
		const colors: Record<string, string> = {
			'--tile-color-mode': marked ? mode : '',
			'--background': mode === 'light' ? 'rgb(250, 251, 252)' : 'rgb(12, 13, 14)',
			'--foreground': mode === 'light' ? 'rgb(20, 21, 22)' : 'rgb(240, 241, 242)',
			'--muted-foreground': mode === 'light' ? 'rgb(80, 81, 82)' : 'rgb(170, 171, 172)',
			'--border': mode === 'light' ? 'rgba(20, 21, 22, 0.1)' : 'rgb(50, 51, 52)',
		};
		return new Proxy(computed, {
			get(target, property) {
				if (property === 'getPropertyValue') return (name: string) => colors[name] ?? target.getPropertyValue(name);
				if (property === 'color' && (element as HTMLElement).style.color.includes('var(--test-accent)')) return mode === 'light' ? 'rgb(30, 60, 90)' : 'rgb(80, 100, 120)';
				return Reflect.get(target, property);
			},
		});
	});
});

afterEach(() => {
	for (const root of roots.splice(0)) act(() => root.unmount());
	document.body.innerHTML = '';
	document.documentElement.removeAttribute('data-styled');
	document.documentElement.removeAttribute('data-theme');
	document.documentElement.className = '';
	vi.restoreAllMocks();
});

describe('Liveline stylesheet mode contract', () => {
	it('retains legacy dark without a marker, even below a light selector', () => {
		document.documentElement.className = 'light';
		const { widget } = mount();
		expect(widget.dataset.theme).toBe('dark');
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb).toEqual([10, 10, 10]);
	});

	it('switches an omitted theme and concrete canvas colors without replacing the engine or canvas', async () => {
		document.documentElement.setAttribute('data-styled', '');
		document.documentElement.className = 'light';
		const { widget } = mount();
		const canvas = widget.querySelector('canvas');
		await act(async () => {});
		expect(widget.dataset.colorMode).toBe('light');
		expect(widget.dataset.theme).toBeUndefined();
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb).toEqual([250, 251, 252]);
		expect(engine.update.mock.lastCall?.[0].palette.line).toBe('rgba(30, 60, 90, 1)');
		await act(async () => {
			document.documentElement.className = 'dark';
		});
		expect(widget.dataset.colorMode).toBe('dark');
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb).toEqual([12, 13, 14]);
		expect(engine.update.mock.lastCall?.[0].palette.line).toBe('rgba(80, 100, 120, 1)');
		await act(async () => {
			document.documentElement.setAttribute('data-theme', 'light');
		});
		expect(widget.dataset.colorMode).toBe('light');
		expect(widget.querySelector('canvas')).toBe(canvas);
		expect(create).toHaveBeenCalledTimes(1);
	});

	it('keeps explicit themes authoritative and accepts prop changes', async () => {
		document.documentElement.setAttribute('data-styled', '');
		document.documentElement.className = 'light';
		const { widget, root } = mount('dark');
		expect(widget.dataset.theme).toBe('dark');
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb).toEqual([12, 13, 14]);
		await act(async () => {
			document.documentElement.className = 'dark';
		});
		act(() => root.render(<Liveline data={data} value={10} theme="light" />));
		expect(widget.dataset.theme).toBe('light');
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb).toEqual([250, 251, 252]);
		expect(create).toHaveBeenCalledTimes(1);
	});

	it('inherits the nearest mode boundary and disconnects subscriptions', async () => {
		document.documentElement.setAttribute('data-styled', '');
		document.documentElement.className = 'dark';
		const boundary = document.createElement('section');
		boundary.dataset.theme = 'light';
		const widget = document.createElement('div');
		widget.dataset.theme = 'dark';
		boundary.appendChild(widget);
		document.body.appendChild(boundary);
		expect(readLivelineAppearance(widget).mode).toBe('light');
		const change = vi.fn();
		const stop = observeLivelineAppearance(widget, () => ({ colors: [] }), change);
		await act(async () => {
			boundary.dataset.theme = 'dark';
		});
		expect(change.mock.lastCall?.[0].mode).toBe('dark');
		stop();
		change.mockClear();
		await act(async () => {
			boundary.dataset.theme = 'light';
		});
		expect(change).not.toHaveBeenCalled();
		expect(widget.children).toHaveLength(0);
	});

	it('rasterizes modern browser colors before passing them to palette math', () => {
		vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
			clearRect() {},
			fillRect() {},
			fillStyle: '',
			getImageData: () => ({ data: [20, 40, 60, 128] }),
		} as unknown as CanvasRenderingContext2D);
		const element = document.createElement('div');
		document.body.appendChild(element);
		const appearance = readLivelineAppearance(element, undefined, ['oklch(50% 0.2 120)']);
		expect(appearance.colors['oklch(50% 0.2 120)']).toBe('rgba(20, 40, 60, 0.5019607843137255)');
		expect(element.children).toHaveLength(0);
	});
});
