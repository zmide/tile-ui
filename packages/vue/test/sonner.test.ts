import { createApp, defineComponent, h, nextTick } from 'vue';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SONNER_DISMISS_DURATION, type SonnerStore } from '@tile-ui/core';
import { Toaster, toast } from '../src/components/sonner/sonner';

const apps: Array<ReturnType<typeof createApp>> = [];

function mount(props: Record<string, unknown>) {
	const container = document.createElement('div');
	document.body.appendChild(container);
	const app = createApp(defineComponent({ setup: () => () => h(Toaster, props) }));
	apps.push(app);
	app.mount(container);
	return { app, container };
}

afterEach(() => {
	toast.dismissAll();
	if (vi.isFakeTimers()) vi.runOnlyPendingTimers();
	for (const app of apps.splice(0)) app.unmount();
	document.body.innerHTML = '';
	vi.useRealTimers();
	vi.restoreAllMocks();
});

describe('Vue Sonner ownership', () => {
	it('renders one singleton toast through the last mounted Toaster and hands off on unmount', async () => {
		vi.useFakeTimers();
		const first = mount({ duration: 100, class: 'first-owner' });
		const second = mount({ duration: 300, class: 'second-owner' });
		toast.success('Owned', { duration: 0 });
		await nextTick();
		expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1);
		expect(document.querySelector('.second-owner [data-slot="toast"]')?.textContent).toContain('Owned');
		expect(document.querySelector('.first-owner [data-slot="toast"]')).toBeNull();

		second.app.unmount();
		apps.splice(apps.indexOf(second.app), 1);
		await nextTick();
		expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1);
		expect(document.querySelector('.first-owner [data-slot="toast"]')?.textContent).toContain('Owned');

		toast.dismissAll();
		vi.advanceTimersByTime(SONNER_DISMISS_DURATION);
		toast('Restored duration');
		vi.advanceTimersByTime(99);
		await nextTick();
		expect(document.querySelector('[data-slot="toast"]')?.getAttribute('data-dismissing')).not.toBe('true');
		vi.advanceTimersByTime(1);
		await nextTick();
		expect(document.querySelector('[data-slot="toast"]')?.getAttribute('data-dismissing')).toBe('true');
		first.app.config.warnHandler = undefined;
	});

	it('emits per-toast rich color overrides', async () => {
		vi.useFakeTimers();
		mount({ richColors: true, class: 'rich-owner' });
		toast.success('Inherited', { duration: 0, description: 'Rich description' });
		toast.error('Plain', { duration: 0, richColors: false });
		toast.info('Rich', { duration: 0, richColors: true });
		toast.warning('Warning', { duration: 0 });
		await nextTick();
		const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-slot="toast"]'));
		expect(nodes.map((node) => node.dataset.richColors)).toEqual([undefined, 'false', 'true', undefined]);
		expect(document.querySelector('[data-slot="toaster"]')?.getAttribute('data-rich-colors')).toBe('true');
		expect([nodes[0].role, nodes[0].ariaLive, nodes[0].ariaAtomic]).toEqual(['status', 'polite', 'true']);
		expect([nodes[1].role, nodes[1].ariaLive, nodes[1].ariaAtomic]).toEqual(['alert', 'assertive', 'true']);
		expect([nodes[3].role, nodes[3].ariaLive, nodes[3].ariaAtomic]).toEqual(['alert', 'assertive', 'true']);
		expect(nodes[0].textContent).toContain('Rich description');
		expect(nodes[0].querySelector('button[aria-label="关闭"]')).not.toBeNull();
	});

	it('preserves exact shared-style fallbacks for rich and non-rich descendants', () => {
		const source = readFileSync(path.resolve(import.meta.dirname, '../../styles/scss/components/sonner.module.scss'), 'utf8');
		expect(source).toContain(".toast:not([data-rich-colors='false'])");
		expect(source).toContain(".toast[data-rich-colors='true']");
		expect(source).toMatch(/\.description,\s*\.close,\s*\.close:hover\s*\{\s*color: var\(--tile-toast-rich-description-color, inherit\);/);
		expect(source).toMatch(/\.description\s*\{[^}]*color: var\(--tile-toast-description-color, \$muted-foreground\);/);
		expect(source).toMatch(/\.close\s*\{[^}]*color: \$muted-foreground;/);
		for (const [type, original] of Object.entries({ success: 'success', info: 'info', warning: 'warning', error: 'destructive' })) {
			expect(source).toContain(`background-color: var(--tile-toast-${type}-background, $${original});`);
			expect(source).toContain(`color: var(--tile-toast-rich-color, $${original}-foreground);`);
			expect(source).toContain(`color: var(--tile-toast-${type}-color, $${original}-foreground);`);
		}
	});

	it('keeps the framework store compatible with immutable update patches', () => {
		const accept = (_store: SonnerStore) => undefined;
		// @ts-expect-error Toast IDs are immutable across framework adapters.
		const invalid: Parameters<SonnerStore['update']>[1] = { id: 'unsafe' };
		// @ts-expect-error Toast dismissal state is store-managed.
		const invalidLifecycle: Parameters<SonnerStore['update']>[1] = { dismissing: true };
		expect([accept, invalid, invalidLifecycle]).toHaveLength(3);
	});
});
