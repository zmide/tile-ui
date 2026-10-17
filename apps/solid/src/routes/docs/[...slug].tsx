import { useParams } from '@solidjs/router';
import { For, Show, createEffect, createMemo, createSignal, onCleanup } from 'solid-js';

import { ComponentDemo } from '../../components/component-demo';
import { NotFoundPage } from '../../components/not-found-page';
import { PrimitiveDemo } from '../../components/primitive-demo';
import { Seo, breadcrumbJsonLd } from '../../components/seo';
import { solidDocs } from '../../generated/docs';

const componentDocs = solidDocs
	.filter((entry) => entry.slug.startsWith('components/') && entry.slug !== 'components')
	.map((entry) => ({ slug: entry.slug.slice('components/'.length), title: entry.title }))
	.sort((a, b) => a.slug.localeCompare(b.slug));
const componentNames = new Set(componentDocs.map((entry) => entry.slug));
const introLinks = [
	{ title: 'Introduction', href: '/docs' },
	{ title: 'Installation', href: '/docs/installation' },
	{ title: 'Theming', href: '/docs/theming' },
	{ title: 'Theme resources', href: '/docs/themes' },
	{ title: 'Primitives', href: '/docs/primitives' },
	{ title: 'Registry', href: '/docs/registry' },
	{ title: 'Examples', href: '/docs/examples' },
];
const sidebarScrollStorageKey = 'tile-ui-solid-docs-sidebar-scroll';
let sidebarScrollTop: number | undefined;

function PagerIcon(props: { direction: 'previous' | 'next' }) {
	return (
		<svg class="solid-doc__pager-icon" viewBox="0 0 16 16" aria-hidden="true">
			<path d={props.direction === 'previous' ? 'm10.5 3-5 5 5 5' : 'm5.5 3 5 5-5 5'} />
		</svg>
	);
}

function readSidebarScrollTop() {
	if (sidebarScrollTop !== undefined) return sidebarScrollTop;
	if (typeof sessionStorage === 'undefined') return 0;
	const stored = Number.parseFloat(sessionStorage.getItem(sidebarScrollStorageKey) ?? '0');
	sidebarScrollTop = Number.isFinite(stored) ? stored : 0;
	return sidebarScrollTop;
}

function restoreSidebarScrollPosition(element: HTMLElement) {
	queueMicrotask(() => {
		element.scrollTop = readSidebarScrollTop();
	});
}

function rememberSidebarScrollPosition(event: Event) {
	sidebarScrollTop = event.currentTarget instanceof HTMLElement ? event.currentTarget.scrollTop : 0;
	if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(sidebarScrollStorageKey, String(sidebarScrollTop));
}

