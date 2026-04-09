import { notFound } from 'next/navigation';

import { DocsPageShell } from '@/components/docs-page-shell';
import { DocsTableOfContents } from '@/components/docs-toc';
import { mdxComponents } from '@/mdx-components';
import { getNeighbours } from '../../../lib/docs-neighbours';
import { source } from '../../../lib/source';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

type Breadcrumb = { label: string; href?: string };

type TocItem = {
	title?: string;
	url: string;
	depth: number;
};

function buildBreadcrumbs(slug?: string[]) {
	const parts = slug ?? [];
	const breadcrumbs: Breadcrumb[] = [{ label: 'Docs', href: '/docs' }];

	parts.forEach((part, index) => {
		const href = `/docs/${parts.slice(0, index + 1).join('/')}`;
		breadcrumbs.push({
			label: part.replace(/-/g, ' '),
			href: index === parts.length - 1 ? undefined : href,
		});
	});

	return breadcrumbs;
}

function normalizeToc(toc: Array<{ title?: unknown; url: string; depth: number }> = []): TocItem[] {
	return toc.map((item) => ({
		title: typeof item.title === 'string' ? item.title : undefined,
		url: item.url,
		depth: item.depth,
	}));
}

export function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
	const params = await props.params;
	const page = source.getPage(params.slug);

	if (!page) {
		notFound();
	}

	return {
		title: page.data.title,
		description: page.data.description,
	};
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
	const params = await props.params;
	const page = source.getPage(params.slug);

	if (!page) {
		notFound();
	}

	const neighbours = getNeighbours(source.pageTree, page.url);
	const MDX = page.data.body;

	return (
		<DocsPageShell
			title={page.data.title}
			description={page.data.description}
			toc={normalizeToc(page.data.toc ?? [])}
			previous={neighbours.previous}
			next={neighbours.next}
			Toc={DocsTableOfContents}
			breadcrumbs={buildBreadcrumbs(params.slug)}
			sectionLabel={params.slug?.[0] ? params.slug[0].replace(/-/g, ' ') : 'overview'}>
			<MDX components={mdxComponents} />
		</DocsPageShell>
	);
}
