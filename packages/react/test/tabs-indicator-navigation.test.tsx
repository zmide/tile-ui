// @vitest-environment jsdom

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tabs, TabsList, TabsTrigger } from '../src/components/tabs/tabs';

vi.mock('@tile-ui/core', () => import('../../core/src/components/tabs'));
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const roots: Array<ReturnType<typeof createRoot>> = [];
const disconnect = vi.fn();
class MockResizeObserver {
	observe() {}
	disconnect = disconnect;
}

afterEach(() => {
	for (const root of roots.splice(0)) act(() => root.unmount());
	document.body.innerHTML = '';
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
	disconnect.mockClear();
});

describe('React tabs indicator', () => {
	it('is internal, forwards the list ref, measures controlled changes and cleans up StrictMode mounts', () => {
		vi.stubGlobal('ResizeObserver', MockResizeObserver);
		vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
			const left = this.dataset.value === 'b' ? 80 : 0;
			return { x: left, y: 0, left, top: 0, width: this.dataset.value === 'b' ? 100 : 80, height: 32, right: left + 100, bottom: 32, toJSON: () => ({}) };
		});
		const container = document.createElement('div');
		document.body.appendChild(container);
		const root = createRoot(container);
		roots.push(root);
		const ref = React.createRef<HTMLDivElement>();
		const render = (value: string) => (
			<React.StrictMode>
				<Tabs value={value}>
					<TabsList ref={ref}>
						<TabsTrigger value="a">A</TabsTrigger>
						<TabsTrigger value="b">Longer B</TabsTrigger>
					</TabsList>
				</Tabs>
			</React.StrictMode>
		);
		act(() => root.render(render('a')));
		const indicator = container.querySelector<HTMLElement>('[data-slot="tabs-indicator"]')!;
		expect(ref.current?.getAttribute('role')).toBe('tablist');
		expect(indicator.getAttribute('aria-hidden')).toBe('true');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('80px');
		act(() => root.render(render('b')));
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-left')).toBe('80px');
		expect(indicator.style.getPropertyValue('--tile-tabs-indicator-width')).toBe('100px');
		act(() => root.unmount());
		roots.pop();
		expect(ref.current).toBeNull();
		expect(disconnect).toHaveBeenCalled();
	});
});
