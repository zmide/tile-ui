// @vitest-environment jsdom
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { Input } from '../src/components/input/input';
import { Button } from '../src/components/button/button';

const roots: Array<ReturnType<typeof createRoot>> = [];
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
afterEach(() => {
	for (const root of roots.splice(0)) act(() => root.unmount());
	document.body.innerHTML = '';
});
function mount(node: React.ReactNode) {
	const container = document.createElement('div');
	document.body.appendChild(container);
	const root = createRoot(container);
	roots.push(root);
	act(() => root.render(node));
	return container;
}
describe('Control attribute and composition compatibility', () => {
	it('keeps native Input size, required, refs and ARIA independent of visual size', () => {
		const ref = React.createRef<HTMLInputElement>();
		const container = mount(<Input ref={ref} id="email" label="Email" size={30} controlSize="sm" required error="Invalid email" />);
		const input = container.querySelector('input')!;
		expect(input.size).toBe(30);
		expect(input.required).toBe(true);
		expect(input.dataset.controlSize).toBe('sm');
		expect(input.hasAttribute('controlSize')).toBe(false);
		expect(ref.current).toBe(input);
		expect(container.querySelector('label')?.htmlFor).toBe(input.id);
		expect(input.getAttribute('aria-describedby')).toBe('email-error');
	});
	it('does not add emphasis wrappers or break Button asChild', () => {
		const container = mount(
			<Button asChild>
				<a href="/save">
					<span>Save</span>
				</a>
			</Button>,
		);
		const anchor = container.querySelector('a')!;
		expect(container.querySelector('button')).toBeNull();
		expect(anchor.children).toHaveLength(1);
		expect(anchor.firstElementChild?.textContent).toBe('Save');
		expect(anchor.className).toContain('variantDefault');
	});
	it('keeps a loading asChild button structurally valid and disabled', () => {
		const container = mount(
			<Button asChild loading>
				<button type="button">Save</button>
			</Button>,
		);
		const button = container.querySelector('button')!;
		expect(button.disabled).toBe(true);
		expect(button.textContent).toBe('Save');
		expect(button.childElementCount).toBe(0);
	});
});
