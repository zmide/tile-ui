// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { observeTabsIndicator } from '../src/components/tabs/tabs.indicator';

const disposers: Array<() => void> = [];
const observers: MockResizeObserver[] = [];
class MockResizeObserver {
	callback: ResizeObserverCallback;
	observe = vi.fn();
	disconnect = vi.fn();
	constructor(callback: ResizeObserverCallback) {
		this.callback = callback;
		observers.push(this);
	}
	resize() {
		this.callback([], this as unknown as ResizeObserver);
	}
}

function rect(left: number, top: number, width: number, height: number): DOMRect {
	return { left, top, width, height, x: left, y: top, right: left + width, bottom: top + height, toJSON: () => ({}) };
}

function fixture() {
	vi.stubGlobal('ResizeObserver', MockResizeObserver);
	document.body.innerHTML =
		'<div role="tablist"><button role="tab" aria-selected="true">One</button><button role="tab" aria-selected="false">Two</button><span data-slot="tabs-indicator" aria-hidden="true"></span></div>';
	const list = document.querySelector<HTMLElement>('[role="tablist"]')!;
	const [one, two] = list.querySelectorAll<HTMLElement>('[role="tab"]');
	const indicator = list.querySelector<HTMLElement>('[data-slot="tabs-indicator"]')!;
	vi.spyOn(list, 'getBoundingClientRect').mockReturnValue(rect(100, 40, 240, 60));
	vi.spyOn(one, 'getBoundingClientRect').mockReturnValue(rect(104, 44, 70, 32));
	const twoRect = vi.spyOn(two, 'getBoundingClientRect').mockReturnValue(rect(174, 44, 120, 32));
	const measurement = observeTabsIndicator(list, indicator);
	disposers.push(measurement.disconnect);
	return { list, one, two, twoRect, indicator, measurement };
}

afterEach(() => {
	for (const dispose of disposers.splice(0)) dispose();
	observers.length = 0;
	document.body.innerHTML = '';
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

describe('framework-neutral tabs indicator measurement', () => {
	it('measures immediately, follows selection and resizes without contributing to layout', async () => {
		const { one, two, twoRect, indicator } = fixture();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-left')).toBe('4px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-top')).toBe('4px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('70px');
		one.setAttribute('aria-selected', 'false');
		two.setAttribute('aria-selected', 'true');
		await Promise.resolve();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-left')).toBe('74px');
		twoRect.mockReturnValue(rect(174, 44, 140, 32));
		observers[0].resize();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('140px');
		expect(indicator.dataset.state).toBe('visible');
	});

	it('handles vertical coordinates, RTL scrolling, borders and scaled ancestors', () => {
		const { list, one, indicator, measurement } = fixture();
		list.dir = 'rtl';
		list.dataset.orientation = 'vertical';
		list.scrollLeft = -20;
		list.scrollTop = 30;
		Object.defineProperties(list, { offsetWidth: { value: 120 }, offsetHeight: { value: 30 }, clientLeft: { value: 1 }, clientTop: { value: 1 } });
		vi.mocked(one.getBoundingClientRect).mockReturnValue(rect(164, 64, 100, 40));
		measurement.update();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-left')).toBe('11px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-top')).toBe('41px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('50px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-height')).toBe('20px');
	});

	it('ignores nested lists but observes added/relabelled owned tabs', async () => {
		const { list, one, indicator, measurement } = fixture();
		const nested = document.createElement('div');
		nested.setAttribute('role', 'tablist');
		nested.innerHTML = '<button role="tab" aria-selected="true">Nested</button>';
		list.prepend(nested);
		measurement.update();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('70px');
		expect(observers[0].observe).not.toHaveBeenCalledWith(nested.firstElementChild);
		vi.mocked(one.getBoundingClientRect).mockReturnValue(rect(104, 44, 90, 32));
		one.textContent = 'A longer label';
		await Promise.resolve();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('90px');
		one.remove();
		await Promise.resolve();
		expect(indicator.dataset.state).toBe('hidden');
	});

	it('remeasures fonts and removes listeners/observers; late font readiness is inert', async () => {
		let ready!: () => void;
		const fonts = new EventTarget();
		Object.defineProperty(fonts, 'ready', {
			value: new Promise<void>((resolve) => {
				ready = resolve;
			}),
		});
		Object.defineProperty(document, 'fonts', { configurable: true, value: fonts });
		const remove = vi.spyOn(fonts, 'removeEventListener');
		const { one, indicator, measurement } = fixture();
		vi.mocked(one.getBoundingClientRect).mockReturnValue(rect(104, 44, 100, 32));
		fonts.dispatchEvent(new Event('loadingdone'));
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('100px');
		measurement.disconnect();
		vi.mocked(one.getBoundingClientRect).mockReturnValue(rect(104, 44, 200, 32));
		ready();
		await Promise.resolve();
		window.dispatchEvent(new Event('resize'));
		observers[0].resize();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('100px');
		expect(remove).toHaveBeenCalledWith('loadingdone', expect.any(Function));
		expect(observers[0].disconnect).toHaveBeenCalled();
		Reflect.deleteProperty(document, 'fonts');
	});
});
