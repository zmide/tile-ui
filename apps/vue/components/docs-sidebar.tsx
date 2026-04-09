import { defineComponent, PropType } from 'vue';

type PageTreeNode = {
	type: string;
	name: string;
	url?: string;
	children?: PageTreeNode[];
};

function buildGroups(nodes: PageTreeNode[]) {
	return nodes
		.map((node) => {
			const pages = (node.children ?? [])
				.filter((child) => child.url)
				.map((child) => ({
					name: child.name,
					url: child.url as string,
				}));

			if (node.url) {
				pages.unshift({ name: node.name, url: node.url });
			}

			return {
				name: node.name,
				pages,
			};
		})
		.filter((group) => group.pages.length > 0);
}

export const VueDocsSidebar = defineComponent({
	name: 'VueDocsSidebar',
	props: {
		tree: {
			type: Object as PropType<PageTreeNode>,
			required: true,
		},
		pathname: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () => {
			const groups = buildGroups(props.tree.children ?? []);

			return (
				<aside class="docs-sidebar">
					<div class="docs-sidebar__inner">
						<div class="docs-sidebar__group docs-sidebar__group--intro">
							<p class="docs-sidebar__label">Overview</p>
							<nav class="docs-sidebar__nav">
								<a href="/docs" class="docs-sidebar__link" data-active={props.pathname === '/docs'}>
									Introduction
								</a>
							</nav>
						</div>
						{groups.map((group) => (
							<div key={group.name} class="docs-sidebar__group">
								<p class="docs-sidebar__label">{group.name}</p>
								<nav class="docs-sidebar__nav">
									{group.pages.map((page) => (
										<a key={page.url} href={page.url} class="docs-sidebar__link" data-active={props.pathname === page.url}>
											{page.name}
										</a>
									))}
								</nav>
							</div>
						))}
					</div>
				</aside>
			);
		};
	},
});
