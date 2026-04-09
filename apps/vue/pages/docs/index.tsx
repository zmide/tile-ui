import { defineComponent } from 'vue';

import { VueDocsBreadcrumb } from '../../components/docs-breadcrumb';
import { VueDocsSidebar } from '../../components/docs-sidebar';
import { VueDocsToc } from '../../components/docs-toc';
import { loadDocsPayload, type DocPayload } from '../../lib/docs';

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
	name: 'VueDocsIndexPage',
	async setup() {
		const { data, error } = await useAsyncData<DocPayload>('docs:index', () => loadDocsPayload([]));

		if (error.value || !data.value) {
			throw createError({ statusCode: 404, statusMessage: 'Doc not found' });
		}

		const { doc, neighbours, tree } = data.value;

		return () => (
			<div class="docs-layout">
				<VueDocsSidebar tree={tree} pathname={doc.url} />
				<div class="docs-layout__content">
					<div class="docs-page">
						<div class="docs-page__main">
							<div class="docs-page__content">
								<div class="docs-page__header">
									<VueDocsBreadcrumb items={[{ label: 'Docs' }]} />
									<p class="docs-page__section-label">Overview</p>
									<h1>{doc.title}</h1>
									{doc.description ? <p class="docs-page__description">{doc.description}</p> : null}
								</div>
								<div class="docs-page__toc-mobile">{doc.toc.length ? <VueDocsToc toc={doc.toc} variant="dropdown" /> : null}</div>
								<div class="docs-page__body prose-page" innerHTML={doc.html} />
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
