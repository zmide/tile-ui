#!/usr/bin/env node

import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { getDemoSlugs, getDemoSource } from './demo-files.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const require = createRequire(path.join(root, 'apps/solid/package.json'));
const { tsImport } = await import(pathToFileURL(require.resolve('tsx/esm/api')).href);

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

function registryUiNames(appName) {
	const registryPath = path.join(root, `apps/${appName}/public/r/registry.json`);
	if (!fs.existsSync(registryPath)) {
		return null;
	}
	const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
	return registry.items.filter((item) => item.type === 'registry:ui').map((item) => item.name);
}

async function sourceManifestItems() {
	const manifestPath = path.join(root, 'packages/solid/src/registry/manifest.ts');
	const module = await tsImport(pathToFileURL(manifestPath).href, import.meta.url);
	const manifest = module.solidRegistryManifest;
	if (!manifest?.items) throw new Error('Solid source manifest does not export solidRegistryManifest.');
	return manifest.items;
}

async function assertSolidContracts(files, urls, errors) {
	const manifestItems = await sourceManifestItems();
	const sourceItems = manifestItems.filter((item) => item.type === 'registry:ui');
	const expectedNames = sourceItems.map((item) => item.name).sort();
	const registryNames = registryUiNames('solid');
	if (!registryNames) {
		errors.push('solid: missing public/r/registry.json');
		return;
	}
	const actualNames = [...registryNames].sort();
	if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames))
		errors.push(`solid: source manifest and registry differ (${expectedNames.join(', ')} vs ${actualNames.join(', ')})`);
	const docs = files
		.filter((file) => file.startsWith(`components${path.sep}`) && file !== path.join('components', 'index.mdx'))
		.map((file) => path.basename(file, '.mdx'))
		.sort();
	const demos = getDemoSlugs('solid');
	if (JSON.stringify(docs) !== JSON.stringify(expectedNames)) errors.push(`solid: component docs differ from source manifest (${docs.join(', ')})`);
	if (JSON.stringify(demos) !== JSON.stringify(expectedNames)) errors.push(`solid: demos differ from source manifest (${demos.join(', ')})`);
	if (manifestItems.length !== 71) errors.push(`solid: expected 71 manifest items, received ${manifestItems.length}`);
	const hookNames = manifestItems
		.filter((item) => item.type === 'registry:hook')
		.map((item) => item.name)
		.sort();
	if (JSON.stringify(hookNames) !== JSON.stringify(['create-copy-to-clipboard', 'create-local-storage', 'create-media-query']))
		errors.push(`solid: primitive hook set mismatch (${hookNames.join(', ')})`);
	const sharedNames = manifestItems
		.filter((item) => item.type !== 'registry:ui' && item.type !== 'registry:hook')
		.map((item) => item.name)
		.sort();
	if (JSON.stringify(sharedNames) !== JSON.stringify(['core', 'liveline-core', 'styles', 'theme-default', 'theme-kumo', 'utils']))
		errors.push(`solid: shared registry set mismatch (${sharedNames.join(', ')})`);
	const componentIndex = fs.readFileSync(path.join(root, 'apps/solid/content/docs/components/index.mdx'), 'utf8');
	for (const name of expectedNames) {
		if (!componentIndex.includes(`](/docs/components/${name})`)) errors.push(`solid: component index missing ${name}`);
	}
	for (const [file, source] of files.map((file) => [file, fs.readFileSync(path.join(root, 'apps/solid/content/docs', file), 'utf8')])) {
		if (/Stage\s*\d+|Batch\s*\d+|(?:first|current|only)\s+\d+[- ](?:component|item)|\b(?:7|21|34|38|56|60)\s+(?:components?|UI items?|manifest items?)\b/i.test(source))
			errors.push(`solid:${file}: stale stage/count scope copy`);
	}

	const requiredSections = ['## Registry install', '## Package usage', '## Highlights', '## Registry dependencies', '## API reference', '## Related docs'];
	for (const name of expectedNames) {
		const docFile = path.join(root, 'apps/solid/content/docs/components', `${name}.mdx`);
		const source = fs.readFileSync(docFile, 'utf8');
		let previous = -1;
		for (const section of requiredSections) {
			const index = source.indexOf(section);
			if (index === -1 || index < previous) errors.push(`solid:${name}: missing or out-of-order section ${section}`);
			previous = index;
		}
		if (!source.includes(`<ComponentDemo slug="${name}" />`)) errors.push(`solid:${name}: missing ComponentDemo marker`);
		const item = sourceItems.find((candidate) => candidate.name === name);
		for (const dependency of item?.registryDependencies ?? []) {
			const dependencyName = dependency.replace('@tile-ui/', '');
			if (!source.includes(`| \`${dependencyName}\``)) errors.push(`solid:${name}: dependency docs missing ${dependency}`);
		}
	}

	const previewFile = path.join(root, 'apps/solid/src/generated/preview-code.ts');
	if (!fs.existsSync(previewFile)) errors.push('solid: missing generated preview-code.ts');
	else {
		const generated = fs.readFileSync(previewFile, 'utf8');
		for (const name of expectedNames) {
			const source = getDemoSource('solid', name);
			const encoded = `'${source.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}'`;
			if (!generated.includes(`raw: ${encoded}`) && !generated.includes(`raw: ${JSON.stringify(source)}`))
				errors.push(`solid:${name}: generated preview raw source is stale`);
		}
	}
	const primitiveDocPath = path.join(root, 'apps/solid/content/docs/primitives.mdx');
	const primitiveDemoPath = path.join(root, 'apps/solid/components/primitive-demos/primitives.tsx');
	const primitivePreviewPath = path.join(root, 'apps/solid/src/generated/primitive-preview-code.ts');
	ensureExists('solid', '/docs/primitives', urls, errors);
	for (const [label, file] of [
		['primitive doc', primitiveDocPath],
		['primitive demo', primitiveDemoPath],
		['primitive preview', primitivePreviewPath],
	]) {
		if (!fs.existsSync(file)) errors.push(`solid: missing ${label}`);
	}
	if (fs.existsSync(primitiveDocPath) && fs.existsSync(primitiveDemoPath) && fs.existsSync(primitivePreviewPath)) {
		const primitiveDoc = fs.readFileSync(primitiveDocPath, 'utf8');
		const primitiveDemo = fs.readFileSync(primitiveDemoPath, 'utf8');
		const primitivePreview = fs.readFileSync(primitivePreviewPath, 'utf8');
		const encoded = JSON.stringify(primitiveDemo);
		if (
			!primitivePreview.includes(`raw: ${encoded}`) &&
			!primitivePreview.includes(`raw: '${primitiveDemo.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}'`)
		)
			errors.push('solid: primitive preview raw source is stale');
		if (!primitiveDemo.includes("from '@tile-ui/solid/primitives';")) errors.push('solid: primitive demo must use @tile-ui/solid/primitives');
		for (const section of [
			'Introduction',
			'Package install',
			'Package usage',
			'SSR contract',
			'Cleanup contract',
			'Primitive groups',
			'Registry install',
			'API reference',
			'Related docs',
		]) {
			if (!primitiveDoc.includes(`## ${section}`)) errors.push(`solid: primitive docs missing ${section}`);
		}
		for (const api of [
			'createClickOutside',
			'createCopyToClipboard',
			'createIsMobile',
			'createKeyPress',
			'createLocalStorage',
			'createMediaQuery',
			'createMousePosition',
			'createOnlineStatus',
			'createScrollPosition',
			'createSessionStorage',
			'createWindowSize',
		]) {
			if (!primitiveDoc.includes(api)) errors.push(`solid: primitive docs missing package API ${api}`);
			if (!primitiveDemo.includes(api)) errors.push(`solid: primitive demo missing package API ${api}`);
		}
	}

	for (const route of ['/docs/theming', '/docs/registry/getting-started', '/docs/registry/schema', '/docs/registry/examples', '/docs/registry/faq'])
		ensureExists('solid', route, urls, errors);
}

