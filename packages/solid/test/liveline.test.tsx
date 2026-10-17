import { execFileSync } from 'node:child_process';
import { createSignal, type JSX } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const core = vi.hoisted(() => {
	const destroy = vi.fn();
	const update = vi.fn();
	return { create: vi.fn(() => ({ destroy, update })), destroy, update };
});

vi.mock('@tile-ui/core/liveline', async (importOriginal) => ({
	...(await importOriginal<typeof import('@tile-ui/core/liveline')>()),
	SERIES_COLORS: ['#3b82f6', '#ef4444'],
	resolveTheme: (color: string) => ({ line: color, lineWidth: 2 }),
	resolveSeriesPalettes: (series: Array<{ id: string; color: string }>) => new Map(series.map((item) => [item.id, { line: item.color, lineWidth: 2 }])),
	createLivelineEngine: core.create,
}));

import { Liveline, LivelineTransition } from '../src/components/liveline';

const points = [
	{ time: 1, value: 10 },
	{ time: 2, value: 12 },
];
const disposers: Array<() => void> = [];

function mount(node: () => JSX.Element) {
	const container = document.createElement('div');
	document.body.appendChild(container);
	disposers.push(render(node, container));
	return container;
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
	for (const dispose of disposers.splice(0)) dispose();
	document.body.innerHTML = '';
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe('Solid Liveline', () => {
	it('retains fading series controls without exposing or focusing them', () => {
		const onSeriesToggle = vi.fn();
		const series = ['a', 'b'].map((id) => ({ id, color: '#3b82f6', data: points, value: 12 }));
		const [shown, setShown] = createSignal(true);
		const container = mount(() => <Liveline data={points} value={12} series={shown() ? series : []} onSeriesToggle={onSeriesToggle} />);
		setShown(false);
		const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('[data-slot="liveline-series-control"]'));
		expect(buttons).toHaveLength(2);
		expect(container.querySelector('[data-slot="liveline-series-controls"]')?.getAttribute('aria-hidden')).toBe('true');
		for (const button of buttons) {
			expect(button.disabled).toBe(true);
			button.focus();
			expect(document.activeElement).not.toBe(button);
			button.click();
		}
		expect(onSeriesToggle).not.toHaveBeenCalled();
		setShown(true);
		expect(buttons.every((button) => !button.disabled)).toBe(true);
	});

	it('matches the accessible DOM and default engine contract and supports both class props', () => {
		let root: HTMLDivElement | undefined;
		const container = mount(() => (
			<Liveline
				ref={(element) => (root = element)}
				data={points}
				value={12}
				showValue
				aria-label="Bitcoin live price"
				class="solid-class"
				className="compat-class"
				style={{ height: '300px' }}
				surfaceStyle={{ height: '240px' }}
				surfaceClassName="chart-only"
				id="market-chart"
				title="Market chart"
			/>
		));
		const canvas = container.querySelector('canvas');

		expect(root).toBe(container.querySelector('[data-slot="liveline"]'));
		expect(root?.classList.contains('solid-class')).toBe(true);
		expect(root?.classList.contains('compat-class')).toBe(true);
		expect(root?.id).toBe('market-chart');
		expect(root?.style.height).toBe('300px');
		expect(root?.querySelector<HTMLElement>('[data-slot="liveline-surface"]')?.style.height).toBe('240px');
		expect(root?.querySelector('.chart-only')).not.toBeNull();
		expect(root?.title).toBe('Market chart');
		expect(root?.querySelector('[data-slot="liveline-value"]')).not.toBeNull();
		expect(canvas?.getAttribute('role')).toBe('img');
		expect(canvas?.getAttribute('aria-label')).toBe('Bitcoin live price');
		expect(core.create).toHaveBeenCalledWith(
			expect.objectContaining({ container: root?.querySelector('[data-slot="liveline-surface"]'), canvas }),
			expect.objectContaining({ windowSecs: 30, showGrid: true, showBadge: true, showFill: true, scrub: true }),
		);
	});

	it('reconciles dynamic mode, windows, series ids, and value attachment', () => {
		const [mode, setMode] = createSignal<'line' | 'candle'>('line');
		const [lineMode, setLineMode] = createSignal(false);
		const [windows, setWindows] = createSignal([{ label: '1m', secs: 60 }]);
		const [showValue, setShowValue] = createSignal(false);
		const [series, setSeries] = createSignal([
			{ id: 'btc', label: 'Bitcoin', color: '#f00', data: points, value: 12 },
			{ id: 'eth', label: 'Ether', color: '#0f0', data: points, value: 8 },
		]);
		const container = mount(() => (
			<Liveline
				data={points}
				value={12}
				mode={mode()}
				lineMode={lineMode()}
				windows={windows()}
				window={15}
				series={series()}
				showValue={showValue()}
				onModeChange={() => {}}
			/>
		));
		expect(container.querySelector('[aria-label="Show line chart"]')?.getAttribute('aria-pressed')).toBe('true');
		container.querySelector<HTMLButtonElement>('[aria-label="Hide Bitcoin series"]')!.click();
		setSeries([
			{ id: 'sol', label: 'Solana', color: '#00f', data: points, value: 9 },
			{ id: 'xrp', label: 'XRP', color: '#0ff', data: points, value: 7 },
		]);
		setWindows([]);
		setMode('candle');
		setLineMode(true);
		setShowValue(true);
		expect(container.querySelector('[aria-label="Show line chart"]')?.getAttribute('aria-pressed')).toBe('true');
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ windowSecs: 15, hiddenSeriesIds: new Set(), valueElement: expect.any(HTMLElement) }));
		setLineMode(false);
		setShowValue(false);
		setWindows([{ label: '5m', secs: 300 }]);
		expect(container.querySelector('[aria-label="Show candle chart"]')?.getAttribute('aria-pressed')).toBe('true');
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ windowSecs: 300, valueElement: undefined }));
		expect(container.querySelectorAll('[role="group"]')).toHaveLength(3);
	});

	it('updates reactive props and controls without recreating the engine, then destroys it', () => {
		const onWindowChange = vi.fn();
		const onSeriesToggle = vi.fn();
		const [value, setValue] = createSignal(12);
		const [paused, setPaused] = createSignal(false);
		const container = mount(() => (
			<Liveline
				data={points}
				value={value()}
				paused={paused()}
				series={[
					{ id: 'btc', label: 'Bitcoin', color: '#f00', data: points, value: 12 },
					{ id: 'eth', label: 'Ether', color: '#0f0', data: points, value: 8 },
				]}
				windows={[
					{ label: '30s', secs: 30 },
					{ label: '1m', secs: 60 },
				]}
				onWindowChange={onWindowChange}
				onSeriesToggle={onSeriesToggle}
			/>
		));

		setValue(15);
		setPaused(true);
		expect(core.create).toHaveBeenCalledTimes(1);
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ value: 15, paused: true }));

		const minute = container.querySelector<HTMLButtonElement>('[aria-label="Show 1m time range"]')!;
		minute.click();
		expect(onWindowChange).toHaveBeenCalledWith(60);
		expect(minute.getAttribute('aria-pressed')).toBe('true');
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ windowSecs: 60 }));

		container.querySelector<HTMLButtonElement>('[aria-label="Hide Bitcoin series"]')!.click();
		expect(onSeriesToggle).toHaveBeenCalledWith('btc', false);
		expect(core.update).toHaveBeenLastCalledWith(expect.objectContaining({ hiddenSeriesIds: new Set(['btc']) }));

		disposers.pop()?.();
		expect(core.destroy).toHaveBeenCalledTimes(1);
	});
});

