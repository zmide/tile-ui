import { createApp, h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Input } from '../src/components/input/input';

const apps: Array<ReturnType<typeof createApp>> = [];
afterEach(() => {
	for (const app of apps.splice(0)) app.unmount();
	document.body.innerHTML = '';
});
describe('Input native and visual size compatibility', () => {
	it('forwards native attrs to the input and reacts to visual size without changing native size', async () => {
		const controlSize = ref<'sm' | 'lg'>('sm');
		const onInput = vi.fn();
		const onUpdate = vi.fn();
		const container = document.createElement('div');
		document.body.appendChild(container);
		const app = createApp({
			setup: () => () =>
				h(Input, {
					id: 'email',
					label: 'Email',
					required: true,
					size: 30,
					controlSize: controlSize.value,
					class: 'custom',
					name: 'email',
					'aria-label': 'Email address',
					onInput,
					'onUpdate:modelValue': onUpdate,
				}),
		});
		apps.push(app);
		app.mount(container);
		const input = container.querySelector('input')!;
		expect(input.size).toBe(30);
		expect(input.required).toBe(true);
		expect(input.name).toBe('email');
		expect(input.getAttribute('aria-label')).toBe('Email address');
		expect(input.className).toContain('custom');
		expect(input.dataset.controlSize).toBe('sm');
		expect(container.firstElementChild?.hasAttribute('size')).toBe(false);
		input.value = 'hello';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		expect(onInput).toHaveBeenCalledOnce();
		expect(onUpdate).toHaveBeenCalledWith('hello');
		controlSize.value = 'lg';
		await nextTick();
		expect(input.dataset.controlSize).toBe('lg');
		expect(input.size).toBe(30);
	});
});
