import { defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch, type CSSProperties, type PropType } from 'vue';
import {
	SERIES_COLORS,
	createLivelineEngine,
	observeLivelineAppearance,
	readLivelineAppearance,
	resolveLivelinePalette,
	type LivelineAppearance,
	type BadgeVariant,
	type CandlePoint,
	type DegenOptions,
	type HoverPoint,
	type LivelineEngine,
	type LivelineEngineConfig,
	type LivelineOptions,
	type LivelinePoint,
	type LivelineSeries,
	type Momentum,
	type OrderbookData,
	type Padding,
	type ReferenceLine,
	type ThemeMode,
	type WindowOption,
	type WindowStyle,
} from '@tile-ui/core/liveline';
import styles from '@tile-ui/styles/scss/components/liveline.module.scss';

const defaultFormatValue = (value: number) => value.toFixed(2);
const defaultFormatTime = (time: number) => {
	const date = new Date(time * 1000);
	return [date.getHours(), date.getMinutes(), date.getSeconds()].map((part) => part.toString().padStart(2, '0')).join(':');
};

export interface LivelineProps extends LivelineOptions {
	data: LivelinePoint[];
	value: number;
	series?: LivelineSeries[];
	theme?: ThemeMode;
	color?: string;
	window?: number;
	grid?: boolean;
	badge?: boolean;
	momentum?: boolean | Momentum;
	fill?: boolean;
	loading?: boolean;
	paused?: boolean;
	emptyText?: string;
	scrub?: boolean;
	exaggerate?: boolean;
	showValue?: boolean;
	valueMomentumColor?: boolean;
	degen?: boolean | DegenOptions;
	badgeTail?: boolean;
	windows?: WindowOption[];
	onWindowChange?: (secs: number) => void;
	windowStyle?: WindowStyle;
	badgeVariant?: BadgeVariant;
	tooltipY?: number;
	tooltipOutline?: boolean;
	orderbook?: OrderbookData;
	referenceLine?: ReferenceLine;
	formatValue?: (value: number) => string;
	formatTime?: (time: number) => string;
	lerpSpeed?: number;
	padding?: Padding;
	onHover?: (point: HoverPoint | null) => void;
	cursor?: string;
	pulse?: boolean;
	lineWidth?: number;
	mode?: 'line' | 'candle';
	candles?: CandlePoint[];
	candleWidth?: number;
	liveCandle?: CandlePoint;
	lineMode?: boolean;
	lineData?: LivelinePoint[];
	lineValue?: number;
	onModeChange?: (mode: 'line' | 'candle') => void;
	onSeriesToggle?: (id: string, visible: boolean) => void;
	seriesToggleCompact?: boolean;
	class?: unknown;
	style?: CSSProperties | string | Array<CSSProperties | string>;
	/** Chart-only styling; style sizes the complete widget, including controls. */
	surfaceStyle?: CSSProperties;
	surfaceClassName?: string;
	'aria-label'?: string;
	'aria-describedby'?: string;
}

type Indicator = { left: number; width: number } | null;

function setIndicator(bar: HTMLDivElement | null, button: HTMLButtonElement | undefined, target: { value: Indicator }) {
	if (!bar || !button) return;
	const barRect = bar.getBoundingClientRect();
	const buttonRect = button.getBoundingClientRect();
	target.value = { left: buttonRect.left - barRect.left, width: buttonRect.width };
}

