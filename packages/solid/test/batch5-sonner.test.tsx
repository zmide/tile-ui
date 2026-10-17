import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createSignal, type JSX } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SONNER_DISMISS_DURATION, type SonnerStore } from '@tile-ui/core';
import { Toaster, toast, useToast } from '../src/components/sonner/sonner';

const disposers: Array<() => void> = [];

function mount(node: () => JSX.Element) {
	const container = document.createElement('div');
	document.body.appendChild(container);
	const dispose = render(node, container);
	disposers.push(dispose);
	return { container, dispose };
}

function toastNodes() {
	return Array.from(document.querySelectorAll<HTMLElement>('[data-slot="toast"]'));
}

afterEach(() => {
	toast.dismissAll();
	if (vi.isFakeTimers()) vi.runOnlyPendingTimers();
	for (const dispose of disposers.splice(0)) dispose();
	document.body.innerHTML = '';
	vi.useRealTimers();
	vi.restoreAllMocks();
});

describe('Solid Sonner Batch 5 lane', () => {
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

	it('exports a browser singleton API and subscribes through useToast', () => {
		vi.useFakeTimers();
		const { container } = mount(() => {
			const state = useToast();
			return (
				<>
					<output data-count>{state.toasts().length}</output>
					<Toaster data-id="root" />
				</>
			);
		});
		expect(container.querySelector('[data-id="root"]')?.getAttribute('data-slot')).toBe('toaster-root');
		expect(document.querySelectorAll('[data-slot="toaster"]')).toHaveLength(6);
		expect(container.querySelector('[data-count]')?.textContent).toBe('0');
		const id = toast('Saved', { duration: 0 });
		expect(id).not.toBe('');
		expect(container.querySelector('[data-count]')?.textContent).toBe('1');
		expect(toastNodes()[0].textContent).toContain('Saved');
	});

	it('routes positions, merges default and per-toast rich colors, and exposes live-region semantics', () => {
		vi.useFakeTimers();
		mount(() => <Toaster position="top-left" richColors />);
		toast.success('Default rich', { duration: 0, description: 'Rich description' });
		toast.error('Plain override', { duration: 0, position: 'bottom-center', richColors: false });
		toast.info('Rich override', { duration: 0, position: 'top-right', richColors: true });
		toast.warning('Warning', { duration: 0, position: 'bottom-left' });

		const topLeft = document.querySelector<HTMLElement>('[data-position="top-left"]')!;
		const bottomCenter = document.querySelector<HTMLElement>('[data-position="bottom-center"]')!;
		const topRight = document.querySelector<HTMLElement>('[data-position="top-right"]')!;
		const bottomLeft = document.querySelector<HTMLElement>('[data-position="bottom-left"]')!;
		expect(topLeft.hidden).toBe(false);
		expect(topLeft.dataset.richColors).toBe('true');
		expect(bottomCenter.querySelector('[data-slot="toast"]')?.getAttribute('data-rich-colors')).toBe('false');
		expect(topRight.querySelector('[data-slot="toast"]')?.getAttribute('data-rich-colors')).toBe('true');
		expect(topLeft.querySelector('[data-slot="toast"]')?.getAttribute('role')).toBe('status');
		expect(topLeft.querySelector('[data-slot="toast"]')?.getAttribute('aria-live')).toBe('polite');
		expect(topLeft.querySelector('[data-slot="toast"]')?.getAttribute('aria-atomic')).toBe('true');
		expect(topLeft.textContent).toContain('Rich description');
		expect(bottomCenter.querySelector('[data-slot="toast"]')?.getAttribute('role')).toBe('alert');
		expect(bottomCenter.querySelector('[data-slot="toast"]')?.getAttribute('aria-live')).toBe('assertive');
		expect(bottomLeft.querySelector('[data-slot="toast"]')?.getAttribute('role')).toBe('alert');
		expect(bottomLeft.querySelector('[data-slot="toast"]')?.getAttribute('aria-live')).toBe('assertive');
	});

	it('renders close buttons by default, honors both close controls, and dismisses safely', () => {
		vi.useFakeTimers();
		mount(() => <Toaster />);
		const closable = toast('Closable', { duration: 0 });
		toast('Pinned', { duration: 0, dismissible: false });
		expect(document.querySelectorAll('button[aria-label="关闭"]')).toHaveLength(1);
		(document.querySelector('button[aria-label="关闭"]') as HTMLButtonElement).click();
		expect(document.querySelector(`[data-slot="toast"][data-dismissing="true"]`)?.textContent).toContain('Closable');
		toast.dismiss(closable);
		toast.dismiss(closable);
		vi.advanceTimersByTime(SONNER_DISMISS_DURATION);
		expect(toastNodes()).toHaveLength(1);

		for (const dispose of disposers.splice(0)) dispose();
		document.body.innerHTML = '';
		mount(() => <Toaster closeButton={false} />);
		toast('No close', { duration: 0 });
		expect(document.querySelector('button[aria-label="关闭"]')).toBeNull();
	});

	it('uses the last mounted duration owner and restores the prior policy on cleanup', () => {
		vi.useFakeTimers();
		const first = mount(() => <Toaster duration={100} data-owner="first" />);
		const second = mount(() => <Toaster duration={300} data-owner="second" />);
		toast('Latest duration', { duration: 0 });
		expect(toastNodes()).toHaveLength(1);
		expect(document.querySelector('[data-slot="toaster"]')?.closest('[data-owner]')).toBeNull();
		expect(first.container.querySelector('[data-owner="first"]')?.nextSibling).toBeNull();
		second.dispose();
		disposers.splice(disposers.indexOf(second.dispose), 1);
		expect(toastNodes()).toHaveLength(1);
		expect(toastNodes()[0].textContent).toContain('Latest duration');
		toast.dismissAll();
		vi.advanceTimersByTime(SONNER_DISMISS_DURATION);
		toast('Restored duration');
		expect(toastNodes()).toHaveLength(1);
		vi.advanceTimersByTime(99);
		expect(toastNodes()[0].dataset.dismissing).toBeUndefined();
		vi.advanceTimersByTime(1);
		expect(toastNodes()[0].dataset.dismissing).toBe('true');
	});

	it('reacts to system theme changes and removes matchMedia listeners', () => {
		vi.useFakeTimers();
		let dark = false;
		const listeners = new Set<() => void>();
		const media = {
			get matches() {
				return dark;
			},
			addEventListener: vi.fn((_type: string, listener: () => void) => listeners.add(listener)),
			removeEventListener: vi.fn((_type: string, listener: () => void) => listeners.delete(listener)),
		};
		vi.spyOn(window, 'matchMedia').mockReturnValue(media as unknown as MediaQueryList);
		let setTheme!: (theme: 'system' | 'light') => void;
		const mounted = mount(() => {
			const [theme, updateTheme] = createSignal<'system' | 'light'>('system');
			setTheme = updateTheme;
			return <Toaster theme={theme()} />;
		});
		expect(document.querySelector('[data-position="bottom-right"]')?.getAttribute('data-theme')).toBe('light');
		dark = true;
		for (const listener of listeners) listener();
		expect(document.querySelector('[data-position="bottom-right"]')?.getAttribute('data-theme')).toBe('dark');
		setTheme('light');
		expect(media.removeEventListener).toHaveBeenCalledOnce();
		mounted.dispose();
		disposers.splice(disposers.indexOf(mounted.dispose), 1);
		expect(listeners.size).toBe(0);
	});

	it('reschedules duration updates and makes dismissAll repeat-safe in the shared core store', async () => {
		vi.useFakeTimers();
		mount(() => <Toaster />);
		const id = toast.loading('Working', { duration: 1000 });
		vi.advanceTimersByTime(800);
		toast.loading({ id, title: 'Done', duration: 500 });
		vi.advanceTimersByTime(499);
		expect(toastNodes()[0].dataset.dismissing).toBeUndefined();
		vi.advanceTimersByTime(1);
		expect(toastNodes()[0].dataset.dismissing).toBe('true');
		toast.dismissAll();
		toast.dismissAll();
		vi.advanceTimersByTime(SONNER_DISMISS_DURATION);
		expect(toastNodes()).toEqual([]);
	});

	it('keeps framework update patches free of store-managed fields', () => {
		// @ts-expect-error Toast IDs are immutable.
		const invalidId: Parameters<SonnerStore['update']>[1] = { id: 'unsafe' };
		// @ts-expect-error Toast dismissal state is store-managed.
		const invalidLifecycle: Parameters<SonnerStore['update']>[1] = { dismissing: true };
		expect([invalidId, invalidLifecycle]).toHaveLength(2);
	});

	it('has deterministic empty deep SSR, request isolation, and stable hydration', () => {
		expect(() => execFileSync(process.execPath, ['test/fixtures/batch5-sonner-ssr.mjs'], { cwd: process.cwd(), stdio: 'pipe', maxBuffer: 20 * 1024 * 1024 })).not.toThrow();
	}, 20_000);
});
