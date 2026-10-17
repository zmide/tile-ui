// @vitest-environment jsdom

import React, { StrictMode, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const core = vi.hoisted(() => {
	const destroy = vi.fn();
	const update = vi.fn();
	return {
		create: vi.fn(() => ({ destroy, update })),
		destroy,
		update,
	};
});

vi.mock('@tile-ui/core/liveline', async (importOriginal) => ({
	...(await importOriginal<typeof import('@tile-ui/core/liveline')>()),
	SERIES_COLORS: ['#3b82f6', '#ef4444'],
	resolveTheme: (color: string) => ({ line: color, lineWidth: 2 }),
	resolveSeriesPalettes: (series: Array<{ id: string; color: string }>) => new Map(series.map((item) => [item.id, { line: item.color, lineWidth: 2 }])),
	createLivelineEngine: core.create,
}));

import { Liveline, LivelineTransition } from '../src/components/liveline';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const roots: Root[] = [];

function mount(node: React.ReactNode) {
	const container = document.createElement('div');
	document.body.appendChild(container);
	const root = createRoot(container);
	roots.push(root);
	act(() => root.render(node));
	return { container, root };
}

beforeEach(() => {
	core.create.mockClear();
	core.destroy.mockClear();
	core.update.mockClear();
	vi.stubGlobal(
		'requestAnimationFrame',
		vi.fn((callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 0)),
	);
	vi.stubGlobal(
		'cancelAnimationFrame',
		vi.fn((handle: number) => clearTimeout(handle)),
	);
});

afterEach(() => {
	for (const root of roots.splice(0)) act(() => root.unmount());
	document.body.innerHTML = '';
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

const points = [
	{ time: 1, value: 10 },
	{ time: 2, value: 12 },
];

describe('Liveline', () => {
	it('separates total widget styling from the measured chart surface', () => {
		const { container } = mount(
			<Liveline data={points} value={12} showValue style={{ height: 300 }} surfaceStyle={{ height: 240, overflow: 'visible' }} surfaceClassName="chart-only" />,
		);
		const root = container.querySelector<HTMLElement>('[data-slot="liveline"]')!;
		const surface = container.querySelector<HTMLElement>('[data-slot="liveline-surface"]')!;
		expect(root.style.height).toBe('300px');
		expect(root.classList.contains('chart-only')).toBe(false);
		expect(surface.style.height).toBe('240px');
		expect(surface.classList.contains('chart-only')).toBe(true);
		expect(core.create).toHaveBeenCalledWith(expect.objectContaining({ container: surface }), expect.anything());
	});

	it('notifies exactly once per accepted StrictMode toggle and disables retained controls', () => {
		const onSeriesToggle = vi.fn();
		const series = ['a', 'b'].map((id) => ({ id, color: '#3b82f6', data: points, value: 12 }));
		const view = (shown: boolean) => (
			<StrictMode>
				<Liveline data={points} value={12} series={shown ? series : []} onSeriesToggle={onSeriesToggle} />
			</StrictMode>
		);
		const { root, container } = mount(view(true));
		const buttons = () => Array.from(container.querySelectorAll<HTMLButtonElement>('[data-slot="liveline-series-control"]'));
		act(() => buttons()[0].click());
		expect(onSeriesToggle.mock.calls).toEqual([['a', false]]);
		act(() => buttons()[1].click());
		expect(onSeriesToggle).toHaveBeenCalledTimes(1);
		act(() => buttons()[0].click());
		expect(onSeriesToggle.mock.calls).toEqual([
			['a', false],
			['a', true],
		]);
		act(() => root.render(view(false)));
		expect(buttons()).toHaveLength(2);
		expect(container.querySelector('[data-slot="liveline-series-controls"]')?.getAttribute('aria-hidden')).toBe('true');
		for (const button of buttons()) {
			expect(button.disabled).toBe(true);
			button.focus();
			expect(document.activeElement).not.toBe(button);
			act(() => button.click());
		}
		expect(onSeriesToggle).toHaveBeenCalledTimes(2);
		act(() => root.render(view(true)));
		expect(buttons().every((button) => !button.disabled)).toBe(true);
	});

	it('renders a stable accessible structure and forwards its root ref', () => {
		const ref = React.createRef<HTMLDivElement>();
		const { container } = mount(
			<Liveline ref={ref} data={points} value={12} showValue aria-label="Bitcoin live price" id="market-chart" title="Market chart" data-consumer="react" />,
		);
		const root = container.querySelector('[data-slot="liveline"]');
		const canvas = container.querySelector('canvas');

		expect(ref.current).toBe(root);
		expect(root?.getAttribute('id')).toBe('market-chart');
		expect(root?.getAttribute('title')).toBe('Market chart');
		expect(root?.getAttribute('data-consumer')).toBe('react');
		expect(root?.querySelector('[data-slot="liveline-value"]')).not.toBeNull();
		expect(root?.querySelector('[data-slot="liveline-surface"]')).not.toBeNull();
		expect(canvas?.getAttribute('role')).toBe('img');
		expect(canvas?.getAttribute('aria-label')).toBe('Bitcoin live price');
		expect(canvas?.hasAttribute('aria-live')).toBe(false);
		expect(core.create).toHaveBeenCalledWith(
			expect.objectContaining({ container: root?.querySelector('[data-slot="liveline-surface"]'), canvas }),
			expect.objectContaining({
				windowSecs: 30,
				showGrid: true,
				showBadge: true,
				showFill: true,
				scrub: true,
				valueElement: root?.querySelector('[data-slot="liveline-value"]'),
			}),
		);
	});

	it('reconciles dynamic mode, windows, series ids, and value attachment', () => {
		const firstSeries = [
			{ id: 'btc', label: 'Bitcoin', color: '#f00', data: points, value: 12 },
			{ id: 'eth', label: 'Ether', color: '#0f0', data: points, value: 8 },
		];
		const { container, root } = mount(
			<Liveline data={points} value={12} mode="line" lineMode={false} windows={[{ label: '1m', secs: 60 }]} window={15} series={firstSeries} />,
		);
		expect(container.querySelector('[aria-label="Show line chart"]')).toBeNull();

		act(() =>
			root.render(<Liveline data={points} value={12} mode="line" lineMode={false} onModeChange={() => {}} windows={[{ label: '1m', secs: 60 }]} series={firstSeries} />),
		);
		expect(container.querySelector('[aria-label="Show line chart"]')?.getAttribute('aria-pressed')).toBe('true');
		act(() => container.querySelector<HTMLButtonElement>('[aria-label="Hide Bitcoin series"]')!.click());

		const nextSeries = [
			{ id: 'sol', label: 'Solana', color: '#00f', data: points, value: 9 },
			{ id: 'xrp', label: 'XRP', color: '#0ff', data: points, value: 7 },
		];
		act(() => root.render(<Liveline data={points} value={12} mode="candle" lineMode onModeChange={() => {}} windows={[]} window={15} series={nextSeries} showValue />));
		expect(container.querySelector('[aria-label="Show line chart"]')?.getAttribute('aria-pressed')).toBe('true');
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ windowSecs: 15, hiddenSeriesIds: new Set(), valueElement: expect.any(HTMLElement) }));
		act(() =>
			root.render(<Liveline data={points} value={12} mode="candle" lineMode={false} onModeChange={() => {}} windows={[{ label: '5m', secs: 300 }]} series={nextSeries} />),
		);
		expect(container.querySelector('[aria-label="Show candle chart"]')?.getAttribute('aria-pressed')).toBe('true');
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ windowSecs: 300, valueElement: undefined }));
		expect(container.querySelectorAll('[role="group"]')).toHaveLength(3);
	});

	it('provides typed, labelled, pressed-state controls and updates window state', () => {
		const onWindowChange = vi.fn();
		const onModeChange = vi.fn();
		const onSeriesToggle = vi.fn();
		const series = [
			{ id: 'btc', label: 'Bitcoin', color: '#f00', data: points, value: 12 },
			{ id: 'eth', label: 'Ether', color: '#0f0', data: points, value: 8 },
		];
		const { container } = mount(
			<Liveline
				data={points}
				value={12}
				series={series}
				windows={[
					{ label: '30s', secs: 30 },
					{ label: '1m', secs: 60 },
				]}
				onWindowChange={onWindowChange}
				onModeChange={onModeChange}
				onSeriesToggle={onSeriesToggle}
			/>,
		);
		const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('button'));
		expect(buttons.every((button) => button.type === 'button')).toBe(true);
		expect(buttons.every((button) => Boolean(button.getAttribute('aria-label')))).toBe(true);

		const minute = container.querySelector<HTMLButtonElement>('[aria-label="Show 1m time range"]')!;
		expect(minute.getAttribute('aria-pressed')).toBe('false');
		act(() => minute.click());
		expect(onWindowChange).toHaveBeenCalledWith(60);
		expect(minute.getAttribute('aria-pressed')).toBe('true');
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ windowSecs: 60 }));

		const candle = container.querySelector<HTMLButtonElement>('[aria-label="Show candle chart"]')!;
		act(() => candle.click());
		expect(onModeChange).toHaveBeenCalledWith('candle');

		const bitcoin = container.querySelector<HTMLButtonElement>('[aria-label="Hide Bitcoin series"]')!;
		act(() => bitcoin.click());
		expect(onSeriesToggle).toHaveBeenCalledWith('btc', false);
		expect(container.querySelector('[aria-label="Show Bitcoin series"]')?.getAttribute('aria-pressed')).toBe('false');
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ hiddenSeriesIds: new Set(['btc']) }));
	});

	it('updates props without recreating the engine and cleans up in Strict Mode', () => {
		const { root } = mount(
			<StrictMode>
				<Liveline data={points} value={12} />
			</StrictMode>,
		);
		expect(core.create).toHaveBeenCalledTimes(2);
		expect(core.destroy).toHaveBeenCalledTimes(1);

		act(() =>
			root.render(
				<StrictMode>
					<Liveline data={points} value={15} paused />
				</StrictMode>,
			),
		);
		expect(core.create).toHaveBeenCalledTimes(2);
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ value: 15, paused: true }));

		act(() => root.unmount());
		roots.splice(roots.indexOf(root), 1);
		expect(core.destroy).toHaveBeenCalledTimes(2);
	});
});