const apps = [
	{
		name: 'react',
		docsDir: path.join(root, 'apps/react/content/docs'),
		expected: ['/docs', '/docs/components', '/docs/registry', '/docs/examples', '/docs/installation', '/docs/hooks'],
		expectedUiCount: 62,
	},
	{
		name: 'vue',
		docsDir: path.join(root, 'apps/vue/content/docs'),
		expected: ['/docs', '/docs/components', '/docs/registry', '/docs/examples', '/docs/installation', '/docs/composables'],
		expectedUiCount: 62,
	},
	{
		name: 'solid',
		docsDir: path.join(root, 'apps/solid/content/docs'),
		expected: ['/docs', '/docs/components', '/docs/registry', '/docs/examples', '/docs/installation', '/docs/theming', '/docs/primitives'],
		expectedUiCount: 62,
	},
];

const errors = [];
const solidSourceItems = (await sourceManifestItems()).filter((item) => item.type === 'registry:ui');
const solidSourceNames = solidSourceItems.map((item) => item.name).sort();

for (const app of apps) {
	if (!fs.existsSync(app.docsDir)) {
		errors.push(`${app.name}: missing docs directory ${path.relative(root, app.docsDir)}`);
		continue;
	}
	const files = walkDocs(app.docsDir);
	const urls = toDocUrls(files);
	for (const route of ['/docs/theming', '/docs/themes', '/docs/themes/kumo']) {
		ensureExists(app.name, route, urls, errors);
	}
	if (app.name === 'solid') await assertSolidContracts(files, urls, errors);

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

	// 组件文档完整性：文档集合必须与当前框架 registry:ui 精确一致。
	const registryNames = registryUiNames(app.name);
	if (!registryNames) {
		errors.push(`${app.name}: missing public/r/registry.json`);
		continue;
	}
	const expectedNames = app.name === 'solid' ? solidSourceNames : registryNames;
	const actualNames = [...registryNames].sort();
	const sortedExpectedNames = [...expectedNames].sort();
	if (app.expectedUiCount && actualNames.length !== app.expectedUiCount) {
		errors.push(`${app.name}: expected ${app.expectedUiCount} registry:ui items, received ${actualNames.length}`);
	}
	if (JSON.stringify(actualNames) !== JSON.stringify(sortedExpectedNames)) {
		errors.push(`${app.name}: registry:ui set mismatch (expected ${sortedExpectedNames.join(', ')}, received ${actualNames.join(', ')})`);
	}

	const componentDocs = [...urls]
		.filter((url) => url.startsWith('/docs/components/') && url.split('/').length === 4)
		.map((url) => url.replace('/docs/components/', ''))
		.sort();
	if (JSON.stringify(componentDocs) !== JSON.stringify(sortedExpectedNames)) {
		errors.push(`${app.name}: component docs set mismatch (expected ${sortedExpectedNames.join(', ')}, received ${componentDocs.join(', ')})`);
	}

	for (const name of expectedNames) {
		ensureExists(`${app.name}:registry:ui/${name}`, `/docs/components/${name}`, urls, errors);
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