describe('Solid LivelineTransition', () => {
	it('reacts to child collection changes and settles rapid switches on the active layer', () => {
		vi.useFakeTimers();
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: false })),
		);
		const [active, setActive] = createSignal('a');
		const [duration, setDuration] = createSignal(300);
		const [includeC, setIncludeC] = createSignal(false);
		const container = mount(() => (
			<LivelineTransition active={active()} duration={duration()}>
				{(key) => <button>{key === 'c' ? (includeC() ? 'C' : '') : key.toUpperCase()}</button>}
			</LivelineTransition>
		));

		setActive('b');
		setIncludeC(true);
		setActive('c');
		setDuration(50);
		const inactive = Array.from(container.querySelectorAll<HTMLElement>('[data-slot="liveline-transition-layer"]')).find(
			(layer) => layer.getAttribute('aria-hidden') === 'true',
		);
		expect(inactive?.inert).toBe(true);
		vi.runAllTimers();

		const layers = container.querySelectorAll('[data-slot="liveline-transition-layer"]');
		expect(layers).toHaveLength(1);
		expect(layers[0].textContent).toBe('C');
		expect((layers[0] as HTMLElement).inert).toBe(false);
	});

	it('settles A to B to A without retaining the intermediate layer', () => {
		vi.useFakeTimers();
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: false })),
		);
		const [active, setActive] = createSignal('a');
		const container = mount(() => <LivelineTransition active={active()}>{(key) => <div>{key.toUpperCase()}</div>}</LivelineTransition>);
		setActive('b');
		setActive('a');
		vi.runAllTimers();
		expect(container.querySelectorAll('[data-slot="liveline-transition-layer"]')).toHaveLength(1);
		expect(container.textContent).toBe('A');
	});

	it('switches immediately for reduced motion and cancels pending work on cleanup', () => {
		const [active, setActive] = createSignal('line');
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: true })),
		);
		const container = mount(() => <LivelineTransition active={active()}>{(key) => <div>{key === 'line' ? 'Line' : 'Candle'}</div>}</LivelineTransition>);
		setActive('candle');
		expect(container.textContent).toBe('Candle');
		expect(container.querySelector('[data-slot="liveline-transition-layer"]')?.getAttribute('aria-hidden')).toBe('false');

		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({ matches: false })),
		);
		setActive('line');
		disposers.pop()?.();
		expect(cancelAnimationFrame).toHaveBeenCalled();
	});

	it('is SSR-safe across the server/client builds and hydrates without replacing nodes', () => {
		expect(() => execFileSync(process.execPath, ['test/fixtures/liveline-ssr.mjs'], { cwd: process.cwd(), stdio: 'pipe', maxBuffer: 20 * 1024 * 1024 })).not.toThrow();
	}, 20_000);
});
