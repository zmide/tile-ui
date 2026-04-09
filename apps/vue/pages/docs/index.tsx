import { defineComponent } from 'vue';
import { VueDocsBreadcrumb } from '../../components/docs-breadcrumb';
import { VueDocsSidebar } from '../../components/docs-sidebar';
import { loadDocsPayload, type DocPayload } from '../../lib/docs';

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
				<div class="docs-page">
					<div class="docs-page__content">
						<div class="docs-page__header">
							<VueDocsBreadcrumb items={[{ label: 'Docs' }]} />
							<p class="docs-page__section-label">overview</p>
							<h1>{doc.title}</h1>
							{doc.description ? <p class="docs-page__description">{doc.description}</p> : null}
						</div>
						<div class="docs-page__body prose-page" innerHTML={doc.html} />
						<div class="docs-page__footer">
							{neighbours.previous ? (
								<a href={neighbours.previous.url} class="card-link">
									<span class="eyebrow">Previous</span>
									<strong>{neighbours.previous.title}</strong>
								</a>
							) : (
								<div />
							)}
							{neighbours.next ? (
								<a href={neighbours.next.url} class="card-link">
									<span class="eyebrow">Next</span>
									<strong>{neighbours.next.title}</strong>
								</a>
							) : (
								<div />
							)}
						</div>
					</div>
					<aside class="docs-page__toc">
						{doc.toc.length ? (
							<div class="docs-toc">
								<p class="docs-toc__title">On This Page</p>
								{doc.toc.map((item) => (
									<a key={item.url} href={item.url} class="docs-toc__link" data-depth={item.depth}>
										{item.title}
									</a>
								))}
							</div>
						) : null}
					</aside>
				</div>
			</div>
		);
	},
});
