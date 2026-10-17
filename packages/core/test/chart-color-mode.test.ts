import { describe, expect, it } from 'vitest';
import { buildChartThemeCss } from '../src/components/chart/chart.logic';
import { readLivelineAppearance, resolveLivelinePalette } from '../src/liveline/color-mode';
import { parseColorRgb, resolveTheme } from '../src/liveline/theme';

describe('chart color modes', () => {
	it('provides default config colors without pinning the chart to a mode', () => {
		const css = buildChartThemeCss('scoped', { value: { theme: { light: '#123', dark: '#abc' } } });
		expect(css).toContain(':root {\n  --chart-scoped-color-value: #123;\n}');
		expect(css).toContain('.light, [data-theme="light"] {\n  --chart-scoped-color-value: #123;\n}');
		expect(css).toContain('.dark, [data-theme="dark"] {\n  --chart-scoped-color-value: #abc;\n}');
		expect(css).not.toContain('[data-chart');
	});

	it('keeps legacy dark and explicit pure palettes SSR-safe', () => {
		const appearance = readLivelineAppearance();
		expect(appearance).toEqual({ mode: 'dark', palette: {}, colors: {} });
		expect(resolveLivelinePalette('#3b82f6', appearance)).toEqual(resolveTheme('#3b82f6', 'dark'));
		expect(resolveLivelinePalette('#3b82f6', readLivelineAppearance(null, 'light'))).toEqual(resolveTheme('#3b82f6', 'light'));
	});

	it('uses concrete resolved colors for gradients and semantic background blending', () => {
		const palette = resolveLivelinePalette('var(--brand)', { mode: 'light', colors: { 'var(--brand)': 'rgb(20, 40, 60)' }, palette: { bgRgb: [245, 246, 247] } });
		expect(palette.line).toBe('rgb(20, 40, 60)');
		expect(palette.fillTop).toBe('rgba(20, 40, 60, 0.08)');
		expect(palette.bgRgb).toEqual([245, 246, 247]);
		expect(resolveLivelinePalette('var(--unresolved)', readLivelineAppearance()).line).toBe('#3b82f6');
	});

	it('parses concrete modern rgb syntax and short hex alpha without silently using gray', () => {
		expect(parseColorRgb('rgb(10.5 20 30 / 40%)')).toEqual([11, 20, 30]);
		expect(parseColorRgb('rgb(100% 50% 0%)')).toEqual([255, 128, 0]);
		expect(parseColorRgb('#1234')).toEqual([17, 34, 51]);
	});
});
