import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tabs, TabsList, TabsTrigger } from '../src/components/tabs/tabs';

vi.mock('@tile-ui/core', () => import('../../core/src/components/tabs'));
const disposers: Array<() => void> = [];
const disconnect = vi.fn();
class MockResizeObserver {
	observe() {}
	disconnect = disconnect;
}

afterEach(() => {
	for (const dispose of disposers.splice(0)) dispose();
	document.body.innerHTML = '';
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
	disconnect.mockClear();
});

describe('Solid tabs indicator', () => {
	it('measures initial/controlled selection and disposes its observer', async () => {
		vi.stubGlobal('ResizeObserver', MockResizeObserver);
		vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
			const left = this.dataset.value === 'b' ? 80 : 0;
			return { x: left, y: 0, left, top: 0, width: this.dataset.value === 'b' ? 100 : 80, height: 32, right: left + 100, bottom: 32, toJSON: () => ({}) };
		});
		const [value, setValue] = createSignal('a');
		const container = document.createElement('div');
		document.body.appendChild(container);
		let list: HTMLDivElement | undefined;
		const dispose = render(
			() => (
				<Tabs value={value()}>
					<TabsList
						ref={(element) => {
							list = element;
						}}>
						<TabsTrigger value="a">A</TabsTrigger>
						<TabsTrigger value="b">Longer B</TabsTrigger>
					</TabsList>
				</Tabs>
			),
			container,
		);
		disposers.push(dispose);
		const indicator = container.querySelector<HTMLElement>('[data-slot="tabs-indicator"]')!;
		expect(list?.getAttribute('role')).toBe('tablist');
		expect(indicator.getAttribute('aria-hidden')).toBe('true');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('80px');
		setValue('b');
		await Promise.resolve();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-left')).toBe('80px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('100px');
		dispose();
		disposers.pop();
		expect(disconnect).toHaveBeenCalled();
	});
});
