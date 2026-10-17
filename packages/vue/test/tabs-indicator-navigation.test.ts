import { createApp, createSSRApp, h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tabs, TabsList, TabsTrigger } from '../src/components/tabs/tabs';

vi.mock('@tile-ui/core', () => import('../../core/src/components/tabs'));
const apps: Array<ReturnType<typeof createApp>> = [];
const disconnect = vi.fn();
class MockResizeObserver {
	observe() {}
	disconnect = disconnect;
}

afterEach(() => {
	for (const app of apps.splice(0)) app.unmount();
	document.body.innerHTML = '';
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
	disconnect.mockClear();
});

describe('Vue tabs indicator', () => {
	it('measures initial/controlled selection and disposes its observer', async () => {
		vi.stubGlobal('ResizeObserver', MockResizeObserver);
		vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
			const left = this.dataset.value === 'b' ? 80 : 0;
			return { x: left, y: 0, left, top: 0, width: this.dataset.value === 'b' ? 100 : 80, height: 32, right: left + 100, bottom: 32, toJSON: () => ({}) };
		});
		const value = ref('a');
		const app = createApp({
			setup: () => () =>
				h(Tabs, { modelValue: value.value }, () => h(TabsList, {}, () => [h(TabsTrigger, { value: 'a' }, () => 'A'), h(TabsTrigger, { value: 'b' }, () => 'Longer B')])),
		});
		apps.push(app);
		const container = document.createElement('div');
		document.body.appendChild(container);
		app.mount(container);
		const indicator = container.querySelector<HTMLElement>('[data-slot="tabs-indicator"]')!;
		expect(indicator.getAttribute('aria-hidden')).toBe('true');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('80px');
		value.value = 'b';
		await nextTick();
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-left')).toBe('80px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('100px');
		app.unmount();
		apps.pop();
		expect(disconnect).toHaveBeenCalled();
	});

	it('SSR leaves the indicator hidden and unmeasured', async () => {
		const app = createSSRApp({ render: () => h(Tabs, { defaultValue: 'a' }, () => h(TabsList, {}, () => h(TabsTrigger, { value: 'a' }, () => 'A'))) });
		const html = await renderToString(app);
		expect(html).toContain('data-slot="tabs-indicator"');
		expect(html).toContain('data-state="hidden"');
		expect(html).not.toContain('--tile-tabs-indicator-left');
	});
});