export const Liveline = defineComponent({
	name: 'Liveline',
	inheritAttrs: false,
	props: {
		surfaceStyle: Object as PropType<CSSProperties>,
		surfaceClassName: String,
		data: { type: Array as PropType<LivelinePoint[]>, required: true },
		value: { type: Number, required: true },
		series: Array as PropType<LivelineSeries[]>,
		theme: String as PropType<ThemeMode>,
		color: { type: String, default: '#3b82f6' },
		window: { type: Number, default: 30 },
		grid: { type: Boolean, default: true },
		badge: { type: Boolean, default: true },
		momentum: { type: [Boolean, String] as PropType<boolean | Momentum>, default: true },
		fill: { type: Boolean, default: true },
		loading: { type: Boolean, default: false },
		paused: { type: Boolean, default: false },
		emptyText: String,
		scrub: { type: Boolean, default: true },
		exaggerate: { type: Boolean, default: false },
		showValue: { type: Boolean, default: false },
		valueMomentumColor: { type: Boolean, default: false },
		degen: [Boolean, Object] as PropType<boolean | DegenOptions>,
		badgeTail: { type: Boolean, default: true },
		windows: Array as PropType<WindowOption[]>,
		onWindowChange: Function as PropType<(secs: number) => void>,
		windowStyle: { type: String as PropType<WindowStyle>, default: 'default' },
		badgeVariant: { type: String as PropType<BadgeVariant>, default: 'default' },
		tooltipY: { type: Number, default: 14 },
		tooltipOutline: { type: Boolean, default: true },
		orderbook: Object as PropType<OrderbookData>,
		referenceLine: Object as PropType<ReferenceLine>,
		formatValue: { type: Function as PropType<(value: number) => string>, default: defaultFormatValue },
		formatTime: { type: Function as PropType<(time: number) => string>, default: defaultFormatTime },
		lerpSpeed: { type: Number, default: 0.08 },
		padding: Object as PropType<Padding>,
		onHover: Function as PropType<(point: HoverPoint | null) => void>,
		cursor: { type: String, default: 'crosshair' },
		pulse: { type: Boolean, default: true },
		lineWidth: Number,
		mode: { type: String as PropType<'line' | 'candle'>, default: 'line' },
		candles: Array as PropType<CandlePoint[]>,
		candleWidth: Number,
		liveCandle: Object as PropType<CandlePoint>,
		lineMode: Boolean,
		lineData: Array as PropType<LivelinePoint[]>,
		lineValue: Number,
		onModeChange: Function as PropType<(mode: 'line' | 'candle') => void>,
		onSeriesToggle: Function as PropType<(id: string, visible: boolean) => void>,
		seriesToggleCompact: { type: Boolean, default: false },
	},
	setup(props, { attrs, expose }) {
		const root = ref<HTMLDivElement | null>(null);
		const surface = ref<HTMLDivElement | null>(null);
		const canvas = ref<HTMLCanvasElement | null>(null);
		const valueElement = ref<HTMLSpanElement | null>(null);
		const windowBar = ref<HTMLDivElement | null>(null);
		const modeBar = ref<HTMLDivElement | null>(null);
		const windowButtons = new Map<number, HTMLButtonElement>();
		const modeButtons = new Map<string, HTMLButtonElement>();
		const windowIndicator = ref<Indicator>(null);
		const modeIndicator = ref<Indicator>(null);
		const hiddenSeries = ref(new Set<string>());
		const activeWindowSecs = ref(props.windows?.[0]?.secs ?? props.window);
		const lastSeries = ref(props.series);
		const appearance = ref<LivelineAppearance>({ mode: props.theme ?? 'dark', palette: {}, colors: {} });
		let engine: LivelineEngine | null = null;
		let stopAppearance: (() => void) | undefined;
		const readAppearanceOptions = () => ({
			theme: props.theme,
			colors: [props.color, ...(props.series?.map((series, index) => series.color || SERIES_COLORS[index % SERIES_COLORS.length]) ?? [])],
		});
		const currentAppearance = (): LivelineAppearance =>
			props.theme && appearance.value.mode !== props.theme ? { mode: props.theme, palette: {}, colors: appearance.value.colors } : appearance.value;

		expose({ element: root });

		function buildConfig(): LivelineEngineConfig {
			if (props.series?.length) lastSeries.value = props.series;
			const isMultiSeries = Boolean(props.series?.length);
			const defaultRight = props.badge ? 80 : props.grid ? 54 : 12;
			const padding = {
				top: props.padding?.top ?? 12,
				right: props.padding?.right ?? defaultRight,
				bottom: props.padding?.bottom ?? 28,
				left: props.padding?.left ?? 12,
			};
			const palette = { ...resolveLivelinePalette(props.color, currentAppearance()), ...(props.lineWidth == null ? {} : { lineWidth: props.lineWidth }) };
			const multiSeries = props.series?.map((series, index) => ({
				id: series.id,
				data: series.data,
				value: series.value,
				palette: resolveLivelinePalette(series.color || SERIES_COLORS[index % SERIES_COLORS.length], currentAppearance()),
				label: series.label,
			}));
			return {
				data: props.data,
				value: props.value,
				palette,
				windowSecs: props.windows?.length ? activeWindowSecs.value : props.window,
				lerpSpeed: props.lerpSpeed,
				showGrid: props.grid,
				showBadge: isMultiSeries ? false : props.badge,
				showMomentum: isMultiSeries ? false : props.momentum !== false,
				momentumOverride: typeof props.momentum === 'string' ? props.momentum : undefined,
				showFill: isMultiSeries ? false : props.fill,
				referenceLine: props.referenceLine,
				formatValue: props.formatValue,
				formatTime: props.formatTime,
				padding,
				onHover: props.onHover,
				showPulse: props.pulse,
				scrub: props.scrub,
				exaggerate: props.exaggerate,
				degenOptions: isMultiSeries || !props.degen ? undefined : typeof props.degen === 'object' ? props.degen : {},
				badgeTail: props.badgeTail,
				badgeVariant: props.badgeVariant,
				tooltipY: props.tooltipY,
				tooltipOutline: props.tooltipOutline,
				valueMomentumColor: props.valueMomentumColor,
				valueElement: props.showValue ? valueElement.value : undefined,
				orderbookData: props.orderbook,
				loading: props.loading,
				paused: props.paused,
				emptyText: props.emptyText,
				mode: props.mode,
				candles: props.candles,
				candleWidth: props.candleWidth,
				liveCandle: props.liveCandle,
				lineMode: props.lineMode,
				lineData: props.lineData,
				lineValue: props.lineValue,
				multiSeries,
				isMultiSeries,
				hiddenSeriesIds: hiddenSeries.value,
			};
		}

		onMounted(() => {
			if (!surface.value || !canvas.value) return;
			if (root.value)
				stopAppearance = observeLivelineAppearance(root.value, readAppearanceOptions, (next) => {
					appearance.value = next;
				});
			engine = createLivelineEngine({ container: surface.value, canvas: canvas.value }, buildConfig());
		});
		watch(
			[() => props.theme, () => props.color, () => props.series],
			() => {
				if (root.value) appearance.value = readLivelineAppearance(root.value, props.theme, readAppearanceOptions().colors);
			},
			{ deep: true, flush: 'post' },
		);
		watch([props, activeWindowSecs, hiddenSeries, appearance], () => engine?.update(buildConfig()), { deep: true, flush: 'post' });
		onBeforeUnmount(() => {
			stopAppearance?.();
			engine?.destroy();
			engine = null;
		});

		watch([activeWindowSecs, () => props.windows], () => void nextTick(() => setIndicator(windowBar.value, windowButtons.get(activeWindowSecs.value), windowIndicator)), {
			immediate: true,
			deep: true,
		});
		watch(
			[() => props.windows, () => props.window],
			() => {
				if (!props.windows?.length) activeWindowSecs.value = props.window;
				else if (!props.windows.some((option) => option.secs === activeWindowSecs.value)) activeWindowSecs.value = props.windows[0].secs;
			},
			{ immediate: true, deep: true },
		);
		watch(
			() => props.series?.map((series) => series.id),
			(ids) => {
				const currentIds = new Set(ids ?? []);
				const next = new Set([...hiddenSeries.value].filter((id) => currentIds.has(id)));
				if (ids?.length && next.size === ids.length) next.delete(ids[0]);
				hiddenSeries.value = next;
			},
			{ immediate: true, deep: true },
		);
		watch(
			[() => props.mode, () => props.lineMode, () => props.onModeChange],
			() =>
				void nextTick(
					() => props.onModeChange && setIndicator(modeBar.value, modeButtons.get(props.mode === 'candle' && props.lineMode ? 'line' : props.mode), modeIndicator),
				),
			{ immediate: true },
		);

		function toggleSeries(id: string) {
			if (!props.series?.length) return;
			const next = new Set(hiddenSeries.value);
			if (next.has(id)) {
				next.delete(id);
				props.onSeriesToggle?.(id, true);
			} else {
				if ((props.series?.length ?? 0) - next.size <= 1) return;
				next.add(id);
				props.onSeriesToggle?.(id, false);
			}
			hiddenSeries.value = next;
		}

		return () => {
			if (props.series?.length) lastSeries.value = props.series;
			const shownSeries = lastSeries.value ?? [];
			const isMultiSeries = Boolean(props.series?.length);
			const showSeriesControls = shownSeries.length > 1;
			const activeMode = props.mode === 'candle' && props.lineMode ? 'line' : props.mode;
			const paddingLeft = props.padding?.left ?? 12;
			const summary = (attrs['aria-label'] as string | undefined) ?? `Live chart, current value ${props.formatValue(props.value)}`;
			const hasControls = Boolean(props.windows?.length || props.onModeChange || showSeriesControls);
			const rootAttrs = { ...attrs };
			delete rootAttrs.class;
			delete rootAttrs.style;

			return (
				<div
					{...rootAttrs}
					ref={root}
					data-slot="liveline"
					data-theme={currentAppearance().inherited ? undefined : currentAppearance().mode}
					data-color-mode={currentAppearance().mode}
					class={[styles.root, attrs.class]}
					style={attrs.style as CSSProperties}>
					{props.showValue && <span ref={valueElement} data-slot="liveline-value" class={styles.value} style={{ paddingLeft: `${paddingLeft}px` }} aria-hidden="true" />}
					{hasControls && (
						<div data-slot="liveline-controls" class={styles.controls} style={{ paddingLeft: `${paddingLeft}px` }}>
							{Boolean(props.windows?.length) && (
								<div
									ref={windowBar}
									role="group"
									data-slot="liveline-window-controls"
									data-style={props.windowStyle}
									class={styles.controlGroup}
									aria-label="Chart time range">
									{props.windowStyle !== 'text' && windowIndicator.value && (
										<span
											data-slot="liveline-control-indicator"
											class={styles.indicator}
											style={{ left: `${windowIndicator.value.left}px`, width: `${windowIndicator.value.width}px` }}
										/>
									)}
									{props.windows?.map((option) => {
										const active = option.secs === activeWindowSecs.value;
										return (
											<button
												key={option.secs}
												ref={(element) => (element ? windowButtons.set(option.secs, element as HTMLButtonElement) : windowButtons.delete(option.secs))}
												type="button"
												data-slot="liveline-window-control"
												data-active={active || undefined}
												class={styles.control}
												aria-label={`Show ${option.label} time range`}
												aria-pressed={active}
												onClick={() => {
													activeWindowSecs.value = option.secs;
													props.onWindowChange?.(option.secs);
												}}>
												{option.label}
											</button>
										);
									})}
								</div>
							)}
							{props.onModeChange && (
								<div
									ref={modeBar}
									role="group"
									data-slot="liveline-mode-controls"
									data-style={props.windowStyle}
									class={styles.controlGroup}
									aria-label="Chart type">
									{props.windowStyle !== 'text' && modeIndicator.value && (
										<span
											data-slot="liveline-control-indicator"
											class={styles.indicator}
											style={{ left: `${modeIndicator.value.left}px`, width: `${modeIndicator.value.width}px` }}
										/>
									)}
									{(['line', 'candle'] as const).map((item) => {
										const active = activeMode === item;
										return (
											<button
												key={item}
												ref={(element) => (element ? modeButtons.set(item, element as HTMLButtonElement) : modeButtons.delete(item))}
												type="button"
												data-slot="liveline-mode-control"
												data-active={active || undefined}
												class={[styles.control, styles.iconControl]}
												aria-label={`Show ${item} chart`}
												aria-pressed={active}
												onClick={() => props.onModeChange?.(item)}>
												{item === 'line' ? (
													<svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
														<path
															d="M1 8.5C2.5 8.5 3 4 5.5 4S7.5 7 8.5 7C9.5 7 10 3.5 11 3.5"
															stroke="currentColor"
															stroke-width={active ? 1.5 : 1.2}
															stroke-linecap="round"
														/>
													</svg>
												) : (
													<svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
														<line x1="3.5" y1="1" x2="3.5" y2="11" stroke="currentColor" />
														<rect x="2" y="3" width="3" height="5" rx="0.5" fill="currentColor" />
														<line x1="8.5" y1="2" x2="8.5" y2="10" stroke="currentColor" />
														<rect x="7" y="4" width="3" height="4" rx="0.5" fill="currentColor" />
													</svg>
												)}
											</button>
										);
									})}
								</div>
							)}
							{showSeriesControls && (
								<div
									role="group"
									data-slot="liveline-series-controls"
									data-style={props.windowStyle}
									data-visible={isMultiSeries}
									aria-hidden={!isMultiSeries}
									class={styles.controlGroup}
									aria-label="Chart series">
									{shownSeries.map((series, index) => {
										const visible = !hiddenSeries.value.has(series.id);
										const label = series.label ?? series.id;
										return (
											<button
												key={series.id}
												type="button"
												data-slot="liveline-series-control"
												disabled={!isMultiSeries}
												data-active={visible || undefined}
												class={[styles.control, props.seriesToggleCompact && styles.compactControl]}
												aria-label={`${visible ? 'Hide' : 'Show'} ${label} series`}
												aria-pressed={visible}
												onClick={() => toggleSeries(series.id)}>
												<span
													data-slot="liveline-series-swatch"
													class={styles.swatch}
													style={{ background: series.color || SERIES_COLORS[index % SERIES_COLORS.length] }}
												/>
												{!props.seriesToggleCompact && label}
											</button>
										);
									})}
								</div>
							)}
						</div>
					)}
					<div ref={surface} data-slot="liveline-surface" class={[styles.surface, props.surfaceClassName]} style={props.surfaceStyle}>
						<canvas
							ref={canvas}
							data-slot="liveline-canvas"
							class={styles.canvas}
							style={{ cursor: props.scrub ? props.cursor : 'default' }}
							role="img"
							aria-label={summary}
							aria-describedby={attrs['aria-describedby'] as string | undefined}>
							{summary}
						</canvas>
					</div>
				</div>
			);
		};
	},
});

export default Liveline;
