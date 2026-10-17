import { createApp, defineComponent, h, nextTick, reactive } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

const engine = vi.hoisted(() => ({ update: vi.fn(), destroy: vi.fn() }));
const create = vi.hoisted(() => vi.fn((_elements: unknown, _config: { palette: { bgRgb: number[] } }) => engine));
vi.mock('@tile-ui/core/liveline', async (importOriginal) => ({ ...(await importOriginal<typeof import('@tile-ui/core/liveline')>()), createLivelineEngine: create }));

import { Liveline } from '../src/components/liveline/liveline';

const apps: ReturnType<typeof createApp>[] = [];
const data = [{ time: 1, value: 10 }];

afterEach(() => {
	for (const app of apps.splice(0)) app.unmount();
	document.body.innerHTML = '';
	document.documentElement.style.removeProperty('--tile-color-mode');
	vi.clearAllMocks();
	vi.restoreAllMocks();
});

function mount() {
	const props = reactive<{ theme?: 'light' | 'dark' }>({});
	const host = document.createElement('div');
	document.body.appendChild(host);
	const app = createApp(defineComponent({ setup: () => () => h(Liveline, { data, value: 10, ...props }) }));
	apps.push(app);
	app.mount(host);
	return { app, props, widget: host.querySelector<HTMLElement>('[data-slot="liveline"]')! };
}

// jsdom has no inherited custom properties; leave actual MutationObserver and
// Vue lifecycle behavior intact while exposing a minimal stylesheet contract.
function stylesheetContract() {
	const native = window.getComputedStyle.bind(window);
	vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
		const style = native(element);
		return new Proxy(style, {
			get(target, property) {
				if (property === 'getPropertyValue')
					return (name: string) => (name === '--tile-color-mode' ? document.documentElement.style.getPropertyValue(name) : target.getPropertyValue(name));
				return Reflect.get(target, property);
			},
		});
	});
}

async function settle() {
	await Promise.resolve();
	await nextTick();
	await Promise.resolve();
	await nextTick();
}

describe('Vue Liveline theme inheritance', () => {
	it('retains the default dark mode when the stylesheet contract is absent', () => {
		const { widget } = mount();
		expect(widget.dataset.theme).toBe('dark');
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb ?? create.mock.lastCall?.[1].palette.bgRgb).toEqual([10, 10, 10]);
	});

	it('inherits stylesheet mode changes without recreating the engine and cleans up', async () => {
		stylesheetContract();
		document.documentElement.style.setProperty('--tile-color-mode', 'light');
		const { widget, props, app } = mount();
		await settle();
		expect(widget.dataset.colorMode).toBe('light');
		expect(widget.dataset.theme).toBeUndefined();
		const canvas = widget.querySelector('canvas');
		document.documentElement.style.setProperty('--tile-color-mode', 'dark');
		await settle();
		expect(widget.dataset.colorMode).toBe('dark');
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb).toEqual([10, 10, 10]);
		props.theme = 'light';
		await settle();
		expect(widget.dataset.theme).toBe('light');
		expect(engine.update.mock.lastCall?.[0].palette.bgRgb).toEqual([255, 255, 255]);
		document.documentElement.style.setProperty('--tile-color-mode', 'light');
		await settle();
		expect(widget.dataset.theme).toBe('light');
		expect(widget.querySelector('canvas')).toBe(canvas);
		expect(create).toHaveBeenCalledTimes(1);
		app.unmount();
		apps.splice(apps.indexOf(app), 1);
		engine.update.mockClear();
		document.documentElement.style.setProperty('--tile-color-mode', 'dark');
		await settle();
		expect(engine.update).not.toHaveBeenCalled();
		expect(engine.destroy).toHaveBeenCalledTimes(1);
	});
});
