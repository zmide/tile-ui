import { Show, createUniqueId, splitProps, type JSX } from 'solid-js';
import { getInputIds, getInputAriaProps } from '@tile-ui/core';
import type { InputBaseProps } from '@tile-ui/core';
import { invokeEventHandler } from '../../utils/events';
import styles from '@tile-ui/styles/scss/components/input.module.scss';

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
	/** 非受控初始值；Solid JSX 未声明原生 defaultValue 属性 */
	defaultValue?: string;
	/** 值变化回调；受控状态由原生 value 属性决定 */
	onChangeValue?: (value: string) => void;
}

/**
 * SolidJS Input：复用 core 的 ID/ARIA 推导，遵循原生 value/defaultValue 契约。
 */
export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, [
		'label',
		'error',
		'helperText',
		'controlSize',
		'required',
		'id',
		'type',
		'placeholder',
		'value',
		'defaultValue',
		'readOnly',
		'disabled',
		'onChangeValue',
		'onInput',
		'class',
	]);

	const fallbackId = `tile-solid-input-${createUniqueId()}`;
	const inputId = () => local.id ?? fallbackId;
	const ids = () => getInputIds(inputId());
	const aria = () => getInputAriaProps(ids(), local.error, local.helperText);
	const initialDefaultValue = local.defaultValue;
	const valueProps =
		local.value === undefined
			? { 'attr:value': initialDefaultValue }
			: {
					get value() {
						return local.value;
					},
				};

	return (
		<div class={styles.inputWrapper}>
			<Show when={local.label}>
				<label for={inputId()} class={`${styles.label} ${local.required ? styles.required : ''}`}>
					{local.label}
				</label>
			</Show>
			<input
				{...rest}
				{...valueProps}
				id={inputId()}
				type={local.type ?? 'text'}
				data-control-size={local.controlSize}
				class={`${styles.input} ${local.error ? styles.error : ''} ${local.class ?? ''}`}
				placeholder={local.placeholder}
				readonly={local.readOnly}
				disabled={local.disabled}
				required={local.required}
				aria-invalid={aria()['aria-invalid']}
				aria-describedby={aria()['aria-describedby']}
				onInput={(event) => {
					const next = event.currentTarget.value;
					invokeEventHandler(local.onInput as Parameters<typeof invokeEventHandler<InputEvent>>[0], event);
					if (local.value !== undefined) event.currentTarget.value = String(local.value);
					if (!event.defaultPrevented) {
						local.onChangeValue?.(next);
					}
				}}
			/>
			<Show when={local.error}>
				<span id={ids().error} class={styles.errorText}>
					{local.error}
				</span>
			</Show>
			<Show when={!local.error && local.helperText}>
				<span id={ids().helper} class={styles.helperText}>
					{local.helperText}
				</span>
			</Show>
		</div>
	);
}

export default Input;
