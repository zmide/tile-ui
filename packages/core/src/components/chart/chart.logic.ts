import type {
	ChartBarRect,
	ChartConfig,
	ChartConfigItem,
	ChartDatum,
	ChartLayout,
	ChartLayoutOptions,
	ChartLegendItem,
	ChartPadding,
	ChartPoint,
	ChartSeriesItem,
	ChartTooltipEntry,
} from './chart.types';

/**
 * 图表组件样式类名键
 */
export const chartStyleKeys = {
	root: 'root',
	surface: 'surface',
	gridLine: 'gridLine',
	axisLine: 'axisLine',
	legend: 'legend',
	legendItem: 'legendItem',
	legendSwatch: 'legendSwatch',
	tooltip: 'tooltip',
	tooltipLabel: 'tooltipLabel',
	tooltipGrid: 'tooltipGrid',
	tooltipItem: 'tooltipItem',
	tooltipItemName: 'tooltipItemName',
	tooltipItemValue: 'tooltipItemValue',
	tooltipIndicator: 'tooltipIndicator',
} as const;

/** 默认初始尺寸 */
export const CHART_INITIAL_DIMENSION = { width: 320, height: 200 } as const;

/** 主题模式 */
export const CHART_THEMES = { light: '', dark: '.dark' } as const;

/** 默认内边距 */
export const CHART_DEFAULT_PADDING: Required<ChartPadding> = { top: 16, right: 16, bottom: 32, left: 40 };

/**
 * 默认调色板 (按系列顺序依次取色)
 */
export const CHART_DEFAULT_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'] as const;

const CHART_CSS_PALETTE_SIZE = 5;

/**
 * 根据主题取配置项颜色
 */
export function getChartConfigColor(item: ChartConfigItem | undefined, theme: 'light' | 'dark' = 'light'): string | undefined {
	return item?.theme?.[theme] ?? item?.color;
}

/**
 * 获取系列颜色 (优先系列自定义颜色，其次 config，最后默认调色板)
 */
export function getChartSeriesColor(config: ChartConfig, series: ChartSeriesItem, index: number, theme: 'light' | 'dark' = 'light', cssVariableScope?: string): string {
	if (series.color) {
		return series.color;
	}
	const paletteIndex = index % CHART_CSS_PALETTE_SIZE;
	const paletteFallback = `var(--chart-${paletteIndex + 1}, ${CHART_DEFAULT_COLORS[paletteIndex]})`;
	const fallback = getChartConfigColor(config[series.key], theme) ?? paletteFallback;
	return `var(${getChartCssVarName(series.key, cssVariableScope)}, ${fallback})`;
}

/**
 * 获取系列展示名称
 */
export function getChartSeriesName(config: ChartConfig, series: ChartSeriesItem): string {
	return series.name ?? config[series.key]?.label ?? series.key;
}

/**
 * 根据 config 生成默认系列列表
 */
export function getChartDefaultSeries(config: ChartConfig, type: ChartSeriesItem['type']): ChartSeriesItem[] {
	return Object.keys(config).map((key) => ({ key, type }));
}

/**
 * 收集所有数值字段值，计算数值范围
 */
export function getChartExtents(data: ChartDatum[], yKeys: string[]): { min: number; max: number } {
	let min = Number.POSITIVE_INFINITY;
	let max = Number.NEGATIVE_INFINITY;

	for (const row of data) {
		for (const key of yKeys) {
			const value = row[key];
			if (typeof value !== 'number' || Number.isNaN(value)) {
				continue;
			}
			if (value < min) min = value;
			if (value > max) max = value;
		}
	}

	if (!Number.isFinite(min)) {
		min = 0;
	}
	if (!Number.isFinite(max)) {
		max = 1;
	}

	return { min, max };
}

/**
 * 计算某数值的 10 的幂次步长
 */
export function getChartStepSize(range: number, targetTicks: number): number {
	const rawStep = range / Math.max(1, targetTicks - 1);
	const magnitude = 10 ** Math.floor(Math.log10(rawStep));
	const residual = rawStep / magnitude;

	if (residual <= 1) return magnitude;
	if (residual <= 2) return 2 * magnitude;
	if (residual <= 5) return 5 * magnitude;
	return 10 * magnitude;
}

/**
 * 生成 "好看" 的刻度数组 (上限下限向外取整)
 */
export function getNiceChartTicks(min: number, max: number, tickCount: number = 5, integerOnly: boolean = false): number[] {
	if (min === max) {
		const span = Math.abs(min) * 0.1 || 1;
		return getNiceChartTicks(min - span, max + span, tickCount, integerOnly);
	}

	const step = getChartStepSize(max - min, tickCount);
	const floor = Math.floor(min / step) * step;
	const ceil = Math.ceil(max / step) * step;
	const ticks: number[] = [];

	for (let value = floor; value <= ceil + step / 2; value += step) {
		const tick = integerOnly ? Math.round(value) : value;
		const rounded = Number.parseFloat(tick.toFixed(6));
		if (!ticks.includes(rounded)) {
			ticks.push(rounded);
		}
	}

	return ticks;
}