describe('LivelineTransition', () => {
	it('settles rapid switches and duration changes on only the active layer', () => {
		vi.useFakeTimers();
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: false })),
		);
		const view = (active: string, duration = 300) => (
			<LivelineTransition active={active} duration={duration}>
				<button key="a">A</button>
				<button key="b">B</button>
				<button key="c">C</button>
			</LivelineTransition>
		);
		const { container, root } = mount(view('a'));

		act(() => root.render(view('b')));
		act(() => root.render(view('c')));
		act(() => root.render(view('c', 50)));
		const transitioning = Array.from(container.querySelectorAll<HTMLElement>('[data-slot="liveline-transition-layer"]'));
		expect(transitioning.some((layer) => layer.hasAttribute('inert') && layer.getAttribute('aria-hidden') === 'true')).toBe(true);
		act(() => vi.runAllTimers());

		const layers = container.querySelectorAll('[data-slot="liveline-transition-layer"]');
		expect(layers).toHaveLength(1);
		expect(layers[0].textContent).toBe('C');
		expect(layers[0].hasAttribute('inert')).toBe(false);
		expect(core.create).toHaveBeenCalledTimes(0);
	});

	it('settles A to B to A without retaining the intermediate layer', () => {
		vi.useFakeTimers();
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: false })),
		);
		const view = (active: string) => (
			<LivelineTransition active={active}>
				<div key="a">A</div>
				<div key="b">B</div>
			</LivelineTransition>
		);
		const { container, root } = mount(view('a'));
		act(() => root.render(view('b')));
		act(() => root.render(view('a')));
		act(() => vi.runAllTimers());
		expect(container.querySelectorAll('[data-slot="liveline-transition-layer"]')).toHaveLength(1);
		expect(container.textContent).toBe('A');
	});

	it('switches immediately when reduced motion is requested', () => {
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: true })),
		);
		const { container, root } = mount(
			<LivelineTransition active="line">
				<div key="line">Line</div>
				<div key="candle">Candle</div>
			</LivelineTransition>,
		);
		act(() =>
			root.render(
				<LivelineTransition active="candle">
					<div key="line">Line</div>
					<div key="candle">Candle</div>
				</LivelineTransition>,
			),
		);

		expect(container.textContent).toBe('Candle');
		expect(container.querySelector('[data-slot="liveline-transition-layer"]')?.getAttribute('aria-hidden')).toBe('false');
	});

	it('cancels transition work on cleanup', () => {
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: false })),
		);
		const { root } = mount(
			<LivelineTransition active="line">
				<div key="line">Line</div>
				<div key="candle">Candle</div>
			</LivelineTransition>,
		);
		act(() =>
			root.render(
				<LivelineTransition active="candle">
					<div key="line">Line</div>
					<div key="candle">Candle</div>
				</LivelineTransition>,
			),
		);
		act(() => root.unmount());
		roots.splice(roots.indexOf(root), 1);
		expect(cancelAnimationFrame).toHaveBeenCalled();
	});
});
