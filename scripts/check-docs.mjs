#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function walkDocs(dir, base = '') {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const relative = base ? path.join(base, entry.name) : entry.name;
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			files.push(...walkDocs(fullPath, relative));
		} else if (entry.isFile() && entry.name.endsWith('.mdx')) {
			files.push(relative);
		}
	}

	return files;
}

function toDocUrls(files) {
	return new Set(
		files.map((file) => {
			const withoutExt = file.replace(/\.mdx$/, '');
			const parts = withoutExt.split(path.sep);
			if (parts[parts.length - 1] === 'index') {
				parts.pop();
			}
			return `/docs${parts.length ? `/${parts.join('/')}` : ''}`;
		}),
	);
}

function extractDocLinks(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');
	const matches = [...content.matchAll(/\]\((\/docs[^)#\s]*)(#[^)\s]+)?\)/g)];
	return matches.map((match) => match[1]);
}

function ensureExists(label, target, urls, errors) {
	if (!urls.has(target)) {
		errors.push(`${label}: missing ${target}`);
	}
}

const apps = [
	{
		name: 'react',
		docsDir: path.join(root, 'apps/react/content/docs'),
		expected: ['/docs', '/docs/components', '/docs/registry', '/docs/examples', '/docs/installation', '/docs/hooks'],
	},
	{
		name: 'vue',
		docsDir: path.join(root, 'apps/vue/content/docs'),
		expected: ['/docs', '/docs/components', '/docs/registry', '/docs/examples', '/docs/installation', '/docs/composables'],
	},
];

const errors = [];

for (const app of apps) {
	const files = walkDocs(app.docsDir);
	const urls = toDocUrls(files);

	for (const route of app.expected) {
		ensureExists(app.name, route, urls, errors);
	}

	for (const file of files) {
		const absolutePath = path.join(app.docsDir, file);
		const links = extractDocLinks(absolutePath);

		for (const link of links) {
			ensureExists(`${app.name}:${file}`, link, urls, errors);
		}
	}
}

if (errors.length) {
	console.error('Docs integrity check failed:');
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

console.log('Docs integrity check passed.');
