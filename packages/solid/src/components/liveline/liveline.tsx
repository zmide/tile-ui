import { createEffect, createSignal, For, onCleanup, onMount, Show, splitProps, type JSX } from 'solid-js';
import {
	SERIES_COLORS,
	createLivelineEngine,
	observeLivelineAppearance,
	readLivelineAppearance,
	resolveLivelinePalette,
	type LivelineAppearance,
	type LivelineEngine,
	type LivelineEngineConfig,
	type LivelineOptions,
	type Momentum,
} from '@tile-ui/core/liveline';
import styles from '@tile-ui/styles/scss/components/liveline.module.scss';

const defaultFormatValue = (value: number) => value.toFixed(2);
const defaultFormatTime = (time: number) => {
	const date = new Date(time * 1000);
	return [date.getHours(), date.getMinutes(), date.getSeconds()].map((part) => part.toString().padStart(2, '0')).join(':');
};

export type LivelineProps = LivelineOptions &
	Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof LivelineOptions | 'children' | 'ref'> & {
		className?: string;
		/** Chart-only styling; style sizes the complete widget, including controls. */
		surfaceStyle?: JSX.CSSProperties;
		surfaceClassName?: string;
		ref?: (element: HTMLDivElement) => void;
	};

interface Indicator {
	left: number;
	width: number;
}

function indicatorFor(bar: HTMLDivElement | undefined, button: HTMLButtonElement | undefined): Indicator | undefined {
	if (!bar || !button) return undefined;
	const barRect = bar.getBoundingClientRect();
	const buttonRect = button.getBoundingClientRect();
	return { left: buttonRect.left - barRect.left, width: buttonRect.width };
}