/**
 * 计算 Y 轴刻度位置 (SVG Y 坐标)
 */
export function getChartYAxisLayout(ticks: number[], min: number, max: number, innerHeight: number, paddingTop: number): { yTickY: number[]; yMin: number; yMax: number } {
	let yMin = min;
	let yMax = max;
	const first = ticks[0];
	const last = ticks[ticks.length - 1];

	if (first !== undefined && first < min) yMin = first;
	if (last !== undefined && last > max) yMax = last;

	const span = yMax - yMin || 1;
	const yTickY = ticks.map((tick) => paddingTop + innerHeight - ((tick - yMin) / span) * innerHeight);

	return { yTickY, yMin, yMax };
}

/**
 * 将数值线性映射到绘图区域
 */
export function mapChartValue(value: number, min: number, max: number, innerHeight: number, paddingTop: number): number {
	const span = max - min || 1;
	return paddingTop + innerHeight - ((value - min) / span) * innerHeight;
}

/**
 * 获取零值基线，并将超出数据范围的零线限制在绘图区边缘
 */
export function getChartBaselineY(layout: ChartLayout): number {
	const plotTop = layout.padding.top;
	const plotBottom = plotTop + layout.innerHeight;
	return Math.min(plotBottom, Math.max(plotTop, mapChartValue(0, layout.yMin, layout.yMax, layout.innerHeight, plotTop)));
}

/**
 * 计算完整图表布局 (纯数学，供两个框架复用)
 */
export function computeChartLayout(options: ChartLayoutOptions): ChartLayout {
	const { data, config, series, xKey, type, width, height, yTickCount = 5, integerOnly = false, theme = 'light', cssVariableScope } = options;
	const padding: Required<ChartPadding> = { ...CHART_DEFAULT_PADDING, ...options.padding };

	const innerWidth = Math.max(0, width - padding.left - padding.right);
	const innerHeight = Math.max(0, height - padding.top - padding.bottom);

	const resolvedSeries = series.length > 0 ? series : getChartDefaultSeries(config, type);
	const yKeys = resolvedSeries.map((item) => item.key);
	const { min, max } = getChartExtents(data, yKeys);
	const ticks = getNiceChartTicks(min, max, yTickCount, integerOnly);
	const { yTickY, yMin, yMax } = getChartYAxisLayout(ticks, min, max, innerHeight, padding.top);

	const xLabels = data.map((row) => row[xKey]);
	const categoryWidth = innerWidth / Math.max(1, data.length);
	const xTickX = data.map((_row, index) => padding.left + (index + 0.5) * categoryWidth);

	const seriesLayout = resolvedSeries.map((item, index) => {
		const points: ChartPoint[] = data.map((row, dataIndex) => {
			const value = typeof row[item.key] === 'number' ? (row[item.key] as number) : 0;
			return {
				index: dataIndex,
				x: xTickX[dataIndex] ?? padding.left,
				y: mapChartValue(value, yMin, yMax, innerHeight, padding.top),
				value,
			};
		});
		return {
			key: item.key,
			name: getChartSeriesName(config, item),
			color: getChartSeriesColor(config, item, index, theme, cssVariableScope),
			type: item.type ?? type,
			points,
		};
	});

	return {
		width,
		height,
		innerWidth,
		innerHeight,
		padding,
		xLabels,
		xTickX,
		yTicks: ticks,
		yTickY,
		yMin,
		yMax,
		series: seriesLayout,
	};
}

/**
 * 构建 Tooltip 条目列表 (基于悬浮的数据索引)
 */
export function getChartTooltipEntries(layout: ChartLayout, config: ChartConfig, data: ChartDatum[], activeIndex: number | null): ChartTooltipEntry[] {
	if (activeIndex === null) {
		return [];
	}

	const entries: ChartTooltipEntry[] = [];

	for (const item of layout.series) {
		const point = item.points[activeIndex];
		if (!point) {
			continue;
		}
		entries.push({
			name: item.name,
			dataKey: item.key,
			value: point.value,
			color: item.color,
			payload: data[activeIndex] ?? {},
		});
	}

	return entries;
}

/**
 * 生成系列路径数据 (line/area 使用)
 */
export function getChartPathD(points: ChartPoint[], closed: boolean = false): string {
	const d = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');

	if (!closed || points.length === 0) {
		return d;
	}

	const first = points[0];
	const last = points[points.length - 1];
	return `${d} L${last.x},${first.y} L${first.x},${first.y} Z`;
}

/**
 * 查找与当前坐标最近的 X 轴数据索引
 */
