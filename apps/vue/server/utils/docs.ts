import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

const DOCS_ROOT = path.join(process.cwd(), 'content/docs');

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true }).use(anchor, {
	permalink: anchor.permalink.headerLink(),
});

export type DocPage = {
	slug: string[];
	url: string;
	title: string;
	description: string;
	body: string;
	html: string;
	toc: Array<{ title: string; url: string; depth: number }>;
};

const SECTION_ORDER = ['installation', 'components', 'composables', 'examples', 'registry'];

function walkDocs(dir: string, base = ''): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const nextBase = base ? path.join(base, entry.name) : entry.name;
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			files.push(...walkDocs(fullPath, nextBase));
		} else if (entry.isFile() && entry.name.endsWith('.mdx')) {
			files.push(nextBase);
		}
	}

	return files.sort();
}

function normalizeSlug(relativeFile: string) {
	const withoutExt = relativeFile.replace(/\.mdx$/, '');
	const parts = withoutExt.split(path.sep);

	if (parts[parts.length - 1] === 'index') {
		parts.pop();
	}

	return parts.filter(Boolean);
}

function getSectionOrder(slug: string[]) {
	const section = slug[0] ?? '';
	const index = SECTION_ORDER.indexOf(section);
	return index === -1 ? SECTION_ORDER.length : index;
}

function compareDocs(a: DocPage, b: DocPage) {
	if (a.slug.length === 0) return -1;
	if (b.slug.length === 0) return 1;

	const sectionDiff = getSectionOrder(a.slug) - getSectionOrder(b.slug);
	if (sectionDiff !== 0) return sectionDiff;

	const aSection = a.slug[0] ?? '';
	const bSection = b.slug[0] ?? '';
	if (aSection !== bSection) return aSection.localeCompare(bSection);

	const aIsSectionIndex = a.slug.length === 1;
	const bIsSectionIndex = b.slug.length === 1;
	if (aIsSectionIndex && !bIsSectionIndex) return -1;
	if (!aIsSectionIndex && bIsSectionIndex) return 1;

	return a.title.localeCompare(b.title);
}

function extractToc(markdownSource: string) {
	return markdownSource
		.split('\n')
		.map((line) => line.match(/^(##|###)\s+(.*)$/))
		.filter(Boolean)
		.map((match) => {
			const hashes = match?.[1] ?? '##';
			const title = match?.[2]?.trim() ?? '';
			const slug = title
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '')
				.trim()
				.replace(/\s+/g, '-');

			return {
				title,
				url: `#${slug}`,
				depth: hashes.length,
			};
		});
}

export function getAllDocs(): DocPage[] {
	return walkDocs(DOCS_ROOT)
		.map((relativeFile) => {
			const fullPath = path.join(DOCS_ROOT, relativeFile);
			const raw = fs.readFileSync(fullPath, 'utf-8');
			const parsed = matter(raw);
			const slug = normalizeSlug(relativeFile);
			const url = `/docs${slug.length ? `/${slug.join('/')}` : ''}`;
			const toc = extractToc(parsed.content);

			return {
				slug,
				url,
				title: String(parsed.data.title ?? 'Untitled'),
				description: String(parsed.data.description ?? ''),
				body: parsed.content,
				html: markdown.render(parsed.content),
				toc,
			};
		})
		.sort(compareDocs);
}

export function getDocBySlug(slug: string[]) {
	const normalized = slug.filter(Boolean);
	return getAllDocs().find((doc) => doc.slug.join('/') === normalized.join('/'));
}

export function getDocNeighbours(slug: string[]) {
	const docs = getAllDocs();
	const currentIndex = docs.findIndex((doc) => doc.slug.join('/') === slug.join('/'));

	return {
		previous: currentIndex > 0 ? docs[currentIndex - 1] : null,
		next: currentIndex >= 0 && currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null,
	};
}
