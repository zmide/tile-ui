import { defineComponent, computed, h, onMounted, ref, useId, type PropType } from 'vue';
import { getInputIds, getInputAriaProps } from '@tile-ui/core';
import type { InputBaseProps } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/input.module.scss';

export const Input = defineComponent({
	name: 'Input',
	inheritAttrs: false,
	props: {
		label: String,
		error: String,
		helperText: String,
		controlSize: String as PropType<InputBaseProps['controlSize']>,
		required: { type: Boolean, default: false },
		id: String,
		type: { type: String, default: 'text' },
		placeholder: String,
		modelValue: String,
		defaultValue: String,
		readOnly: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
	},
	emits: ['update:modelValue'],
	setup(props, { emit, attrs }) {
		const fallbackId = useId();
		const inputId = computed(() => props.id || fallbackId);
		const ids = computed(() => getInputIds(inputId.value));
		const ariaProps = computed(() => getInputAriaProps(ids.value, props.error, props.helperText));
		const inputEl = ref<HTMLInputElement | null>(null);

		onMounted(() => {
			if (!inputEl.value) return;
			if (props.modelValue === undefined && props.defaultValue !== undefined) {
				inputEl.value.value = props.defaultValue;
			}
		});

		function onInput(event: Event) {
			emit('update:modelValue', (event.target as HTMLInputElement).value);
		}

		return () => {
			const children: any[] = [];

			if (props.label) {
				children.push(
					h(
						'label',
						{
							for: inputId.value,
							class: [styles.label, props.required ? styles.required : ''],
						},
						props.label,
					),
				);
			}

			children.push(
				h('input', {
					...attrs,
					ref: inputEl,
					id: inputId.value,
					type: props.type,
					class: [styles.input, props.error ? styles.error : '', attrs.class],
					'data-control-size': props.controlSize,
					value: props.modelValue,
					placeholder: props.placeholder,
					readonly: props.readOnly,
					disabled: props.disabled,
					required: props.required,
					'aria-invalid': ariaProps.value['aria-invalid'],
					'aria-describedby': ariaProps.value['aria-describedby'],
					onInput: [attrs.onInput, onInput].filter(Boolean),
				}),
			);

			if (props.error) {
				children.push(h('span', { id: ids.value.error, class: styles.errorText }, props.error));
			} else if (props.helperText) {
				children.push(h('span', { id: ids.value.helper, class: styles.helperText }, props.helperText));
			}

			return h('div', { class: styles.inputWrapper }, children);
		};
	},
});

export default Input;
