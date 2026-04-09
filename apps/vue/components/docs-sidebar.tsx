import { defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue';

type PageTreeNode = {
	type: string;
	name: string;
	url?: string;
	children?: PageTreeNode[];
};

const SIDEBAR_SCROLL_KEY = 'tile-ui:vue-docs-sidebar-scroll';

function formatLabel(value: string) {
	return value
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function buildGroups(nodes: PageTreeNode[]) {
	return nodes
		.filter((node) => node.url !== '/docs')
		.map((node) => {
			const pages = (node.children ?? [])
				.filter((child) => child.url)
				.map((child) => ({
					name: child.name,
					url: child.url as string,
				}));

			if (node.url && pages.length === 0) {
				pages.unshift({ name: formatLabel(node.name), url: node.url });
			}

			return {
				name: formatLabel(node.name),
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
		const containerRef = ref<HTMLElement | null>(null);
		const isClient = typeof window !== 'undefined';

		function persistScroll() {
			if (!isClient || !containerRef.value) return;
			sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(containerRef.value.scrollTop));
		}

		async function restoreScroll() {
			if (!isClient || !containerRef.value) return;
			await nextTick();
			const saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
			if (!saved) return;
			containerRef.value.scrollTop = Number(saved) || 0;
		}

		onMounted(() => {
			restoreScroll();
		});

		watch(
			() => props.pathname,
			() => {
				restoreScroll();
			},
		);

		return () => {
			const groups = buildGroups(props.tree.children ?? []);

			return (
				<aside class="docs-sidebar">
					<div ref={containerRef} class="docs-sidebar__inner" onScroll={persistScroll}>
						<div class="docs-sidebar__group docs-sidebar__group--intro">
							<p class="docs-sidebar__label">Sections</p>
							<nav class="docs-sidebar__nav">
								<NuxtLink href="/docs" class="docs-sidebar__link" data-active={props.pathname === '/docs'} onClick={persistScroll}>
									Overview
								</NuxtLink>
							</nav>
						</div>
						{groups.map((group) => (
							<div key={group.name} class="docs-sidebar__group">
								<p class="docs-sidebar__label">{group.name}</p>
								<nav class="docs-sidebar__nav">
									{group.pages.map((page) => (
										<NuxtLink key={page.url} href={page.url} class="docs-sidebar__link" data-active={props.pathname === page.url} onClick={persistScroll}>
											{page.name}
										</NuxtLink>
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
