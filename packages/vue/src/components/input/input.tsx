import { defineComponent, computed, h } from 'vue';
import { getInputIds, getInputAriaProps } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/input.module.scss';

let inputCounter = 0;

export const TInput = defineComponent({
	name: 'TInput',
	props: {
		label: String,
		error: String,
		helperText: String,
		required: { type: Boolean, default: false },
		id: String,
		type: { type: String, default: 'text' },
		placeholder: String,
		modelValue: String,
		disabled: { type: Boolean, default: false },
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const inputId = computed(() => props.id || `tile-input-${++inputCounter}`);
		const ids = computed(() => getInputIds(inputId.value));
		const ariaProps = computed(() => getInputAriaProps(ids.value, props.error, props.helperText));

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
					id: inputId.value,
					type: props.type,
					class: [styles.input, props.error ? styles.error : ''],
					value: props.modelValue,
					placeholder: props.placeholder,
					disabled: props.disabled,
					'aria-invalid': ariaProps.value['aria-invalid'],
					'aria-describedby': ariaProps.value['aria-describedby'],
					onInput,
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

export default TInput;
