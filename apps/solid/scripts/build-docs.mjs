import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import { codeToHtml } from 'shiki';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(dirname, '..');
const workspaceRoot = path.resolve(appRoot, '../..');
const docsRoot = path.join(appRoot, 'content/docs');
const outputFile = path.join(appRoot, 'src/generated/docs.ts');

function headingSlug(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true }).use(anchor, {
	slugify: headingSlug,
	permalink: anchor.permalink.headerLink(),
});

function escapeHtml(value) {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

markdown.renderer.rules.fence = (tokens, index) => {
	const token = tokens[index];
	const language = token.info.trim().split(/\s+/)[0] || 'text';
	return `<div data-code-block="true" data-language="${language}">${escapeHtml(token.content)}</div>`;
};

function walk(directory, base = '') {
	return fs
		.readdirSync(directory, { withFileTypes: true })
		.flatMap((entry) => {
			const relative = base ? path.join(base, entry.name) : entry.name;
			return entry.isDirectory() ? walk(path.join(directory, entry.name), relative) : entry.name.endsWith('.mdx') ? [relative] : [];
		})
		.sort();
}

function slugFromFile(file) {
	const parts = file.replace(/\.mdx$/, '').split(path.sep);
	if (parts.at(-1) === 'index') parts.pop();
	return parts;
}

function extractToc(source) {
	return source
		.split('\n')
		.map((line) => line.match(/^(##|###)\s+(.+)$/))
		.filter(Boolean)
		.map((match) => ({
			depth: match[1].length,
			title: match[2].replaceAll('`', '').trim(),
			href: `#${headingSlug(match[2])}`,
		}));
}

async function renderMarkdown(source) {
	let html = markdown.render(source.replace(/<ComponentDemo\s+slug="[^"]+"\s*\/>/g, ''));
	const blocks = [...html.matchAll(/<div data-code-block="true" data-language="([^"]+)">([\s\S]*?)<\/div>/g)];
	for (const block of blocks) {
		const language = block[1];
		const code = block[2].replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
		const highlighted = await codeToHtml(code, {
			lang: language,
			themes: { light: 'github-light-default', dark: 'github-dark' },
			defaultColor: false,
		});
		html = html.replace(block[0], highlighted);
	}
	return html;
}

const sectionOrder = ['installation', 'theming', 'themes', 'primitives', 'components', 'registry', 'examples'];
const docs = [];
for (const file of walk(docsRoot)) {
	const parsed = matter(fs.readFileSync(path.join(docsRoot, file), 'utf8'));
	const slug = slugFromFile(file);
	docs.push({
		slug: slug.join('/'),
		url: slug.length ? `/docs/${slug.join('/')}` : '/docs',
		title: String(parsed.data.title ?? 'Untitled'),
		description: String(parsed.data.description ?? ''),
		html: await renderMarkdown(parsed.content),
		toc: extractToc(parsed.content),
	});
}

docs.sort((a, b) => {
	if (!a.slug) return -1;
	if (!b.slug) return 1;
	const aSection = a.slug.split('/')[0];
	const bSection = b.slug.split('/')[0];
	const rank = sectionOrder.indexOf(aSection) - sectionOrder.indexOf(bSection);
	if (rank !== 0) return rank;
	if (a.slug === aSection) return -1;
	if (b.slug === bSection) return 1;
	return a.title.localeCompare(b.title);
});

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(
	outputFile,
	`// 本文件由 scripts/build-docs.mjs 自动生成，请勿手动修改。\nexport type SolidDoc = { slug: string; url: string; title: string; description: string; html: string; toc: Array<{ depth: number; title: string; href: string }> };\n\nexport const solidDocs: SolidDoc[] = ${JSON.stringify(docs, null, '\t')};\n`,
);

const formatter = path.join(workspaceRoot, 'node_modules/.bin/oxfmt');
if (fs.existsSync(formatter)) spawnSync(formatter, [outputFile], { stdio: 'inherit' });
console.log(`Generated ${path.relative(appRoot, outputFile)} with ${docs.length} routes`);
