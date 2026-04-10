import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const docsRoot = path.resolve(appRoot, 'content/docs');
const outDir = path.resolve(appRoot, '.generated');
const outFile = path.resolve(outDir, 'docs.json');

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true }).use(anchor, {
	permalink: anchor.permalink.headerLink(),
});

const sectionOrder = ['installation', 'components', 'composables', 'examples', 'registry'];

function toDocUrl(slug) {
	if (!slug.length) {
		return '/docs';
	}

	return `/docs/${slug.join('/')}/`;
}

function normalizeInternalDocLinks(content) {
	return content.replace(/(href=["']|\]\()\/docs(?!\/)(?=["')])/g, '$1/docs').replace(/(href=["']|\]\()((?:\/docs(?:\/[a-z0-9-]+)+))(?!\/)(?=["')])/gi, '$1$2/');
}

function walkDocs(dir, base = '') {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const files = [];

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

function normalizeSlug(relativeFile) {
	const withoutExt = relativeFile.replace(/\.mdx$/, '');
	const parts = withoutExt.split(path.sep);

	if (parts[parts.length - 1] === 'index') {
		parts.pop();
	}

	return parts.filter(Boolean);
}

function extractToc(markdownSource) {
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

function getSectionRank(slug) {
	const section = slug[0] ?? '';
	const index = sectionOrder.indexOf(section);
	return index === -1 ? sectionOrder.length : index;
}

function compareDocs(a, b) {
	if (a.slug.length === 0) return -1;
	if (b.slug.length === 0) return 1;

	const sectionDiff = getSectionRank(a.slug) - getSectionRank(b.slug);
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

function createTree(docs) {
	const root = {
		type: 'folder',
		name: 'docs',
		children: [],
	};

	for (const doc of docs) {
		let cursor = root;

		if (!doc.slug.length) {
			cursor.children.push({ type: 'page', name: doc.title, url: doc.url, children: [] });
			continue;
		}

		for (let index = 0; index < doc.slug.length; index += 1) {
			const segment = doc.slug[index];
			const isLast = index === doc.slug.length - 1;
			const isSectionIndex = isLast && doc.slug.length === 1;

			if (isSectionIndex) {
				let folder = cursor.children.find((child) => child.type === 'folder' && child.name === segment);
				if (!folder) {
					folder = { type: 'folder', name: segment, url: doc.url, children: [] };
					cursor.children.push(folder);
				} else {
					folder.url = doc.url;
				}
				continue;
			}

			if (isLast) {
				cursor.children.push({ type: 'page', name: doc.title, url: doc.url, children: [] });
				continue;
			}

			let folder = cursor.children.find((child) => child.type === 'folder' && child.name === segment);
			if (!folder) {
				folder = { type: 'folder', name: segment, children: [] };
				cursor.children.push(folder);
			}

			cursor = folder;
		}
	}

	return root;
}

function createPayloads(docs, tree) {
	return Object.fromEntries(
		docs.map((doc, index) => {
			const key = doc.slug.join('/');
			return [
				key,
				{
					doc: {
						url: doc.url,
						title: doc.title,
						description: doc.description,
						html: doc.html,
						toc: doc.toc,
					},
					neighbours: {
						previous: index > 0 ? { url: docs[index - 1].url, title: docs[index - 1].title } : null,
						next: index < docs.length - 1 ? { url: docs[index + 1].url, title: docs[index + 1].title } : null,
					},
					tree,
				},
			];
		}),
	);
}

export function buildDocs() {
	const docs = walkDocs(docsRoot)
		.map((relativeFile) => {
			const fullPath = path.join(docsRoot, relativeFile);
			const raw = fs.readFileSync(fullPath, 'utf-8');
			const parsed = matter(raw);
			const slug = normalizeSlug(relativeFile);
			const url = toDocUrl(slug);
			const normalizedContent = normalizeInternalDocLinks(parsed.content);

			return {
				slug,
				url,
				title: String(parsed.data.title ?? 'Untitled'),
				description: String(parsed.data.description ?? ''),
				html: markdown.render(normalizedContent),
				toc: extractToc(normalizedContent),
			};
		})
		.sort(compareDocs);

	const tree = createTree(docs);
	const payloads = createPayloads(docs, tree);
	const routes = docs.map((doc) => doc.url);

	fs.mkdirSync(outDir, { recursive: true });
	fs.writeFileSync(
		outFile,
		JSON.stringify(
			{
				routes,
				payloads,
			},
			null,
			2,
		),
		'utf-8',
	);

	console.log(`Generated ${path.relative(appRoot, outFile)} with ${docs.length} docs`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	buildDocs();
}
