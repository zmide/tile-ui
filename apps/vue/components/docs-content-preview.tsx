import { defineComponent } from 'vue';

export const VueDocContentPreview = defineComponent({
	name: 'VueDocContentPreview',
	props: {
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
			default: '',
		},
	},
	setup(props, { slots }) {
		return () => (
			<div class="component-preview">
				<div class="component-preview__meta">
					<p class="component-preview__eyebrow">Preview</p>
					<h3>{props.title}</h3>
					{props.description ? <p>{props.description}</p> : null}
				</div>
				<div class="component-preview__surface">{slots.default?.()}</div>
			</div>
		);
	},
});
