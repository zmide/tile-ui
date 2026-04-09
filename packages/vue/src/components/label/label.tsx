import { defineComponent, computed, h } from 'vue';
import { getLabelClassKeys } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/label.module.scss';

export const TLabel = defineComponent({
	name: 'TLabel',
	props: {
		required: { type: Boolean, default: false },
		htmlFor: String,
	},
	setup(props, { slots }) {
		const classKeys = computed(() => getLabelClassKeys(props.required));
		const classes = computed(() => [styles[classKeys.value.base], classKeys.value.required ? styles[classKeys.value.required] : '']);

		return () => h('label', { class: classes.value, for: props.htmlFor }, slots.default?.());
	},
});

export default TLabel;