export function Liveline(props: LivelineProps) {
	const [, rootProps] = splitProps(props, [
		'data',
		'value',
		'series',
		'theme',
		'color',
		'window',
		'grid',
		'badge',
		'momentum',
		'fill',
		'loading',
		'paused',
		'emptyText',
		'scrub',
		'exaggerate',
		'showValue',
		'valueMomentumColor',
		'degen',
		'badgeTail',
		'windows',
		'onWindowChange',
		'windowStyle',
		'badgeVariant',
		'tooltipY',
		'tooltipOutline',
		'orderbook',
		'referenceLine',
		'formatValue',
		'formatTime',
		'lerpSpeed',
		'padding',
		'onHover',
		'cursor',
		'pulse',
		'lineWidth',
		'mode',
		'candles',
		'candleWidth',
		'liveCandle',
		'lineMode',
		'lineData',
		'lineValue',
		'onModeChange',
		'onSeriesToggle',
		'seriesToggleCompact',
		'className',
		'surfaceStyle',
		'surfaceClassName',
		'ref',
		'aria-label',
		'aria-describedby',
	]);
	let root: HTMLDivElement | undefined;
	let surface: HTMLDivElement | undefined;
	let canvas: HTMLCanvasElement | undefined;
	let valueElement: HTMLSpanElement | undefined;
	let windowBar: HTMLDivElement | undefined;
	let modeBar: HTMLDivElement | undefined;
	let engine: LivelineEngine | undefined;
	const windowButtons = new Map<number, HTMLButtonElement>();
	const modeButtons = new Map<string, HTMLButtonElement>();
	const [windowIndicator, setWindowIndicator] = createSignal<Indicator>();
	const [modeIndicator, setModeIndicator] = createSignal<Indicator>();
	const [hiddenSeries, setHiddenSeries] = createSignal(new Set<string>());
	const [activeWindowSecs, setActiveWindowSecs] = createSignal(props.windows?.[0]?.secs ?? props.window ?? 30);
	const [lastSeries, setLastSeries] = createSignal(props.series ?? []);
	const [appearance, setAppearance] = createSignal<LivelineAppearance>({ mode: props.theme ?? 'dark', palette: {}, colors: {} });
	const appearanceOptions = () => ({
		theme: props.theme,
		colors: [props.color ?? '#3b82f6', ...(props.series?.map((series, index) => series.color || SERIES_COLORS[index % SERIES_COLORS.length]) ?? [])],
	});
	const currentAppearance = (): LivelineAppearance =>
		props.theme && appearance().mode !== props.theme ? { mode: props.theme, palette: {}, colors: appearance().colors } : appearance();

	const theme = () => currentAppearance().mode;
	const windowStyle = () => props.windowStyle ?? 'default';
	const activeMode = () => ((props.mode ?? 'line') === 'candle' && props.lineMode ? 'line' : (props.mode ?? 'line'));
	const shownSeries = () => lastSeries();
	const isMultiSeries = () => Boolean(props.series?.length);
	const padding = () => {
		const defaultRight = (props.badge ?? true) ? 80 : (props.grid ?? true) ? 54 : 12;
		return {
			top: props.padding?.top ?? 12,
			right: props.padding?.right ?? defaultRight,
			bottom: props.padding?.bottom ?? 28,
			left: props.padding?.left ?? 12,
		};
	};

	function readConfig(): LivelineEngineConfig {
		const color = props.color ?? '#3b82f6';
		const series = props.series;
		const multi = Boolean(series?.length);
		const currentPadding = padding();
		const palette = { ...resolveLivelinePalette(color, currentAppearance()), ...(props.lineWidth == null ? {} : { lineWidth: props.lineWidth }) };
		const multiSeries = series?.map((item, index) => ({
			id: item.id,
			data: item.data,
			value: item.value,
			palette: resolveLivelinePalette(item.color || SERIES_COLORS[index % SERIES_COLORS.length], currentAppearance()),
			label: item.label,
		}));
		const momentum = props.momentum ?? true;
		const degen = props.degen;

		return {
			data: props.data,
			value: props.value,
			palette,
			windowSecs: props.windows?.length ? activeWindowSecs() : (props.window ?? 30),
			lerpSpeed: props.lerpSpeed ?? 0.08,
			showGrid: props.grid ?? true,
			showBadge: multi ? false : (props.badge ?? true),
			showMomentum: multi ? false : momentum !== false,
			momentumOverride: typeof momentum === 'string' ? (momentum as Momentum) : undefined,
			showFill: multi ? false : (props.fill ?? true),
			referenceLine: props.referenceLine,
			formatValue: props.formatValue ?? defaultFormatValue,
			formatTime: props.formatTime ?? defaultFormatTime,
			padding: currentPadding,
			onHover: props.onHover,
			showPulse: props.pulse ?? true,
			scrub: props.scrub ?? true,
			exaggerate: props.exaggerate ?? false,
			degenOptions: multi || !degen ? undefined : typeof degen === 'object' ? degen : {},
			badgeTail: props.badgeTail ?? true,
			badgeVariant: props.badgeVariant ?? 'default',
			tooltipY: props.tooltipY ?? 14,
			tooltipOutline: props.tooltipOutline ?? true,
			valueMomentumColor: props.valueMomentumColor ?? false,
			valueElement: props.showValue ? valueElement : undefined,
			orderbookData: props.orderbook,
			loading: props.loading ?? false,
			paused: props.paused ?? false,
			emptyText: props.emptyText,
			mode: props.mode ?? 'line',
			candles: props.candles,
			candleWidth: props.candleWidth,
			liveCandle: props.liveCandle,
			lineMode: props.lineMode,
			lineData: props.lineData,
			lineValue: props.lineValue,
			multiSeries,
			isMultiSeries: multi,
			hiddenSeriesIds: hiddenSeries(),
		};
	}

	onMount(() => {
		if (!surface || !canvas) return;
		const stopAppearance = root ? observeLivelineAppearance(root, appearanceOptions, setAppearance) : undefined;
		engine = createLivelineEngine({ container: surface, canvas }, readConfig());
		setWindowIndicator(indicatorFor(windowBar, windowButtons.get(activeWindowSecs())));
		if (props.onModeChange) setModeIndicator(indicatorFor(modeBar, modeButtons.get(activeMode())));
		onCleanup(() => {
			stopAppearance?.();
			engine?.destroy();
			engine = undefined;
		});
	});

	createEffect(() => {
		const { theme, colors } = appearanceOptions();
		if (root) setAppearance(readLivelineAppearance(root, theme, colors));
	});

	createEffect(() => {
		const config = readConfig();
		engine?.update(config);
	});

	createEffect(() => {
		const series = props.series;
		if (series?.length) setLastSeries(series);
	});

	createEffect(() => {
		const active = activeWindowSecs();
		const windows = props.windows;
		const fallback = props.window ?? 30;
		if (!windows?.length && active !== fallback) setActiveWindowSecs(fallback);
		else if (windows?.length && !windows.some((option) => option.secs === active)) setActiveWindowSecs(windows[0].secs);
		setWindowIndicator(indicatorFor(windowBar, windowButtons.get(active)));
	});

	createEffect(() => {
		const series = props.series;
		const ids = new Set(series?.map((item) => item.id) ?? []);
		const current = hiddenSeries();
		const next = new Set([...current].filter((id) => ids.has(id)));
		if (series?.length && next.size === series.length) next.delete(series[0].id);
		if (next.size !== current.size || [...next].some((id) => !current.has(id))) setHiddenSeries(next);
	});

	createEffect(() => {
		const active = activeMode();
		if (props.onModeChange) setModeIndicator(indicatorFor(modeBar, modeButtons.get(active)));
	});

	function toggleSeries(id: string) {
		if (!isMultiSeries()) return;
		const next = new Set(hiddenSeries());
		if (next.has(id)) {
			next.delete(id);
			props.onSeriesToggle?.(id, true);
		} else {
			if ((props.series?.length ?? 0) - next.size <= 1) return;
			next.add(id);
			props.onSeriesToggle?.(id, false);
		}
		setHiddenSeries(next);
	}

	const summary = () => props['aria-label'] ?? `Live chart, current value ${(props.formatValue ?? defaultFormatValue)(props.value)}`;
	const hasControls = () => Boolean(props.windows?.length || props.onModeChange || shownSeries().length > 1);

	return (
		<div
			{...rootProps}
			ref={(element) => {
				root = element;
				props.ref?.(element);
			}}
			data-slot="liveline"
			data-theme={currentAppearance().inherited ? undefined : theme()}
			data-color-mode={theme()}
			class={`${styles.root} ${props.class ?? ''} ${props.className ?? ''}`}
			style={props.style}>
			<Show when={props.showValue}>
				<span
					ref={(element) => (valueElement = element)}
					data-slot="liveline-value"
					class={styles.value}
					style={{ 'padding-left': `${padding().left}px` }}
					aria-hidden="true"
				/>
			</Show>
			<Show when={hasControls()}>
				<div data-slot="liveline-controls" class={styles.controls} style={{ 'padding-left': `${padding().left}px` }}>
					<Show when={Boolean(props.windows?.length)}>
						<div
							ref={(element) => (windowBar = element)}
							role="group"
							data-slot="liveline-window-controls"
							data-style={windowStyle()}
							class={styles.controlGroup}
							aria-label="Chart time range">
							<Show when={windowStyle() !== 'text' && windowIndicator()}>
								<span
									data-slot="liveline-control-indicator"
									class={styles.indicator}
									style={{ left: `${windowIndicator()!.left}px`, width: `${windowIndicator()!.width}px` }}
								/>
							</Show>
							<For each={props.windows}>
								{(option) => {
									const active = () => option.secs === activeWindowSecs();
									return (
										<button
											ref={(element) => windowButtons.set(option.secs, element)}
											type="button"
											data-slot="liveline-window-control"
											data-active={active() || undefined}
											class={styles.control}
											aria-label={`Show ${option.label} time range`}
											aria-pressed={active()}
											onClick={() => {
												setActiveWindowSecs(option.secs);
												props.onWindowChange?.(option.secs);
											}}>
											{option.label}
										</button>
									);
								}}
							</For>
						</div>
					</Show>
					<Show when={props.onModeChange}>
						<div
							ref={(element) => (modeBar = element)}
							role="group"
							data-slot="liveline-mode-controls"
							data-style={windowStyle()}
							class={styles.controlGroup}
							aria-label="Chart type">
							<Show when={windowStyle() !== 'text' && modeIndicator()}>
								<span
									data-slot="liveline-control-indicator"
									class={styles.indicator}
									style={{ left: `${modeIndicator()!.left}px`, width: `${modeIndicator()!.width}px` }}
								/>
							</Show>
							<For each={['line', 'candle'] as const}>
								{(item) => {
									const active = () => activeMode() === item;
									return (
										<button
											ref={(element) => modeButtons.set(item, element)}
											type="button"
											data-slot="liveline-mode-control"
											data-active={active() || undefined}
											class={`${styles.control} ${styles.iconControl}`}
											aria-label={`Show ${item} chart`}
											aria-pressed={active()}
											onClick={() => props.onModeChange?.(item)}>
											<Show
												when={item === 'line'}
												fallback={
													<svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
														<line x1="3.5" y1="1" x2="3.5" y2="11" stroke="currentColor" />
														<rect x="2" y="3" width="3" height="5" rx="0.5" fill="currentColor" />
														<line x1="8.5" y1="2" x2="8.5" y2="10" stroke="currentColor" />
														<rect x="7" y="4" width="3" height="4" rx="0.5" fill="currentColor" />
													</svg>
												}>
												<svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
													<path
														d="M1 8.5C2.5 8.5 3 4 5.5 4S7.5 7 8.5 7C9.5 7 10 3.5 11 3.5"
														stroke="currentColor"
														stroke-width={active() ? 1.5 : 1.2}
														stroke-linecap="round"
													/>
												</svg>
											</Show>
										</button>
									);
								}}
							</For>
						</div>
					</Show>
					<Show when={shownSeries().length > 1}>
						<div
							role="group"
							data-slot="liveline-series-controls"
							data-style={windowStyle()}
							data-visible={isMultiSeries()}
							aria-hidden={!isMultiSeries()}
							class={styles.controlGroup}
							aria-label="Chart series">
							<For each={shownSeries()}>
								{(series, index) => {
									const visible = () => !hiddenSeries().has(series.id);
									const label = () => series.label ?? series.id;
									return (
										<button
											type="button"
											data-slot="liveline-series-control"
											disabled={!isMultiSeries()}
											data-active={visible() || undefined}
											class={`${styles.control} ${props.seriesToggleCompact ? styles.compactControl : ''}`}
											aria-label={`${visible() ? 'Hide' : 'Show'} ${label()} series`}
											aria-pressed={visible()}
											onClick={() => toggleSeries(series.id)}>
											<span
												data-slot="liveline-series-swatch"
												class={styles.swatch}
												style={{ background: series.color || SERIES_COLORS[index() % SERIES_COLORS.length] }}
											/>
											<Show when={!props.seriesToggleCompact}>{label()}</Show>
										</button>
									);
								}}
							</For>
						</div>
					</Show>
				</div>
			</Show>
			<div ref={(element) => (surface = element)} data-slot="liveline-surface" class={`${styles.surface} ${props.surfaceClassName ?? ''}`} style={props.surfaceStyle}>
				<canvas
					ref={(element) => (canvas = element)}
					data-slot="liveline-canvas"
					class={styles.canvas}
					style={{ cursor: (props.scrub ?? true) ? (props.cursor ?? 'crosshair') : 'default' }}
					role="img"
					aria-label={summary()}
					aria-describedby={props['aria-describedby']}>
					{summary()}
				</canvas>
			</div>
		</div>
	);
}
