import { defineComponent, PropType } from 'vue';

export const VueDocsBreadcrumb = defineComponent({
	name: 'VueDocsBreadcrumb',
	props: {
		items: {
			type: Array as PropType<Array<{ label: string; href?: string }>>,
			required: true,
		},
	},
	setup(props) {
		return () => (
			<nav class="docs-breadcrumb" aria-label="Breadcrumb">
				{props.items.map((item, index) => (
					<span key={`${item.label}-${index}`} class="docs-breadcrumb__item">
						{item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
						{index < props.items.length - 1 ? <span class="docs-breadcrumb__separator">/</span> : null}
					</span>
				))}
			</nav>
		);
	},
});
