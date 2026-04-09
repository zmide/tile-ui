'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type TocItem = {
	title?: string;
	url: string;
	depth: number;
};

function useActiveItem(itemIds: string[]) {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: '0% 0% -80% 0%' },
		);

		for (const id of itemIds) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const id of itemIds) {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			}
			observer.disconnect();
		};
	}, [itemIds]);

	return activeId;
}

function TocLinks({ toc, activeHeading, onNavigate }: { toc: TocItem[]; activeHeading: string | null; onNavigate?: () => void }) {
	return toc.map((item) => (
		// Fallback text keeps TOC visible even if source titles are non-string.
		<a key={item.url} href={item.url} className="docs-toc__link" data-active={item.url === `#${activeHeading}`} data-depth={item.depth} onClick={onNavigate}>
			{item.title ?? item.url.replace(/^#/, '').replace(/-/g, ' ')}
		</a>
	));
}

export function DocsTableOfContents({ toc, variant = 'list' }: { toc: TocItem[]; variant?: 'list' | 'dropdown' }) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const itemIds = useMemo(() => toc.map((item) => item.url.replace('#', '')), [toc]);
	const activeHeading = useActiveItem(itemIds);

	useEffect(() => {
		if (!open) {
			return;
		}

		function handlePointerDown(event: MouseEvent) {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		function handleEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		}

		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [open]);

	if (!toc.length) {
		return null;
	}

	if (variant === 'dropdown') {
		return (
			<div ref={containerRef} className="docs-toc-mobile">
				<button type="button" className="docs-toc-mobile__trigger" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)}>
					<span className="docs-toc-mobile__icon" aria-hidden="true">
						<svg viewBox="0 0 16 16" fill="none">
							<path d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
						</svg>
					</span>
					On This Page
				</button>
				{open ? (
					<div className="docs-toc-mobile__content" role="menu">
						<TocLinks toc={toc} activeHeading={activeHeading} onNavigate={() => setOpen(false)} />
					</div>
				) : null}
			</div>
		);
	}

	return (
		<div className="docs-toc">
			<p className="docs-toc__title">On This Page</p>
			<TocLinks toc={toc} activeHeading={activeHeading} />
		</div>
	);
}
