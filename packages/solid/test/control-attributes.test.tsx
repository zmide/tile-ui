import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it } from 'vitest';
import { Input } from '../src/components/input/input';

const disposers: Array<() => void> = [];
afterEach(() => {
	for (const dispose of disposers.splice(0)) dispose();
	document.body.innerHTML = '';
});
describe('Input native and visual size compatibility', () => {
	it('keeps native size and form semantics while visual size updates', () => {
		const [controlSize, setControlSize] = createSignal<'sm' | 'lg'>('sm');
		const container = document.createElement('div');
		document.body.appendChild(container);
		let inputRef: HTMLInputElement | undefined;
		disposers.push(
			render(
				() => (
					<Input
						ref={(node) => {
							inputRef = node;
						}}
						id="email"
						label="Email"
						required
						size={30}
						controlSize={controlSize()}
						error="Invalid email"
					/>
				),
				container,
			),
		);
		const input = container.querySelector('input')!;
		expect(input.size).toBe(30);
		expect(input.required).toBe(true);
		expect(inputRef).toBe(input);
		expect(input.dataset.controlSize).toBe('sm');
		expect(input.hasAttribute('controlSize')).toBe(false);
		expect(input.getAttribute('aria-describedby')).toBe('email-error');
		setControlSize('lg');
		expect(input.dataset.controlSize).toBe('lg');
		expect(input.size).toBe(30);
	});
});
