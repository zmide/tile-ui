import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	SERIES_COLORS,
	createLivelineEngine,
	observeLivelineAppearance,
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

export interface LivelineProps extends LivelineOptions, Omit<React.HTMLAttributes<HTMLDivElement>, keyof LivelineOptions | 'children'> {
	/** Styles the engine's chart surface; style sizes the complete widget, including controls. */
	surfaceStyle?: React.CSSProperties;
	surfaceClassName?: string;
}

function setIndicator(bar: HTMLDivElement | null, button: HTMLButtonElement | undefined, setState: React.Dispatch<React.SetStateAction<{ left: number; width: number } | null>>) {
	if (!bar || !button) return;
	const barRect = bar.getBoundingClientRect();
	const buttonRect = button.getBoundingClientRect();
	setState({ left: buttonRect.left - barRect.left, width: buttonRect.width });
}

const Liveline = React.forwardRef<HTMLDivElement, LivelineProps>(
	(
		{
			data,
			value,
			series: seriesProp,
			theme,
			color = '#3b82f6',
			window: windowSecs = 30,
			grid = true,
			badge = true,
			momentum = true,
			fill = true,
			scrub = true,
			loading = false,
			paused = false,
			emptyText,
			exaggerate = false,
			degen,
			badgeTail = true,
			badgeVariant = 'default',
			showValue = false,
			valueMomentumColor = false,
			windows,
			onWindowChange,
			windowStyle = 'default',
			tooltipY = 14,
			tooltipOutline = true,
			orderbook,
			referenceLine,
			formatValue = defaultFormatValue,
			formatTime = defaultFormatTime,
			lerpSpeed = 0.08,
			padding: paddingOverride,
			onHover,
			cursor = 'crosshair',
			pulse = true,
			mode = 'line',
			candles,
			candleWidth,
			liveCandle,
			lineMode,
			lineData,
			lineValue,
			onModeChange,
			onSeriesToggle,
			seriesToggleCompact = false,
			lineWidth,
			className = '',
			style,
			surfaceStyle,
			surfaceClassName = '',
			'aria-label': ariaLabel,
			'aria-describedby': ariaDescribedBy,
			...rootProps
		},
		forwardedRef,
	) => {
		const rootRef = useRef<HTMLDivElement>(null);
		const surfaceRef = useRef<HTMLDivElement>(null);
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const valueRef = useRef<HTMLSpanElement>(null);
		const engineRef = useRef<LivelineEngine | null>(null);
		const windowBarRef = useRef<HTMLDivElement>(null);
		const windowButtonRefs = useRef(new Map<number, HTMLButtonElement>());
		const modeBarRef = useRef<HTMLDivElement>(null);
		const modeButtonRefs = useRef(new Map<string, HTMLButtonElement>());
		const [windowIndicator, setWindowIndicator] = useState<{ left: number; width: number } | null>(null);
		const [modeIndicator, setModeIndicator] = useState<{ left: number; width: number } | null>(null);
		const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(() => new Set());
		const [appearance, setAppearance] = useState<LivelineAppearance>(() => ({ mode: theme ?? 'dark', palette: {}, colors: {} }));
		const resolvedAppearance: LivelineAppearance = theme && appearance.mode !== theme ? { mode: theme, palette: {}, colors: appearance.colors } : appearance;
		const [activeWindowSecs, setActiveWindowSecs] = useState(windows?.[0]?.secs ?? windowSecs);
		const lastSeriesRef = useRef(seriesProp);

		useLayoutEffect(() => {
			if (seriesProp?.length) lastSeriesRef.current = seriesProp;
		}, [seriesProp]);

		const isMultiSeries = Boolean(seriesProp?.length);
		const shownSeries = (seriesProp?.length ? seriesProp : lastSeriesRef.current) ?? [];
		const showSeriesControls = shownSeries.length > 1;
		const effectiveWindowSecs = windows?.length ? activeWindowSecs : windowSecs;
		const activeMode = mode === 'candle' && lineMode ? 'line' : mode;
		const defaultRight = badge ? 80 : grid ? 54 : 12;
		const padding = {
			top: paddingOverride?.top ?? 12,
			right: paddingOverride?.right ?? defaultRight,
			bottom: paddingOverride?.bottom ?? 28,
			left: paddingOverride?.left ?? 12,
		};
		const palette = { ...resolveLivelinePalette(color, resolvedAppearance), ...(lineWidth == null ? {} : { lineWidth }) };
		const multiSeries = seriesProp?.map((series, index) => ({
			id: series.id,
			data: series.data,
			value: series.value,
			palette: resolveLivelinePalette(series.color || SERIES_COLORS[index % SERIES_COLORS.length], resolvedAppearance),
			label: series.label,
		}));
		const config: LivelineEngineConfig = {
			data,
			value,
			palette,
			windowSecs: effectiveWindowSecs,
			lerpSpeed,
			showGrid: grid,
			showBadge: isMultiSeries ? false : badge,
			showMomentum: isMultiSeries ? false : momentum !== false,
			momentumOverride: typeof momentum === 'string' ? (momentum as Momentum) : undefined,
			showFill: isMultiSeries ? false : fill,
			referenceLine,
			formatValue,
			formatTime,
			padding,
			onHover,
			showPulse: pulse,
			scrub,
			exaggerate,
			degenOptions: isMultiSeries || !degen ? undefined : typeof degen === 'object' ? degen : {},
			badgeTail,
			badgeVariant,
			tooltipY,
			tooltipOutline,
			valueMomentumColor,
			valueElement: showValue ? valueRef.current : undefined,
			orderbookData: orderbook,
			loading,
			paused,
			emptyText,
			mode,
			candles,
			candleWidth,
			liveCandle,
			lineMode,
			lineData,
			lineValue,
			multiSeries,
			isMultiSeries,
			hiddenSeriesIds: hiddenSeries,
		};
		const initialConfigRef = useRef(config);
		const initialShowValueRef = useRef(showValue);

		useLayoutEffect(() => {
			setIndicator(windowBarRef.current, windowButtonRefs.current.get(activeWindowSecs), setWindowIndicator);
		}, [activeWindowSecs, windows]);

		useEffect(() => {
			setActiveWindowSecs((current) => {
				if (!windows?.length) return windowSecs;
				return windows.some((option) => option.secs === current) ? current : windows[0].secs;
			});
		}, [windows, windowSecs]);

		useEffect(() => {
			if (!seriesProp?.length) {
				setHiddenSeries((current) => (current.size ? new Set() : current));
				return;
			}
			const ids = new Set(seriesProp.map((series) => series.id));
			setHiddenSeries((current) => {
				const next = new Set([...current].filter((id) => ids.has(id)));
				if (next.size === ids.size) next.delete(seriesProp[0].id);
				return next.size === current.size && [...next].every((id) => current.has(id)) ? current : next;
			});
		}, [seriesProp]);

		useLayoutEffect(() => {
			if (onModeChange) setIndicator(modeBarRef.current, modeButtonRefs.current.get(activeMode), setModeIndicator);
		}, [activeMode, onModeChange]);

		useLayoutEffect(() => {
			const root = rootRef.current;
			if (!root) return;
			return observeLivelineAppearance(
				root,
				() => ({ theme, colors: [color, ...(seriesProp?.map((series, index) => series.color || SERIES_COLORS[index % SERIES_COLORS.length]) ?? [])] }),
				setAppearance,
			);
		}, [theme, color, seriesProp]);

		useEffect(() => {
			const container = surfaceRef.current;
			const canvas = canvasRef.current;
			if (!container || !canvas) return;
			const engine = createLivelineEngine({ container, canvas }, { ...initialConfigRef.current, valueElement: initialShowValueRef.current ? valueRef.current : undefined });
			engineRef.current = engine;
			return () => {
				engine.destroy();
				if (engineRef.current === engine) engineRef.current = null;
			};
		}, []);

		useEffect(() => {
			engineRef.current?.update({ ...config, valueElement: showValue ? valueRef.current : undefined });
		});

		function setRootRef(element: HTMLDivElement | null) {
			rootRef.current = element;
			if (typeof forwardedRef === 'function') forwardedRef(element);
			else if (forwardedRef) forwardedRef.current = element;
		}

		function toggleSeries(id: string) {
			if (!isMultiSeries) return;
			const next = new Set(hiddenSeries);
			const visible = next.has(id);
			if (visible) next.delete(id);
			else {
				if ((seriesProp?.length ?? 0) - next.size <= 1) return;
				next.add(id);
			}
			setHiddenSeries(next);
			onSeriesToggle?.(id, visible);
		}

		const summary = ariaLabel ?? `Live chart, current value ${formatValue(value)}`;
		const hasControls = Boolean(windows?.length || onModeChange || showSeriesControls);

		return (
			<div
				{...rootProps}
				ref={setRootRef}
				data-slot="liveline"
				data-theme={resolvedAppearance.inherited ? undefined : resolvedAppearance.mode}
				data-color-mode={resolvedAppearance.mode}
				className={`${styles.root} ${className}`}
				style={style}>
				{showValue && <span ref={valueRef} data-slot="liveline-value" className={styles.value} style={{ paddingLeft: padding.left }} aria-hidden="true" />}
				{hasControls && (
					<div data-slot="liveline-controls" className={styles.controls} style={{ paddingLeft: padding.left }}>
						{Boolean(windows?.length) && (
							<div
								ref={windowBarRef}
								role="group"
								data-slot="liveline-window-controls"
								data-style={windowStyle}
								className={styles.controlGroup}
								aria-label="Chart time range">
								{windowStyle !== 'text' && windowIndicator && (
									<span
										data-slot="liveline-control-indicator"
										className={styles.indicator}
										style={{ left: windowIndicator.left, width: windowIndicator.width }}
									/>
								)}
								{windows?.map((option) => {
									const active = option.secs === activeWindowSecs;
									return (
										<button
											key={option.secs}
											ref={(element) => {
												if (element) windowButtonRefs.current.set(option.secs, element);
												else windowButtonRefs.current.delete(option.secs);
											}}
											type="button"
											data-slot="liveline-window-control"
											data-active={active || undefined}
											className={styles.control}
											aria-label={`Show ${option.label} time range`}
											aria-pressed={active}
											onClick={() => {
												setActiveWindowSecs(option.secs);
												onWindowChange?.(option.secs);
											}}>
											{option.label}
										</button>
									);
								})}
							</div>
						)}
						{onModeChange && (
							<div ref={modeBarRef} role="group" data-slot="liveline-mode-controls" data-style={windowStyle} className={styles.controlGroup} aria-label="Chart type">
								{windowStyle !== 'text' && modeIndicator && (
									<span data-slot="liveline-control-indicator" className={styles.indicator} style={{ left: modeIndicator.left, width: modeIndicator.width }} />
								)}
								{(['line', 'candle'] as const).map((item) => {
									const active = activeMode === item;
									return (
										<button
											key={item}
											ref={(element) => {
												if (element) modeButtonRefs.current.set(item, element);
												else modeButtonRefs.current.delete(item);
											}}
											type="button"
											data-slot="liveline-mode-control"
											data-active={active || undefined}
											className={`${styles.control} ${styles.iconControl}`}
											aria-label={`Show ${item} chart`}
											aria-pressed={active}
											onClick={() => onModeChange(item)}>
											{item === 'line' ? (
												<svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
													<path
														d="M1 8.5C2.5 8.5 3 4 5.5 4S7.5 7 8.5 7C9.5 7 10 3.5 11 3.5"
														stroke="currentColor"
														strokeWidth={active ? 1.5 : 1.2}
														strokeLinecap="round"
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
								data-style={windowStyle}
								data-visible={isMultiSeries}
								aria-hidden={!isMultiSeries}
								className={styles.controlGroup}
								aria-label="Chart series">
								{shownSeries.map((series, index) => {
									const visible = !hiddenSeries.has(series.id);
									const label = series.label ?? series.id;
									return (
										<button
											key={series.id}
											type="button"
											data-slot="liveline-series-control"
											disabled={!isMultiSeries}
											data-active={visible || undefined}
											className={`${styles.control} ${seriesToggleCompact ? styles.compactControl : ''}`}
											aria-label={`${visible ? 'Hide' : 'Show'} ${label} series`}
											aria-pressed={visible}
											onClick={() => toggleSeries(series.id)}>
											<span
												data-slot="liveline-series-swatch"
												className={styles.swatch}
												style={{ background: series.color || SERIES_COLORS[index % SERIES_COLORS.length] }}
											/>
											{!seriesToggleCompact && label}
										</button>
									);
								})}
							</div>
						)}
					</div>
				)}
				<div ref={surfaceRef} data-slot="liveline-surface" className={`${styles.surface} ${surfaceClassName}`} style={surfaceStyle}>
					<canvas
						ref={canvasRef}
						data-slot="liveline-canvas"
						className={styles.canvas}
						style={{ cursor: scrub ? cursor : 'default' }}
						role="img"
						aria-label={summary}
						aria-describedby={ariaDescribedBy}>
						{summary}
					</canvas>
				</div>
			</div>
		);
	},
);
Liveline.displayName = 'Liveline';

export { Liveline };