export default function DocsPage() {
	const params = useParams();
	const [activeHeading, setActiveHeading] = createSignal<string | null>(null);
	const [tocOpen, setTocOpen] = createSignal(false);
	let tocContainer: HTMLDivElement | undefined;
	let tocTrigger: HTMLButtonElement | undefined;
	const slug = createMemo(() => params.slug ?? '');
	const doc = createMemo(() => solidDocs.find((entry) => entry.slug === slug()));
	const currentIndex = createMemo(() => solidDocs.findIndex((entry) => entry.slug === slug()));
	const componentSlug = createMemo(() => (slug().startsWith('components/') ? slug().slice('components/'.length) : ''));

	createEffect(() => {
		const items = doc()?.toc ?? [];
		if (typeof window === 'undefined' || typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') return;

		setActiveHeading(window.location.hash.replace(/^#/, '') || null);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const observed of entries) {
					if (observed.isIntersecting) setActiveHeading(observed.target.id);
				}
			},
			{ rootMargin: '0% 0% -80% 0%' },
		);

		for (const item of items) {
			const heading = document.getElementById(item.href.replace(/^#/, ''));
			if (heading) observer.observe(heading);
		}

		onCleanup(() => observer.disconnect());
	});

	createEffect(() => {
		if (!tocOpen() || typeof document === 'undefined') return;

		const closeOutside = (event: MouseEvent) => {
			if (!tocContainer?.contains(event.target as Node)) setTocOpen(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			setTocOpen(false);
			tocTrigger?.focus();
		};
		document.addEventListener('mousedown', closeOutside);
		document.addEventListener('keydown', closeOnEscape);
		onCleanup(() => {
			document.removeEventListener('mousedown', closeOutside);
			document.removeEventListener('keydown', closeOnEscape);
		});
	});

	createEffect(() => {
		slug();
		setTocOpen(false);
	});

	return (
		<Show when={doc()} fallback={<NotFoundPage docs />} keyed>
			{(entry) => (
				<div class="solid-docs-layout">
					<Seo title={entry.title} description={entry.description} path={entry.url} type="article" jsonLd={breadcrumbJsonLd(entry.url, entry.title)} />
					<aside class="solid-sidebar" ref={restoreSidebarScrollPosition} onScroll={rememberSidebarScrollPosition}>
						<div>
							<p>Get started</p>
							<nav aria-label="Documentation sections">
								<For each={introLinks}>
									{(item) => (
										<a href={item.href} data-active={entry.url === item.href}>
											{item.title}
										</a>
									)}
								</For>
							</nav>
						</div>
						<div>
							<p>Components</p>
							<nav aria-label="Solid component documentation">
								<For each={componentDocs}>
									{(component) => (
										<a href={`/docs/components/${component.slug}`} data-active={componentSlug() === component.slug}>
											{component.title}
										</a>
									)}
								</For>
							</nav>
						</div>
					</aside>
					<article class="solid-doc">
						<header class="solid-doc__header">
							<div class="solid-doc__eyebrow">
								<p>Tile UI · SolidJS</p>
								<Show when={componentNames.has(componentSlug()) || slug() === 'primitives'}>
									<span>CSR · SSR · SSG</span>
								</Show>
							</div>
							<h1>{entry.title}</h1>
							<p class="solid-doc__description">{entry.description}</p>
						</header>
						<Show when={entry.toc.length > 0}>
							<div ref={(element) => (tocContainer = element)} class="solid-toc-mobile">
								<button
									ref={(element) => (tocTrigger = element)}
									type="button"
									class="solid-toc-mobile__trigger"
									aria-expanded={tocOpen()}
									aria-controls="solid-mobile-toc"
									onClick={() => setTocOpen((open) => !open)}>
									On This Page
								</button>
								<nav id="solid-mobile-toc" class="solid-toc-mobile__content" aria-label="On this page" hidden={!tocOpen()}>
									<For each={entry.toc}>
										{(item) => (
											<a href={item.href} data-active={item.href === `#${activeHeading()}`} data-depth={item.depth} onClick={() => setTocOpen(false)}>
												{item.title}
											</a>
										)}
									</For>
								</nav>
							</div>
						</Show>
						<Show when={componentNames.has(componentSlug())}>
							<ComponentDemo slug={componentSlug()} />
						</Show>
						<Show when={slug() === 'primitives'}>
							<PrimitiveDemo slug="primitives" />
						</Show>
						<div class="prose-page solid-prose" innerHTML={entry.html} />
						<footer class="solid-doc__pager">
							<Show when={solidDocs[currentIndex() - 1]}>
								{(previous) => (
									<a href={previous().url} data-direction="previous">
										<PagerIcon direction="previous" />
										<span class="solid-doc__pager-label">Previous</span>
										<strong>{previous().title}</strong>
									</a>
								)}
							</Show>
							<Show when={solidDocs[currentIndex() + 1]}>
								{(next) => (
									<a href={next().url} data-direction="next">
										<span class="solid-doc__pager-label">Next</span>
										<strong>{next().title}</strong>
										<PagerIcon direction="next" />
									</a>
								)}
							</Show>
						</footer>
					</article>
					<aside class="solid-toc">
						<p>On this page</p>
						<nav aria-label="On this page">
							<For each={entry.toc}>
								{(item) => (
									<a href={item.href} data-active={item.href === `#${activeHeading()}`} data-depth={item.depth}>
										{item.title}
									</a>
								)}
							</For>
						</nav>
					</aside>
				</div>
			)}
		</Show>
	);
}
