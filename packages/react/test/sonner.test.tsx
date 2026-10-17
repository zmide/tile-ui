// @vitest-environment jsdom

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SONNER_DISMISS_DURATION, type SonnerStore } from '@tile-ui/core';
import { Toaster, toast } from '../src/components/sonner/sonner';

const roots: Array<ReturnType<typeof createRoot>> = [];
(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function mount(node: React.ReactNode) {
	const container = document.createElement('div');
	document.body.appendChild(container);
	const root = createRoot(container);
	roots.push(root);
	act(() => root.render(node));
	return { container, root };
}

afterEach(() => {
	act(() => toast.dismissAll());
	if (vi.isFakeTimers()) act(() => vi.runOnlyPendingTimers());
	for (const root of roots.splice(0)) act(() => root.unmount());
	document.body.innerHTML = '';
	vi.useRealTimers();
	vi.restoreAllMocks();
});

describe('React Sonner ownership', () => {
	it('renders one singleton toast through the last mounted Toaster and hands off on unmount', () => {
		vi.useFakeTimers();
		const first = mount(<Toaster duration={100} className="first-owner" />);
		const second = mount(<Toaster duration={300} className="second-owner" />);
		act(() => toast.success('Owned', { duration: 0 }));
		expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1);
		expect(document.querySelector('.second-owner [data-slot="toast"]')?.textContent).toContain('Owned');
		expect(document.querySelector('.first-owner [data-slot="toast"]')).toBeNull();

		act(() => second.root.unmount());
		roots.splice(roots.indexOf(second.root), 1);
		expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1);
		expect(document.querySelector('.first-owner [data-slot="toast"]')?.textContent).toContain('Owned');

		act(() => toast.dismissAll());
		act(() => vi.advanceTimersByTime(SONNER_DISMISS_DURATION));
		act(() => toast('Restored duration'));
		act(() => vi.advanceTimersByTime(99));
		expect(document.querySelector('[data-slot="toast"]')?.getAttribute('data-dismissing')).not.toBe('true');
		act(() => vi.advanceTimersByTime(1));
		expect(document.querySelector('[data-slot="toast"]')?.getAttribute('data-dismissing')).toBe('true');
		act(() => first.root.render(<Toaster duration={100} className="first-owner" />));
	});

	it('emits per-toast rich color overrides', () => {
		vi.useFakeTimers();
		mount(<Toaster richColors className="rich-owner" />);
		act(() => {
			toast.success('Inherited', { duration: 0, description: 'Rich description' });
			toast.error('Plain', { duration: 0, richColors: false });
			toast.info('Rich', { duration: 0, richColors: true });
			toast.warning('Warning', { duration: 0 });
		});
		const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-slot="toast"]'));
		expect(nodes.map((node) => node.dataset.richColors)).toEqual([undefined, 'false', 'true', undefined]);
		expect(document.querySelector('[data-slot="toaster"]')?.getAttribute('data-rich-colors')).toBe('true');
		expect([nodes[0].role, nodes[0].ariaLive, nodes[0].ariaAtomic]).toEqual(['status', 'polite', 'true']);
		expect([nodes[1].role, nodes[1].ariaLive, nodes[1].ariaAtomic]).toEqual(['alert', 'assertive', 'true']);
		expect([nodes[3].role, nodes[3].ariaLive, nodes[3].ariaAtomic]).toEqual(['alert', 'assertive', 'true']);
		expect(nodes[0].textContent).toContain('Rich description');
		expect(nodes[0].querySelector('button[aria-label="关闭"]')).not.toBeNull();
	});

	it('keeps rich descendants on the toast foreground while non-rich rules stay muted', () => {
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