export function findChartNearestIndex(layout: ChartLayout, mouseX: number): number {
	let nearest = 0;
	let minDistance = Number.POSITIVE_INFINITY;

	layout.xTickX.forEach((x, index) => {
		const distance = Math.abs(x - mouseX);
		if (distance < minDistance) {
			minDistance = distance;
			nearest = index;
		}
	});

	return nearest;
}

/**
 * 生成面积图路径数据 (沿基线闭合)
 */
export function getChartAreaPathD(points: ChartPoint[], baselineY: number): string {
	if (points.length === 0) {
		return '';
	}

	const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');
	const first = points[0];
	const last = points[points.length - 1];

	return `${line} L${last.x},${baselineY} L${first.x},${baselineY} Z`;
}

/**
 * 计算柱状图矩形条布局 (多系列时在分类宽度内并排分组)
 */
export function getChartBarRects(layout: ChartLayout, seriesIndex: number, seriesCount: number, barGapRatio: number = 0.2): ChartBarRect[] {
	const series = layout.series[seriesIndex];
	if (!series) {
		return [];
	}

	const categoryCount = Math.max(1, layout.xLabels.length);
	const categoryWidth = layout.innerWidth / categoryCount;
	const groupWidth = categoryWidth * (1 - barGapRatio);
	const barWidth = groupWidth / Math.max(1, seriesCount);
	const barSeriesIndex = layout.series.slice(0, seriesIndex).filter((item) => item.type === 'bar').length;
	const groupOffset = barSeriesIndex * barWidth - groupWidth / 2;
	const baseline = getChartBaselineY(layout);

	return series.points.map((point) => {
		const yTop = Math.min(point.y, baseline);
		const yBottom = Math.max(point.y, baseline);

		return {
			index: point.index,
			x: point.x + groupOffset,
			y: yTop,
			width: barWidth,
			height: yBottom - yTop,
			value: point.value,
		};
	});
}

/**
 * 获取系列的图例条目 (名称 + 颜色)
 */
export function getChartLegendItems(layout: ChartLayout): ChartLegendItem[] {
	return layout.series.map((item) => ({
		key: item.key,
		name: item.name,
		color: item.color,
	}));
}

/**
 * 获取配置键对应的 CSS 变量名 (如 `--color-desktop`)
 */
export function getChartCssVarName(key: string, scope?: string): string {
	const toIdentifier = (value: string, fallback: string) =>
		Array.from(value, (character) => (/^[a-zA-Z0-9-]$/.test(character) ? character : `_u${character.codePointAt(0)?.toString(16)}_`)).join('') || fallback;
	const keyIdentifier = toIdentifier(key, 'series');
	return scope ? `--chart-${toIdentifier(scope, 'scope')}-color-${keyIdentifier}` : `--color-${keyIdentifier}`;
}

function getSafeChartCssValue(value: string | undefined): string | undefined {
	return value && !/[;{}\r\n]/.test(value) ? value : undefined;
}

/**
 * 生成 ChartStyle 注入的主题 CSS (每个图表使用独立变量，主题边界通过继承就近生效)
 */
export function buildChartThemeCss(id: string, config: ChartConfig): string {
	const colorConfig = Object.entries(config).filter(([, item]) => item.theme ?? item.color);

	if (colorConfig.length === 0) {
		return '';
	}

	const declarations = (theme: keyof typeof CHART_THEMES) =>
		colorConfig
			.map(([key, item]) => {
				const color = getSafeChartCssValue(getChartConfigColor(item, theme));
				return color ? `  ${getChartCssVarName(key, id)}: ${color};` : null;
			})
			.filter((line): line is string => line !== null)
			.join('\n');
	const lightDeclarations = declarations('light');
	const darkDeclarations = declarations('dark');

	// Supply the light config when no mode boundary exists, without overriding inherited
	// dark variables on the chart itself. Each nested boundary still wins by inheritance.
	const css = [`:root {\n${lightDeclarations}\n}`, `.light, [data-theme="light"] {\n${lightDeclarations}\n}`, `.dark, [data-theme="dark"] {\n${darkDeclarations}\n}`].join('\n');

	// style 元素是 HTML raw-text，上屏前转义 `<`，同时由 CSS 解析器还原原值。
	return css.replace(/</g, '\\3c ');
}

/**
 * 计算 Tooltip 的展示位置 (限制在容器内)
 */
export function getChartTooltipPosition(layout: ChartLayout, mouseX: number, mouseY: number): { left: number; top: number } {
	const tooltipWidth = 160;
	const tooltipHeight = 80;
	const margin = 8;

	let left = mouseX + margin;
	let top = mouseY + margin;

	if (left + tooltipWidth > layout.width) {
		left = mouseX - tooltipWidth - margin;
	}
	if (top + tooltipHeight > layout.height) {
		top = mouseY - tooltipHeight - margin;
	}

	return { left: Math.max(0, left), top: Math.max(0, top) };
}
