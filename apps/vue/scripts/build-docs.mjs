import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import rehypeParse from 'rehype-parse';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

import { getDemoSource, getDemoVariantIds } from '../../../scripts/demo-files.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const docsRoot = path.resolve(appRoot, 'content/docs');
const outDir = path.resolve(appRoot, '.generated');
const outFile = path.resolve(outDir, 'docs.json');

// 预览块可展开代码的折叠预览行数。
const PEEK_LINES = 6;

// 预览块代码来自 apps/vue/components/demos/<slug>.tsx 文件本体（与渲染同源）。
const previewSections = ['components', 'composables', 'examples'];

function escapeHtml(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const ICON_SVG = {
	copy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>',
	check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>',
	file: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>',
	terminal:
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>',
	braces: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"></path><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"></path></svg>',
	code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
	hash: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>',
};

function languageIcon(lang) {
	switch (lang) {
		case 'json':
			return ICON_SVG.braces;
		case 'css':
		case 'scss':
			return ICON_SVG.hash;
		case 'js':
		case 'jsx':
		case 'ts':
		case 'tsx':
		case 'typescript':
		case 'javascript':
			return ICON_SVG.code;
		case 'bash':
		case 'sh':
		case 'shell':
		case 'zsh':
		case 'console':
			return ICON_SVG.terminal;
		default:
			return ICON_SVG.file;
	}
}

function copyButtonHtml() {
	return (
		'<button type="button" data-slot="copy-button" aria-label="Copy code">' +
		`<span class="icon-copy">${ICON_SVG.copy}</span>` +
		`<span class="icon-check">${ICON_SVG.check}</span>` +
		'</button>'
	);
}

// 与 React 文档站保持一致：使用 shiki（rehype-pretty-code）做代码高亮，
// 生成相同的 data-line / --shiki-light / --shiki-dark 标记，两侧渲染完全一致。
const prettyCode = unified()
	.use(rehypeParse, { fragment: true })
	.use(rehypePrettyCode, {
		keepBackground: false,
		theme: {
			dark: 'github-dark',
			light: 'github-light-default',
		},
	})
	.use(rehypeStringify);

function decorateCodeHtml(html, { withCopy = true } = {}) {
	let out = html
		.replaceAll('data-rehype-pretty-code-figure=""', 'class="mdx-figure" data-rehype-pretty-code-figure=""')
		.replaceAll('<pre tabindex="0"', '<pre class="hljs" tabindex="0"')
		.replaceAll('<code data-language="', '<code data-line-numbers="" data-language="')
		.replace(/<figcaption data-rehype-pretty-code-title="" data-language="([^"]*)"[^>]*>(.*?)<\/figcaption>/g, (match, lang, text) => {
			return `<figcaption data-rehype-pretty-code-title="" data-language="${lang}">${languageIcon(lang)}<span>${text}</span></figcaption>`;
		});

	if (withCopy) {
		out = out.replaceAll('</pre></figure>', `</pre>${copyButtonHtml()}</figure>`);
	}

	return out;
}

// 渲染预览块下方可展开的实现代码（复用与正文代码块相同的 shiki 高亮管线）。
async function buildPreviewCodeForSlug(slug) {
	if (slug.length !== 2 || !previewSections.includes(slug[0])) {
		return null;
	}

	const code = getDemoSource('vue', slug[1]);
	if (!code) {
		return null;
	}

	const render = async (source) => {
		const file = await prettyCode.process(source);
		return decorateCodeHtml(String(file), { withCopy: false });
	};

	const fullSource = `<pre><code class="language-tsx">${escapeHtml(code)}</code></pre>`;
	const peekSource = `<pre><code class="language-tsx">${escapeHtml(code.split('\n').slice(0, PEEK_LINES).join('\n'))}</code></pre>`;

	return {
		preview: await render(peekSource),
		full: decorateCodeHtml(String(await prettyCode.process(fullSource)), { withCopy: true }),
		raw: code,
	};
}

const markdown = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
}).use(anchor, {
	permalink: anchor.permalink.headerLink(),
});

markdown.renderer.rules.fence = function (tokens, idx) {
	const token = tokens[idx];
	const info = token.info ? token.info.trim() : '';
	const parts = info.split(/\s+/);
	const lang = parts[0] || 'text';
	const meta = parts.slice(1).join(' ');
	const metastring = meta ? ` metastring="${escapeHtml(meta)}"` : '';

	return `<pre><code class="language-${escapeHtml(lang)}"${metastring}>${escapeHtml(token.content)}</code></pre>\n`;
};

const sectionOrder = ['installation', 'theming', 'themes', 'components', 'composables', 'examples', 'registry'];

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
						previewCode: doc.previewCode,
						variantCode: doc.variantCode,
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

async function renderMarkdown(content) {
	const rendered = markdown.render(content);
	const file = await prettyCode.process(rendered);

	return decorateCodeHtml(String(file));
}

export async function buildDocs() {
	const docs = (
		await Promise.all(
			walkDocs(docsRoot).map(async (relativeFile) => {
				const fullPath = path.join(docsRoot, relativeFile);
				const raw = fs.readFileSync(fullPath, 'utf-8');
				const parsed = matter(raw);
				const slug = normalizeSlug(relativeFile);
				const url = toDocUrl(slug);
				const normalizedContent = normalizeInternalDocLinks(parsed.content);
				const variantIds = slug.length === 2 && previewSections.includes(slug[0]) ? getDemoVariantIds('vue', slug[1]) : [];

				return {
					slug,
					url,
					title: String(parsed.data.title ?? 'Untitled'),
					description: String(parsed.data.description ?? ''),
					html: await renderMarkdown(normalizedContent),
					toc: extractToc(normalizedContent),
					previewCode: await buildPreviewCodeForSlug(slug),
					variantCode: variantIds.length
						? Object.fromEntries(await Promise.all(variantIds.map(async (id) => [id, await buildPreviewCodeForSlug([slug[0], `${slug[1]}/${id}`])])))
						: undefined,
				};
			}),
		)
	).sort(compareDocs);

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
	await buildDocs();
}
