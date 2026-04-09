import { defineComponent } from 'vue';
import { VueDocsBreadcrumb } from '../../components/docs-breadcrumb';
import { VueDocsSidebar } from '../../components/docs-sidebar';
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

export default defineComponent({
  name: 'VueDocsCatchAllPage',
  async setup() {
    const route = useRoute();
    const slugParam = route.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam : slugParam ? [String(slugParam)] : [];
    const path = slug.join('/');

    const { data, error } = await useAsyncData(
      `docs:${path || 'index'}`,
      () => fetch(`/api/docs/${path}`).then((response) => response.json()),
      {
        watch: [() => route.fullPath],
      }
    );

    if (error.value || !data.value) {
      throw createError({ statusCode: 404, statusMessage: 'Doc not found' });
    }

    const { doc, neighbours, tree } = data.value;
    const Preview = getPreviewForSlug(slug);
    const breadcrumbs = [{ label: 'Docs', href: '/docs' }, ...slug.map((part, index) => ({
      label: part.replace(/-/g, ' '),
      href: index === slug.length - 1 ? undefined : `/docs/${slug.slice(0, index + 1).join('/')}`,
    }))];

    return () => (
      <div class="docs-layout">
        <VueDocsSidebar tree={tree} pathname={doc.url} />
        <div class="docs-page">
          <div class="docs-page__content">
            <div class="docs-page__header">
              <VueDocsBreadcrumb items={breadcrumbs} />
              <p class="docs-page__section-label">{slug[0] ? slug[0].replace(/-/g, ' ') : 'overview'}</p>
              <h1>{doc.title}</h1>
              {doc.description ? <p class="docs-page__description">{doc.description}</p> : null}
            </div>
            <div class="docs-page__body prose-page">
              {Preview ? <Preview /> : null}
              <div innerHTML={doc.html} />
            </div>
            <div class="docs-page__footer">
              {neighbours.previous ? (
                <a href={neighbours.previous.url} class="card-link">
                  <span class="eyebrow">Previous</span>
                  <strong>{neighbours.previous.title}</strong>
                </a>
              ) : <div />}
              {neighbours.next ? (
                <a href={neighbours.next.url} class="card-link">
                  <span class="eyebrow">Next</span>
                  <strong>{neighbours.next.title}</strong>
                </a>
              ) : <div />}
            </div>
          </div>
          <aside class="docs-page__toc">
            {doc.toc.length ? (
              <div class="docs-toc">
                <p class="docs-toc__title">On This Page</p>
                {doc.toc.map((item: { title: string; url: string; depth: number }) => (
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
