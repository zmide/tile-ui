import type { ComponentType, ReactNode } from 'react';

import { DocsBreadcrumb } from './docs-breadcrumb';

type TocItem = {
	title?: string;
	url: string;
	depth: number;
};

type Neighbour = {
	name: string;
	url: string;
} | null;

type TocComponentProps = {
	toc: TocItem[];
	variant?: 'list' | 'dropdown';
};

function PagerIcon({ direction }: { direction: 'previous' | 'next' }) {
	return direction === 'previous' ? (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="docs-page__pager-icon">
			<path d="M9.5 3.5L5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	) : (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="docs-page__pager-icon">
			<path d="M6.5 3.5L11 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function DocsPageShell({
	title,
	description,
	children,
	toc,
	previous,
	next,
	Toc,
	breadcrumbs,
	sectionLabel,
}: {
	title: string;
	description?: string;
	children: ReactNode;
	toc: TocItem[];
	previous: Neighbour;
	next: Neighbour;
	Toc: ComponentType<TocComponentProps>;
	breadcrumbs: Array<{ label: string; href?: string }>;
	sectionLabel?: string;
}) {
	return (
		<div className="docs-page">
			<div className="docs-page__main">
				<div className="docs-page__content">
					<div className="docs-page__header">
						<DocsBreadcrumb items={breadcrumbs} />
						{sectionLabel ? <p className="docs-page__section-label">{sectionLabel}</p> : null}
						<h1>{title}</h1>
						{description ? <p className="docs-page__description">{description}</p> : null}
					</div>
					<div className="docs-page__toc-mobile">{toc.length ? <Toc toc={toc} variant="dropdown" /> : null}</div>
					<div className="docs-page__body prose-page">{children}</div>
					<div className="docs-page__footer">
						{previous ? (
							<a href={previous.url} className="docs-page__pager-link" data-direction="previous">
								<PagerIcon direction="previous" />
								<span className="docs-page__pager-label">Previous</span>
								<strong>{previous.name}</strong>
							</a>
						) : (
							<div className="docs-page__pager-spacer" />
						)}
						{next ? (
							<a href={next.url} className="docs-page__pager-link" data-direction="next">
								<span className="docs-page__pager-label">Next</span>
								<strong>{next.name}</strong>
								<PagerIcon direction="next" />
							</a>
						) : (
							<div className="docs-page__pager-spacer" />
						)}
					</div>
				</div>
			</div>
			<aside className="docs-page__toc">{toc.length ? <Toc toc={toc} variant="list" /> : null}</aside>
		</div>
	);
}
