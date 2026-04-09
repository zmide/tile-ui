import { defineComponent } from 'vue';

import { VueDocsBreadcrumb } from '../../components/docs-breadcrumb';
import {
	VueButtonPreview,
	VueCardPreview,
	VueContactFormPreview,
	VueCopyToClipboardPreview,
	VueInputPreview,
	VueLabelPreview,
	VueLocalStoragePreview,
	VueMediaQueryPreview,
	VueNewsletterCardPreview,
	VueProfileSettingsPreview,
	VueTextareaPreview,
} from '../../components/docs-previews';
import { VueDocsSidebar } from '../../components/docs-sidebar';
import { VueDocsToc } from '../../components/docs-toc';
import { loadDocsPayload, type DocPayload, type DocsTreeNode } from '../../lib/docs';

function formatLabel(value: string) {
	return value
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function getPreviewForSlug(slug: string[]) {
	const key = slug.join('/');

	switch (key) {
		case 'components/button':
			return VueButtonPreview;
		case 'components/input':
			return VueInputPreview;
		case 'components/textarea':
			return VueTextareaPreview;
		case 'components/label':
			return VueLabelPreview;
		case 'components/card':
			return VueCardPreview;
		case 'composables/use-copy-to-clipboard':
			return VueCopyToClipboardPreview;
		case 'composables/use-media-query':
			return VueMediaQueryPreview;
		case 'composables/use-local-storage':
			return VueLocalStoragePreview;
		case 'examples/contact-form':
			return VueContactFormPreview;
		case 'examples/newsletter-card':
			return VueNewsletterCardPreview;
		case 'examples/profile-settings':
			return VueProfileSettingsPreview;
		default:
			return null;
	}
}

function findTreePath(nodes: DocsTreeNode[], targetUrl: string, trail: Array<{ name: string; url?: string }> = []): Array<{ name: string; url?: string }> | null {
	for (const node of nodes) {
		const nextTrail = node.name ? [...trail, { name: node.name, url: node.url }] : trail;

		if (node.url === targetUrl) {
			return nextTrail;
		}

		if (node.children?.length) {
			const match = findTreePath(node.children, targetUrl, nextTrail);
			if (match) return match;
		}
	}

	return null;
}

function buildPageContext(tree: DocsTreeNode, currentUrl: string) {
	const rawPath = findTreePath(tree.children ?? [], currentUrl) ?? [];
	const path = rawPath.filter((item: { name: string; url?: string }, index: number) => item.name !== rawPath[index - 1]?.name);
	const breadcrumbs = [{ label: 'Docs', href: currentUrl === '/docs' ? undefined : '/docs' }];

	for (const [index, item] of path.entries()) {
		const isLast = index === path.length - 1;
		breadcrumbs.push({ label: item.name, href: !isLast ? item.url : undefined });
	}

	return {
		breadcrumbs,
		sectionLabel: path.length > 1 ? formatLabel(path[path.length - 2]?.name ?? '') : 'Overview',
	};
}

function PagerIcon({ direction }: { direction: 'previous' | 'next' }) {
	return direction === 'previous' ? (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="docs-page__pager-icon">
			<path d="M9.5 3.5L5 8l4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	) : (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="docs-page__pager-icon">
			<path d="M6.5 3.5L11 8l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	);
}

export default defineComponent({
	name: 'VueDocsCatchAllPage',
	async setup() {
		const route = useRoute();
		const slugParam = route.params.slug;
		const slug = Array.isArray(slugParam) ? slugParam : slugParam ? [String(slugParam)] : [];

		const { data, error } = await useAsyncData<DocPayload | null>(`docs:${slug.join('/') || 'index'}`, () => loadDocsPayload(slug).catch(() => null), {
			watch: [() => route.fullPath],
		});

		if (error.value || !data.value) {
			throw createError({ statusCode: 404, statusMessage: 'Doc not found' });
		}

		const { doc, neighbours, tree } = data.value;
		const Preview = getPreviewForSlug(slug);
		const pageContext = buildPageContext(tree, doc.url);

		return () => (
			<div class="docs-layout">
				<VueDocsSidebar tree={tree} pathname={doc.url} />
				<div class="docs-layout__content">
					<div class="docs-page">
						<div class="docs-page__main">
							<div class="docs-page__content">
								<div class="docs-page__header">
									<VueDocsBreadcrumb items={pageContext.breadcrumbs} />
									<p class="docs-page__section-label">{pageContext.sectionLabel}</p>
									<h1>{doc.title}</h1>
									{doc.description ? <p class="docs-page__description">{doc.description}</p> : null}
								</div>
								<div class="docs-page__toc-mobile">{doc.toc.length ? <VueDocsToc toc={doc.toc} variant="dropdown" /> : null}</div>
								<div class="docs-page__body prose-page">
									{Preview ? <Preview /> : null}
									<div innerHTML={doc.html} />
								</div>
								<div class="docs-page__footer">
									{neighbours.previous ? (
										<a href={neighbours.previous.url} class="docs-page__pager-link" data-direction="previous">
											<PagerIcon direction="previous" />
											<span class="docs-page__pager-label">Previous</span>
											<strong>{neighbours.previous.title}</strong>
										</a>
									) : (
										<div class="docs-page__pager-spacer" />
									)}
									{neighbours.next ? (
										<a href={neighbours.next.url} class="docs-page__pager-link" data-direction="next">
											<span class="docs-page__pager-label">Next</span>
											<strong>{neighbours.next.title}</strong>
											<PagerIcon direction="next" />
										</a>
									) : (
										<div class="docs-page__pager-spacer" />
									)}
								</div>
							</div>
						</div>
						<aside class="docs-page__toc">{doc.toc.length ? <VueDocsToc toc={doc.toc} variant="list" /> : null}</aside>
					</div>
				</div>
			</div>
		);
	},
});
