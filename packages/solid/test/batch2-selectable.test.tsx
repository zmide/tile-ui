import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createSignal, type JSX } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Checkbox } from '../src/components/checkbox/checkbox';
import { RadioGroup, RadioGroupItem } from '../src/components/radio-group/radio-group';
import { Switch } from '../src/components/switch/switch';
import { ToggleGroup, ToggleGroupItem } from '../src/components/toggle-group/toggle-group';

const disposers: Array<() => void> = [];

function mount(node: () => JSX.Element) {
	const container = document.createElement('div');
	document.body.appendChild(container);
	disposers.push(render(node, container));
	return container;
}

function keydown(element: HTMLElement, key: string) {
	element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

function applyGeneratedToggleGroupCss(group: HTMLElement, item: HTMLElement) {
	const css = readFileSync(path.resolve(import.meta.dirname, '../../styles/css/components/toggle-group.css'), 'utf8');
	expect(css).toContain('.root[data-orientation=horizontal]>*:not(:first-child){border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}');
	expect(css).toContain('.root[data-orientation=vertical]{flex-direction:column;align-items:stretch}');
	expect(css).toContain('.root[data-orientation=vertical]>*:not(:first-child){border-top:none;border-top-left-radius:0;border-top-right-radius:0}');
	expect(css).toContain('.root[data-orientation=vertical]>*:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}');
	const rootClass = group.classList[0];
	const itemClass = item.classList[0];
	const runtimeClasses = Array.from(group.querySelectorAll<HTMLElement>(':scope > *')).flatMap((element) => Array.from(element.classList));
	const resolveRuntimeClass = (reference: string) => runtimeClasses.find((className) => className.includes(reference));
	let runtimeCss = css.replaceAll('.root', `.${rootClass}`).replaceAll('.item', `.${itemClass}`);
	// Happy DOM does not resolve these custom-property fallbacks in computed sizes.
	// Assert the generated contract before materializing its default values here.
	expect(css).toMatch(/var\(--tile-toggle-group-sm-height,\s*2rem\)/);
	expect(css).toMatch(/var\(--tile-toggle-group-lg-height,\s*2\.5rem\)/);
	runtimeCss = runtimeCss.replace(/var\(--tile-toggle-group-(?:sm|lg)-height,\s*([^()]+)\)/g, '$1');
	for (const reference of ['variantOutline', 'variantGhost', 'sizeDefault', 'sizeSm', 'sizeLg']) {
		const runtimeClass = resolveRuntimeClass(reference);
		if (runtimeClass) runtimeCss = runtimeCss.replaceAll(`.${reference}`, `.${runtimeClass}`);
	}
	const style = document.createElement('style');
	style.textContent = runtimeCss;
	document.head.appendChild(style);
	return () => style.remove();
}

afterEach(() => {
	for (const dispose of disposers.splice(0)) dispose();
	document.body.innerHTML = '';
	document.head.querySelectorAll('style').forEach((style) => style.remove());
	vi.restoreAllMocks();
});

describe('Batch 2 selectable lane', () => {
	it('keeps RadioGroup native element narrowing sound for registry consumers', () => {
		const source = readFileSync(path.resolve(import.meta.dirname, '../src/components/radio-group/radio-group.tsx'), 'utf8');
		expect(source).toContain('const element = input.element;');
		expect(source).toContain('if (element) setNativeChecked(element, input.value() === value());');
		expect(source).not.toMatch(/setNativeChecked\(input\.element,/);
	});

	it('Checkbox supports tri-state, initial-only defaults, controlled state, tuple cancellation, and disabled behavior', () => {
		let setDefault!: (value: boolean | 'indeterminate') => void;
		let setControlled!: (value: boolean | 'indeterminate' | undefined) => void;
		const changes: Array<boolean | 'indeterminate'> = [];
		const calls: string[] = [];
		const tuple = (label: string, event: MouseEvent) => {
			calls.push(label);
			event.preventDefault();
		};
		const container = mount(() => {
			const [defaultChecked, updateDefault] = createSignal<boolean | 'indeterminate'>('indeterminate');
			const [controlled, updateControlled] = createSignal<boolean | 'indeterminate'>();
			setDefault = updateDefault;
			setControlled = updateControlled;
			return (
				<>
					<Checkbox defaultChecked={defaultChecked()} checked={controlled()} onCheckedChange={(next) => changes.push(next)}>
						This label must not change the control size
					</Checkbox>
					<Checkbox data-cancel onClick={[tuple, 'user']} />
					<Checkbox data-disabled disabled onCheckedChange={() => calls.push('disabled')} />
				</>
			);
		});
		const buttons = container.querySelectorAll<HTMLButtonElement>('button[role="checkbox"]');
		expect(buttons[0].textContent).toBe('');
		expect(buttons[0].children).toHaveLength(1);
		expect(buttons[0].getAttribute('aria-checked')).toBe('mixed');
		setDefault(false);
		expect(buttons[0].getAttribute('aria-checked')).toBe('mixed');
		buttons[0].click();
		expect(buttons[0].getAttribute('aria-checked')).toBe('true');
		setControlled(false);
		expect(buttons[0].getAttribute('aria-checked')).toBe('false');
		buttons[0].click();
		expect(buttons[0].getAttribute('aria-checked')).toBe('false');
		expect(changes).toEqual([true, true]);
		buttons[1].click();
		expect(calls).toEqual(['user']);
		expect(buttons[1].getAttribute('aria-checked')).toBe('false');
		buttons[2].click();
		expect(calls).toEqual(['user']);
	});

	it('Checkbox and Switch serialize through one native control, reset to initial defaults, and do not duplicate native events', async () => {
		const checkboxChanges = vi.fn();
		const switchChanges = vi.fn();
		const container = mount(() => (
			<form id="settings">
				<Checkbox name="terms" value="accepted" defaultChecked required onCheckedChange={checkboxChanges} />
				<Switch name="alerts" value="enabled" defaultChecked form="settings" required onCheckedChange={switchChanges} />
			</form>
		));
		const form = container.querySelector('form') as HTMLFormElement;
		const buttons = container.querySelectorAll<HTMLButtonElement>('button');
		const controls = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
		const nativeEvents = vi.fn();
		controls.forEach((control) => {
			control.addEventListener('input', nativeEvents);
			control.addEventListener('change', nativeEvents);
		});
		expect(controls).toHaveLength(2);
		expect(new FormData(form).get('terms')).toBe('accepted');
		expect(new FormData(form).get('alerts')).toBe('enabled');
		expect(controls[0].required).toBe(true);
		expect(controls[1].form).toBe(form);
		expect(Array.from(controls, (control) => [control.tabIndex, control.getAttribute('aria-hidden'), control.style.pointerEvents])).toEqual([
			[-1, 'true', 'none'],
			[-1, 'true', 'none'],
		]);
		expect(Array.from(buttons, (button) => button.hasAttribute('aria-controls'))).toEqual([false, false]);

		buttons[0].click();
		buttons[1].click();
		expect(new FormData(form).has('terms')).toBe(false);
		expect(new FormData(form).has('alerts')).toBe(false);
		expect(checkboxChanges).toHaveBeenCalledOnce();
		expect(switchChanges).toHaveBeenCalledOnce();
		expect(nativeEvents).not.toHaveBeenCalled();

		form.reset();
		await Promise.resolve();
		expect(buttons[0].getAttribute('aria-checked')).toBe('true');
		expect(buttons[1].getAttribute('aria-checked')).toBe('true');
		expect(new FormData(form).get('terms')).toBe('accepted');
		expect(new FormData(form).get('alerts')).toBe('enabled');
	});

	it('Checkbox, Switch, and RadioGroup rebind reset behavior when their reactive form association changes', async () => {
		let setForm!: (form: string) => void;
		const container = mount(() => {
			const [form, updateForm] = createSignal('first-form');
			setForm = updateForm;
			return (
				<>
					<form id="first-form" />
					<form id="second-form" />
					<Checkbox name="check" defaultChecked form={form()} />
					<Switch name="switch" defaultChecked form={form()} />
					<RadioGroup name="radio" defaultValue="a" form={form()}>
						<RadioGroupItem value="a">A</RadioGroupItem>
						<RadioGroupItem value="b">B</RadioGroupItem>
					</RadioGroup>
				</>
			);
		});
		const forms = container.querySelectorAll<HTMLFormElement>('form');
		const buttons = container.querySelectorAll<HTMLButtonElement>('button');
		const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
		buttons[0].click();
		buttons[1].click();
		radios[1].click();
		expect([buttons[0].getAttribute('aria-checked'), buttons[1].getAttribute('aria-checked'), radios[1].checked]).toEqual(['false', 'false', true]);

		setForm('second-form');
		expect(Array.from(container.querySelectorAll<HTMLInputElement>('input'), (input) => input.form?.id)).toEqual(['second-form', 'second-form', 'second-form', 'second-form']);
		forms[0].reset();
		await Promise.resolve();
		expect([buttons[0].getAttribute('aria-checked'), buttons[1].getAttribute('aria-checked'), radios[1].checked]).toEqual(['false', 'false', true]);
		forms[1].reset();
		await Promise.resolve();
		expect([buttons[0].getAttribute('aria-checked'), buttons[1].getAttribute('aria-checked'), radios[0].checked]).toEqual(['true', 'true', true]);
	});

	it('resets explicitly associated controls through their owner document form', async () => {
		const frame = document.createElement('iframe');
		document.body.appendChild(frame);
		const frameDocument = frame.contentDocument!;
		frameDocument.body.innerHTML = '<form id="settings"></form><div id="host"></div>';
		const form = frameDocument.querySelector('form') as HTMLFormElement;
		const host = frameDocument.querySelector('#host') as HTMLDivElement;
		const dispose = render(
			() => (
				<>
					<Checkbox name="check" defaultChecked form="settings" />
					<Switch name="switch" defaultChecked form="settings" />
					<RadioGroup name="radio" defaultValue="a" form="settings">
						<RadioGroupItem value="a">A</RadioGroupItem>
						<RadioGroupItem value="b">B</RadioGroupItem>
					</RadioGroup>
				</>
			),
			host,
		);
		disposers.push(() => {
			dispose();
			frame.remove();
		});
		const buttons = host.querySelectorAll<HTMLButtonElement>('button');
		const controls = host.querySelectorAll<HTMLInputElement>('input');
		const radios = host.querySelectorAll<HTMLInputElement>('input[type="radio"]');
		expect(Array.from(controls, (control) => control.form)).toEqual([form, form, form, form]);

		buttons[0].click();
		buttons[1].click();
		radios[1].click();
		form.reset();
		await Promise.resolve();

		expect([buttons[0].getAttribute('aria-checked'), buttons[1].getAttribute('aria-checked'), radios[0].checked, radios[1].checked]).toEqual(['true', 'true', true, false]);
		expect(new FormData(form).getAll('radio')).toEqual(['a']);
	});

	it('Switch honors controlled state, initial-only defaults, tuple cancellation, and disabled semantics', () => {
		let setDefault!: (value: boolean) => void;
		let setChecked!: (value: boolean | undefined) => void;
		const changes: boolean[] = [];
		const tuple = (_label: string, event: MouseEvent) => event.preventDefault();
		const container = mount(() => {
			const [defaultChecked, updateDefault] = createSignal(true);
			const [checked, updateChecked] = createSignal<boolean>();
			setDefault = updateDefault;
			setChecked = updateChecked;
			return (
				<>
					<Switch defaultChecked={defaultChecked()} checked={checked()} onCheckedChange={(next) => changes.push(next)} />
					<Switch data-cancel onClick={[tuple, 'cancel']} />
					<Switch disabled />
				</>
			);
		});
		const buttons = container.querySelectorAll<HTMLButtonElement>('button[role="switch"]');
		setDefault(false);
		expect(buttons[0].getAttribute('aria-checked')).toBe('true');
		buttons[0].click();
		expect(buttons[0].getAttribute('aria-checked')).toBe('false');
		setChecked(true);
		buttons[0].click();
		expect(buttons[0].getAttribute('aria-checked')).toBe('true');
		expect(changes).toEqual([false, false]);
		buttons[1].click();
		expect(buttons[1].getAttribute('aria-checked')).toBe('false');
		expect(buttons[2].disabled).toBe(true);
	});

	it('ToggleGroup supports single and multiple values without form serialization', () => {
		const single: Array<string | string[]> = [];
		const multiple: Array<string | string[]> = [];
		const container = mount(() => (
			<form>
				<ToggleGroup defaultValue="left" onValueChange={(value) => single.push(value)}>
					<ToggleGroupItem value="left">Left</ToggleGroupItem>
					<ToggleGroupItem value="right">Right</ToggleGroupItem>
				</ToggleGroup>
				<ToggleGroup type="multiple" defaultValue={['bold']} onValueChange={(value) => multiple.push(value)}>
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
				</ToggleGroup>
			</form>
		));
		const buttons = container.querySelectorAll<HTMLButtonElement>('button');
		expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
		buttons[1].click();
		expect(single).toEqual(['right']);
		expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
		buttons[2].click();
		buttons[3].click();
		expect(multiple).toEqual([[], ['italic']]);
		expect(Array.from(new FormData(container.querySelector('form') as HTMLFormElement))).toEqual([]);
	});

	it('ToggleGroup uses context disabled filtering, user-first cancellation, and orientation-aware roving focus', () => {
		const changes = vi.fn();
		const tuple = (_label: string, event: KeyboardEvent | MouseEvent) => event.preventDefault();
		const container = mount(() => (
			<ToggleGroup orientation="horizontal" onValueChange={changes}>
				<ToggleGroupItem value="a">A</ToggleGroupItem>
				<ToggleGroupItem value="b" disabled>
					B
				</ToggleGroupItem>
				<ToggleGroupItem value="c">C</ToggleGroupItem>
				<ToggleGroupItem value="d" onClick={[tuple, 'click']} onKeyDown={[tuple, 'key']}>
					D
				</ToggleGroupItem>
			</ToggleGroup>
		));
		const buttons = container.querySelectorAll<HTMLButtonElement>('button');
		expect(Array.from(buttons, (button) => button.tabIndex)).toEqual([0, -1, -1, -1]);
		const group = container.querySelector('[role="group"]') as HTMLDivElement;
		expect(group.dataset.orientation).toBe('horizontal');
		expect(group.hasAttribute('aria-orientation')).toBe(false);
		buttons[0].focus();
		keydown(buttons[0], 'ArrowRight');
		expect(document.activeElement).toBe(buttons[2]);
		keydown(buttons[2], 'End');
		expect(document.activeElement).toBe(buttons[3]);
		buttons[3].click();
		expect(changes).not.toHaveBeenCalled();
		keydown(buttons[3], 'ArrowLeft');
		expect(document.activeElement).toBe(buttons[3]);
	});

	it('ToggleGroup promotes tab stops after reactive item/root disabling and supports vertical layout and keys', () => {
		let setFirstDisabled!: (disabled: boolean) => void;
		let setRootDisabled!: (disabled: boolean) => void;
		const container = mount(() => {
			const [firstDisabled, updateFirstDisabled] = createSignal(false);
			const [rootDisabled, updateRootDisabled] = createSignal(false);
			setFirstDisabled = updateFirstDisabled;
			setRootDisabled = updateRootDisabled;
			return (
				<ToggleGroup orientation="vertical" disabled={rootDisabled()} style={{ gap: '3px' }}>
					<ToggleGroupItem value="a" disabled={firstDisabled()}>
						A
					</ToggleGroupItem>
					<ToggleGroupItem value="b">B</ToggleGroupItem>
					<ToggleGroupItem value="c">C</ToggleGroupItem>
				</ToggleGroup>
			);
		});
		const group = container.querySelector('[role="group"]') as HTMLDivElement;
		const buttons = container.querySelectorAll<HTMLButtonElement>('button');
		const removeGeneratedCss = applyGeneratedToggleGroupCss(group, buttons[0]);
		disposers.push(removeGeneratedCss);
		expect(group.dataset.orientation).toBe('vertical');
		expect(group.style.flexDirection).toBe('');
		expect(group.style.gap).toBe('3px');
		expect(getComputedStyle(group).flexDirection).toBe('column');
		expect(getComputedStyle(group).alignItems).toBe('stretch');
		expect(['0', '0px']).toContain(getComputedStyle(buttons[0]).borderBottomLeftRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[0]).borderBottomRightRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[1]).borderTopLeftRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[1]).borderTopRightRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[1]).borderBottomLeftRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[1]).borderBottomRightRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[2]).borderTopLeftRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[2]).borderTopRightRadius);
		expect(Array.from(buttons, (button) => button.tabIndex)).toEqual([0, -1, -1]);
		setFirstDisabled(true);
		expect(Array.from(buttons, (button) => button.tabIndex)).toEqual([-1, 0, -1]);
		buttons[1].focus();
		keydown(buttons[1], 'ArrowDown');
		expect(document.activeElement).toBe(buttons[2]);
		keydown(buttons[2], 'ArrowUp');
		expect(document.activeElement).toBe(buttons[1]);
		setRootDisabled(true);
		expect(Array.from(buttons, (button) => [button.disabled, button.tabIndex])).toEqual([
			[true, -1],
			[true, -1],
			[true, -1],
		]);
		setRootDisabled(false);
		expect(Array.from(buttons, (button) => button.tabIndex)).toEqual([-1, 0, -1]);
	});

	it('ToggleGroup preserves horizontal adjacency and item variant/size styles', () => {
		const container = mount(() => (
			<ToggleGroup orientation="horizontal">
				<ToggleGroupItem value="a" variant="outline" size="sm">
					A
				</ToggleGroupItem>
				<ToggleGroupItem value="b" variant="outline" size="lg">
					B
				</ToggleGroupItem>
			</ToggleGroup>
		));
		const group = container.querySelector('[role="group"]') as HTMLDivElement;
		const buttons = container.querySelectorAll<HTMLButtonElement>('button');
		const removeGeneratedCss = applyGeneratedToggleGroupCss(group, buttons[0]);
		disposers.push(removeGeneratedCss);
		expect(getComputedStyle(group).flexDirection).not.toBe('column');
		expect(getComputedStyle(buttons[0]).borderRightWidth).not.toBe('0px');
		expect(['0', '0px']).toContain(getComputedStyle(buttons[0]).borderTopRightRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[0]).borderBottomRightRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[1]).borderTopLeftRadius);
		expect(['0', '0px']).toContain(getComputedStyle(buttons[1]).borderBottomLeftRadius);
		expect(['2rem', '32px']).toContain(getComputedStyle(buttons[0]).height);
		expect(['2.5rem', '40px']).toContain(getComputedStyle(buttons[1]).height);
		expect(buttons[0].className).toContain('variantOutline');
		expect(buttons[1].className).toContain('variantOutline');
	});

	it('RadioGroup uses native shared-name radios for required forms, reset, disabled filtering, and keyboard selection', async () => {
		const changes: string[] = [];
		const container = mount(() => (
			<form>
				<RadioGroup name="plan" defaultValue="free" required orientation="horizontal" onValueChange={(value) => changes.push(value)}>
					<RadioGroupItem value="free">Free</RadioGroupItem>
					<RadioGroupItem value="team" disabled>
						Team
					</RadioGroupItem>
					<RadioGroupItem value="pro">Pro</RadioGroupItem>
				</RadioGroup>
			</form>
		));
		const form = container.querySelector('form') as HTMLFormElement;
		const group = container.querySelector('[role="radiogroup"]') as HTMLDivElement;
		const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
		expect(group.getAttribute('aria-orientation')).toBe('horizontal');
		expect(Array.from(radios, (radio) => radio.name)).toEqual(['plan', 'plan', 'plan']);
		expect(Array.from(radios, (radio) => radio.required)).toEqual([true, true, true]);
		expect(new FormData(form).get('plan')).toBe('free');
		expect(Array.from(radios, (radio) => radio.tabIndex)).toEqual([0, -1, -1]);

		radios[0].focus();
		keydown(radios[0], 'ArrowRight');
		expect(document.activeElement).toBe(radios[2]);
		expect(radios[2].checked).toBe(true);
		expect(changes).toEqual(['pro']);
		expect(new FormData(form).get('plan')).toBe('pro');

		form.reset();
		await Promise.resolve();
		expect(radios[0].checked).toBe(true);
		expect(radios[2].checked).toBe(false);
		expect(new FormData(form).get('plan')).toBe('free');
	});

	it('RadioGroup keeps unnamed native mutual exclusion without becoming successful form data', () => {
		const container = mount(() => (
			<form>
				<RadioGroup defaultValue="a">
					<RadioGroupItem value="a">A</RadioGroupItem>
					<RadioGroupItem value="b">B</RadioGroupItem>
				</RadioGroup>
			</form>
		));
		const form = container.querySelector('form') as HTMLFormElement;
		const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
		expect(radios[0].name).toBeTruthy();
		expect(radios[1].name).toBe(radios[0].name);
		expect(radios[0].form).toBeNull();
		radios[1].click();
		expect([radios[0].checked, radios[1].checked]).toEqual([false, true]);
		expect(Array.from(new FormData(form))).toEqual([]);
	});

	it('RadioGroup promotes the enabled tab stop after reactive item/root disabled changes', () => {
		let setFirstDisabled!: (disabled: boolean) => void;
		let setRootDisabled!: (disabled: boolean) => void;
		const container = mount(() => {
			const [firstDisabled, updateFirstDisabled] = createSignal(false);
			const [rootDisabled, updateRootDisabled] = createSignal(false);
			setFirstDisabled = updateFirstDisabled;
			setRootDisabled = updateRootDisabled;
			return (
				<RadioGroup defaultValue="a" disabled={rootDisabled()}>
					<RadioGroupItem value="a" disabled={firstDisabled()}>
						A
					</RadioGroupItem>
					<RadioGroupItem value="b">B</RadioGroupItem>
				</RadioGroup>
			);
		});
		const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
		expect(Array.from(radios, (radio) => radio.tabIndex)).toEqual([0, -1]);
		setFirstDisabled(true);
		expect(Array.from(radios, (radio) => radio.tabIndex)).toEqual([-1, 0]);
		setRootDisabled(true);
		expect(Array.from(radios, (radio) => [radio.disabled, radio.tabIndex])).toEqual([
			[true, -1],
			[true, -1],
		]);
		setRootDisabled(false);
		expect(Array.from(radios, (radio) => radio.tabIndex)).toEqual([-1, 0]);
	});

	it('RadioGroup synchronously restores controlled DOM/FormData and preserves cancellable user-first handlers', async () => {
		let setValue!: (value: string | undefined) => void;
		const changes: string[] = [];
		const tuple = (_label: string, event: MouseEvent) => event.preventDefault();
		const container = mount(() => {
			const [value, updateValue] = createSignal<string | undefined>('a');
			setValue = updateValue;
			return (
				<form>
					<RadioGroup name="choice" value={value()} defaultValue="a" onValueChange={(next) => changes.push(next)}>
						<RadioGroupItem value="a">A</RadioGroupItem>
						<RadioGroupItem value="b" onClick={[tuple, 'cancel']}>
							B
						</RadioGroupItem>
						<RadioGroupItem value="c">C</RadioGroupItem>
					</RadioGroup>
				</form>
			);
		});
		const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');
		const form = container.querySelector('form') as HTMLFormElement;
		expect(radios[0].checked).toBe(true);
		radios[1].click();
		await new Promise((resolve) => setTimeout(resolve));
		expect(radios[0].checked).toBe(true);
		expect(changes).toEqual([]);
		radios[2].click();
		expect(changes).toEqual(['c']);
		expect(radios[0].checked).toBe(true);
		expect(new FormData(form).get('choice')).toBe('a');
		setValue('c');
		expect(radios[2].checked).toBe(true);
		expect(new FormData(form).get('choice')).toBe('c');
	});

	it('renders and hydrates selectable components with stable SSR-safe IDs and native form state', async () => {
		const outputRoot = await mkdtemp(path.join(tmpdir(), 'tile-solid-selectable-'));
		const stylesRoot = path.resolve(import.meta.dirname, '../../styles/scss');
		try {
			execFileSync(
				process.execPath,
				[
					'--input-type=module',
					'-e',
					String.raw`
						import path from 'node:path';
						import { build } from 'vite';
						import solid from 'vite-plugin-solid';
						const [outputRoot, stylesRoot] = process.argv.slice(1);
						const css = { preprocessorOptions: { scss: { loadPaths: [stylesRoot] } } };
						await build({ plugins: [solid({ ssr: true })], logLevel: 'silent', css, ssr: { noExternal: true, resolve: { conditions: ['node'] } }, build: { ssr: 'test/fixtures/selectable-server.tsx', outDir: path.join(outputRoot, 'server'), rollupOptions: { output: { entryFileNames: 'fixture.mjs' } } } });
						await build({ plugins: [solid({ solid: { hydratable: true } })], logLevel: 'silent', css, resolve: { conditions: ['browser'] }, build: { outDir: path.join(outputRoot, 'client'), lib: { entry: 'test/fixtures/selectable-client.tsx', formats: ['es'], fileName: () => 'fixture.mjs' }, rollupOptions: { output: { inlineDynamicImports: true } } } });
					`,
					outputRoot,
					stylesRoot,
				],
				{ cwd: process.cwd(), stdio: 'inherit' },
			);
			const serverCode = await readFile(path.join(outputRoot, 'server/fixture.mjs'), 'utf8');
			const server = await import(`data:text/javascript;base64,${btoa(serverCode)}`);
			const first = server.renderSelectableFixture() as { html: string; hydrationScript: string; renderId: string };
			const second = server.renderSelectableFixture() as { html: string; hydrationScript: string; renderId: string };
			expect(first.html).toBe(second.html);
			expect(first.html).toContain('tile-solid-checkbox-');
			expect(first.html).toContain('tile-solid-switch-');
			expect(first.html).toContain('tile-solid-radio-');
			const serverContainer = document.createElement('div');
			serverContainer.innerHTML = first.html;
			expect(Array.from(serverContainer.querySelectorAll<HTMLButtonElement>('[data-id="toggle-selected"] button'), (button) => button.tabIndex)).toEqual([-1, 0, -1]);
			expect(Array.from(serverContainer.querySelectorAll<HTMLButtonElement>('[data-id="toggle-fallback"] button'), (button) => button.tabIndex)).toEqual([-1, 0, -1]);
			expect(Array.from(serverContainer.querySelectorAll<HTMLInputElement>('[data-id="radio-selected"] input'), (input) => input.tabIndex)).toEqual([-1, 0, -1]);
			expect(Array.from(serverContainer.querySelectorAll<HTMLInputElement>('[data-id="radio-fallback"] input'), (input) => input.tabIndex)).toEqual([-1, 0, -1]);

			const scriptContainer = document.createElement('div');
			scriptContainer.innerHTML = first.hydrationScript;
			new Function(scriptContainer.textContent ?? '')();
			document.body.innerHTML = `<div id="selectable-app">${first.html}</div>`;
			const container = document.querySelector('#selectable-app') as HTMLElement;
			const clientCode = await readFile(path.join(outputRoot, 'client/fixture.mjs'), 'utf8');
			const client = await import(`data:text/javascript;base64,${btoa(`const _$HY = globalThis._$HY;\n${clientCode}`)}`);
			disposers.push(client.hydrateSelectableFixture(container, first.renderId));
			(window as typeof window & { _$HY: { fe(): void } })._$HY.fe();
			await Promise.resolve();
			expect(Array.from(container.querySelectorAll<HTMLButtonElement>('[data-id="toggle-selected"] button'), (button) => button.tabIndex)).toEqual([-1, 0, -1]);
			expect(Array.from(container.querySelectorAll<HTMLButtonElement>('[data-id="toggle-fallback"] button'), (button) => button.tabIndex)).toEqual([-1, 0, -1]);
			expect(Array.from(container.querySelectorAll<HTMLInputElement>('[data-id="radio-selected"] input'), (input) => input.tabIndex)).toEqual([-1, 0, -1]);
			expect(Array.from(container.querySelectorAll<HTMLInputElement>('[data-id="radio-fallback"] input'), (input) => input.tabIndex)).toEqual([-1, 0, -1]);
			(container.querySelector('[data-id="toggle-control"]') as HTMLButtonElement).click();
			(container.querySelector('[data-id="radio-control"]') as HTMLButtonElement).click();
			expect(Array.from(container.querySelectorAll<HTMLButtonElement>('[data-id="toggle-selected"] button'), (button) => button.tabIndex)).toEqual([-1, -1, 0]);
			expect(Array.from(container.querySelectorAll<HTMLInputElement>('[data-id="radio-selected"] input'), (input) => input.tabIndex)).toEqual([-1, -1, 0]);
			expect(Array.from(new FormData(container.querySelector('form') as HTMLFormElement))).toEqual([
				['check', 'yes'],
				['switch', 'yes'],
				['radio', 'three'],
			]);
			delete (globalThis as typeof globalThis & { _$HY?: unknown })._$HY;
		} finally {
			await rm(outputRoot, { recursive: true, force: true });
		}
	});
});
