#!/usr/bin/env node

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { getDemoSource } from './demo-files.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'apps/solid/package.json'));
const ts = require('typescript');
const { tsImport } = await import(pathToFileURL(require.resolve('tsx/esm/api')).href);

const FRAMEWORKS = ['react', 'vue', 'solid'];
const EXPECTED_TOTALS = { react: 72, vue: 72, solid: 71 };
const EXTRA_DEMOS = {
	react: { hooks: ['use-copy-to-clipboard', 'use-local-storage', 'use-media-query'], examples: ['contact-form', 'newsletter-card', 'profile-settings'], primitives: [] },
	vue: { hooks: ['use-copy-to-clipboard', 'use-local-storage', 'use-media-query'], examples: ['contact-form', 'newsletter-card', 'profile-settings'], primitives: [] },
	solid: { hooks: [], examples: [], primitives: ['primitives'] },
};
const EXCEPTIONS = {
	react: {
		helperItems: ['core', 'liveline-core', 'portal', 'styles', 'theme-default', 'theme-kumo', 'use-copy-to-clipboard', 'use-local-storage', 'use-media-query', 'utils'],
		helperSubpath: './hooks',
		portal: 'registry item',
	},
	vue: {
		helperItems: ['core', 'liveline-core', 'portal', 'styles', 'theme-default', 'theme-kumo', 'use-copy-to-clipboard', 'use-local-storage', 'use-media-query', 'utils'],
		helperSubpath: './composables',
		portal: 'registry item',
	},
	solid: {
		helperItems: ['core', 'create-copy-to-clipboard', 'create-local-storage', 'create-media-query', 'liveline-core', 'styles', 'theme-default', 'theme-kumo', 'utils'],
		helperSubpath: './primitives',
		portal: 'component-internal',
	},
};

const errors = [];
const rows = [];

function read(relativePath) {
	return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function json(relativePath) {
	return JSON.parse(read(relativePath));
}

function exists(relativePath) {
	return fs.existsSync(path.join(root, relativePath));
}

function sorted(values) {
	return [...values].sort();
}

function unique(values) {
	return new Set(values).size === values.length;
}

function sameSet(left, right) {
	return JSON.stringify(sorted(left)) === JSON.stringify(sorted(right));
}

function mismatch(label, expected, actual) {
	errors.push(`${label}: expected [${sorted(expected).join(', ')}], received [${sorted(actual).join(', ')}]`);
}

function assertSet(label, expected, actual) {
	if (!sameSet(expected, actual)) mismatch(label, expected, actual);
}

function listFiles(relativeDir, extension) {
	const absoluteDir = path.join(root, relativeDir);
	if (!fs.existsSync(absoluteDir)) return [];
	return fs
		.readdirSync(absoluteDir, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(extension))
		.map((entry) => entry.name.slice(0, -extension.length));
}

function listDirs(relativeDir) {
	const absoluteDir = path.join(root, relativeDir);
	if (!fs.existsSync(absoluteDir)) return [];
	return fs
		.readdirSync(absoluteDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
}

function parseSource(relativePath) {
	return ts.createSourceFile(relativePath, read(relativePath), ts.ScriptTarget.Latest, true, relativePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}

function exportPaths(relativePath) {
	const paths = [];
	for (const statement of parseSource(relativePath).statements) {
		if (ts.isExportDeclaration(statement) && statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)) paths.push(statement.moduleSpecifier.text);
	}
	return paths;
}

function importPaths(relativePath) {
	const paths = [];
	for (const statement of parseSource(relativePath).statements) {
		if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) paths.push(statement.moduleSpecifier.text);
	}
	return paths;
}

function registryDependencyName(value) {
	return value.replace(/^@tile-ui\//, '');
}

function comparableItem(item, publicItem = false, includeTargets = true) {
	return {
		name: item.name,
		type: item.type,
		title: item.title,
		description: item.description,
		dependencies: sorted(item.dependencies ?? []),
		devDependencies: sorted(item.devDependencies ?? []),
		registryDependencies: sorted(item.registryDependencies ?? []),
		files: (item.files ?? [])
			.map((file) => ({ path: publicItem ? file.path : file.source, type: file.type, target: includeTargets ? (file.target ?? null) : null }))
			.sort((a, b) => `${a.path}:${a.target}`.localeCompare(`${b.path}:${b.target}`)),
	};
}

function assertItem(label, sourceItem, publicItem, includeTargets = true) {
	if (JSON.stringify(comparableItem(sourceItem, false, includeTargets)) !== JSON.stringify(comparableItem(publicItem, true, includeTargets)))
		errors.push(`${label}: public registry metadata/files are stale`);
}

function demoRegistryKeys(relativePath) {
	const source = parseSource(relativePath);
	for (const statement of source.statements) {
		if (!ts.isVariableStatement(statement)) continue;
		for (const declaration of statement.declarationList.declarations) {
			if (
				!ts.isIdentifier(declaration.name) ||
				!/demoRegistry$/i.test(declaration.name.text) ||
				!declaration.initializer ||
				!ts.isObjectLiteralExpression(declaration.initializer)
			)
				continue;
			return declaration.initializer.properties.flatMap((property) => {
				if (!ts.isPropertyAssignment(property)) return [];
				if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) return [property.name.text];
				return [];
			});
		}
	}
	return [];
}

function docsDependencyNames(source) {
	const section = source.match(/## Registry dependencies\s+([\s\S]*?)(?=\n## |$)/)?.[1] ?? '';
	return [...section.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((match) => match[1]);
}

async function loadManifest(framework) {
	const relativePath = `packages/${framework}/src/registry/manifest.ts`;
	const module = await tsImport(pathToFileURL(path.join(root, relativePath)).href, import.meta.url);
	const manifest = module[`${framework}RegistryManifest`];
	if (!manifest?.items) throw new Error(`${relativePath} does not export ${framework}RegistryManifest`);
	return manifest;
}

function loadPreviewMap(framework) {
	const relativePath = framework === 'react' ? 'apps/react/lib/preview-code.ts' : 'apps/solid/src/generated/preview-code.ts';
	if (!exists(relativePath)) return null;
	const source = parseSource(relativePath);
	for (const statement of source.statements) {
		if (!ts.isVariableStatement(statement)) continue;
		for (const declaration of statement.declarationList.declarations) {
			if (
				!ts.isIdentifier(declaration.name) ||
				declaration.name.text !== 'previewCodeMap' ||
				!declaration.initializer ||
				!ts.isObjectLiteralExpression(declaration.initializer)
			)
				continue;
			return Object.fromEntries(
				declaration.initializer.properties.flatMap((property) => {
					if (!ts.isPropertyAssignment(property) || !ts.isObjectLiteralExpression(property.initializer)) return [];
					const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : null;
					const raw = property.initializer.properties.find((candidate) => ts.isPropertyAssignment(candidate) && candidate.name.getText(source) === 'raw');
					if (!name || !raw || !ts.isPropertyAssignment(raw) || !ts.isStringLiteralLike(raw.initializer)) return [];
					return [[name, { raw: raw.initializer.text }]];
				}),
			);
		}
	}
	return null;
}

function assertPackageExports(framework, uiNames) {
	const rootPaths = exportPaths(`packages/${framework}/src/index.ts`).map((value) => value.replace(/^\.\/components\//, ''));
	for (const name of uiNames) {
		const directory = `packages/${framework}/src/components/${name}`;
		if (!exists(`${directory}/index.ts`)) errors.push(`${framework}:${name}: missing component barrel`);
		if (!rootPaths.includes(name)) errors.push(`${framework}:${name}: component family is not reachable from package root`);
	}
	const packageJson = json(`packages/${framework}/package.json`);
	const expectedSubpath = EXCEPTIONS[framework].helperSubpath;
	if (!packageJson.exports?.['.']) errors.push(`${framework}: package root export is missing`);
	if (!packageJson.exports?.[expectedSubpath]) errors.push(`${framework}: helper export ${expectedSubpath} is missing`);
}

function assertSourceDependencies(framework, uiItems) {
	for (const item of uiItems) {
		const declared = new Set((item.registryDependencies ?? []).map(registryDependencyName));
		for (const file of item.files.filter((candidate) => candidate.source.startsWith(`packages/${framework}/src/components/`))) {
			const source = read(file.source);
			for (const imported of importPaths(file.source)) {
				if (!imported.startsWith('../')) continue;
				const resolved = path.normalize(path.join(path.dirname(file.source), imported));
				const marker = `packages/${framework}/src/components/`;
				if (!resolved.startsWith(marker)) continue;
				const dependency = resolved.slice(marker.length).split(path.sep)[0];
				if (dependency !== item.name && dependency !== 'portal' && !declared.has(dependency))
					errors.push(`${framework}:${item.name}: imports ${dependency} but registryDependencies omits it`);
				if (dependency === 'portal' && EXCEPTIONS[framework].portal === 'registry item' && !declared.has('portal'))
					errors.push(`${framework}:${item.name}: imports portal but registryDependencies omits @tile-ui/portal`);
			}
			if (source.includes('@tile-ui/styles/') && !declared.has('styles'))
				errors.push(`${framework}:${item.name}: imports shared styles but registryDependencies omits @tile-ui/styles`);
		}
	}
}

function assertDocsAndDemos(framework, uiItems) {
	const uiNames = uiItems.map((item) => item.name);
	const docs = listFiles(`apps/${framework}/content/docs/components`, '.mdx').filter((name) => name !== 'index');
	const demos = listFiles(`apps/${framework}/components/demos`, '.tsx');
	const metadata = demoRegistryKeys(`apps/${framework}/components/demos/index.ts`);
	assertSet(`${framework}: component docs`, uiNames, docs);
	assertSet(
		`${framework}: component demo sources`,
		uiNames,
		demos.filter((name) => uiNames.includes(name)),
	);
	assertSet(
		`${framework}: component demo metadata`,
		uiNames,
		metadata.filter((name) => uiNames.includes(name)),
	);
	assertSet(`${framework}: registered demo source set`, demos, metadata);

	const extras = sorted(demos.filter((name) => !uiNames.includes(name)));
	assertSet(`${framework}: classified extra demos`, [...EXTRA_DEMOS[framework].hooks, ...EXTRA_DEMOS[framework].examples], extras);
	const index = read(`apps/${framework}/content/docs/components/index.mdx`);
	for (const item of uiItems) {
		if (!index.includes(`](/docs/components/${item.name})`)) errors.push(`${framework}:${item.name}: component index link is missing`);
		const docPath = `apps/${framework}/content/docs/components/${item.name}.mdx`;
		if (!exists(docPath)) continue;
		const documented = docsDependencyNames(read(docPath));
		const dependencies = (item.registryDependencies ?? []).map(registryDependencyName);
		const expected =
			framework === 'solid' ? [item.name, ...dependencies] : [item.name, ...dependencies.filter((name) => ['core', 'liveline-core', 'styles', 'utils'].includes(name))];
		assertSet(`${framework}:${item.name}: documented registry dependencies`, expected, documented);
	}
	if (framework === 'solid') {
		for (const primitive of EXTRA_DEMOS.solid.primitives) {
			if (!exists(`apps/solid/components/primitive-demos/${primitive}.tsx`)) errors.push(`solid: classified primitive demo ${primitive} is missing`);
		}
	}
	return EXTRA_DEMOS[framework];
}

async function assertPreviews(framework, uiNames) {
	if (framework === 'vue') {
		if (!exists('apps/vue/.generated/docs.json')) {
			errors.push('vue: missing .generated/docs.json; run docs:build');
			return;
		}
		const data = json('apps/vue/.generated/docs.json');
		for (const name of uiNames) {
			const raw = data.payloads?.[`components/${name}`]?.doc?.previewCode?.raw;
			if (raw !== getDemoSource('vue', name)) errors.push(`vue:${name}: generated docs preview source is stale`);
		}
		return;
	}
	const previewMap = loadPreviewMap(framework);
	if (!previewMap) {
		errors.push(`${framework}: generated preview source map is missing`);
		return;
	}
	for (const name of uiNames) {
		if (previewMap[name]?.raw !== getDemoSource(framework, name)) errors.push(`${framework}:${name}: generated preview source is stale`);
	}
}

const manifests = Object.fromEntries(await Promise.all(FRAMEWORKS.map(async (framework) => [framework, await loadManifest(framework)])));
const uiByFramework = Object.fromEntries(FRAMEWORKS.map((framework) => [framework, manifests[framework].items.filter((item) => item.type === 'registry:ui')]));
const canonicalNames = uiByFramework.react.map((item) => item.name);

if (canonicalNames.length !== 62) errors.push(`canonical UI manifest: expected 62 items, received ${canonicalNames.length}`);
if (!unique(canonicalNames)) errors.push('react: duplicate UI manifest names');
for (const framework of FRAMEWORKS) {
	const manifest = manifests[framework];
	const uiItems = uiByFramework[framework];
	const uiNames = uiItems.map((item) => item.name);
	const helperNames = manifest.items.filter((item) => item.type !== 'registry:ui').map((item) => item.name);
	if (!unique(manifest.items.map((item) => item.name))) errors.push(`${framework}: duplicate source manifest names`);
	if (manifest.items.length !== EXPECTED_TOTALS[framework])
		errors.push(`${framework}: expected ${EXPECTED_TOTALS[framework]} source manifest items, received ${manifest.items.length}`);
	if (uiItems.length !== 62) errors.push(`${framework}: expected 62 UI source items, received ${uiItems.length}`);
	assertSet(`${framework}: canonical UI set`, canonicalNames, uiNames);
	assertSet(`${framework}: helper item set`, EXCEPTIONS[framework].helperItems, helperNames);

	const publicIndexPath = `apps/${framework}/public/r/registry.json`;
	if (!exists(publicIndexPath)) {
		errors.push(`${framework}: public registry index is missing`);
		continue;
	}
	const publicRegistry = json(publicIndexPath);
	assertSet(
		`${framework}: public registry item set`,
		manifest.items.map((item) => item.name),
		publicRegistry.items.map((item) => item.name),
	);
	if (publicRegistry.items.length !== EXPECTED_TOTALS[framework])
		errors.push(`${framework}: expected ${EXPECTED_TOTALS[framework]} public registry items, received ${publicRegistry.items.length}`);
	for (const sourceItem of manifest.items) {
		const publicItem = publicRegistry.items.find((item) => item.name === sourceItem.name);
		if (!publicItem) continue;
		assertItem(`${framework}:${sourceItem.name}: registry index`, sourceItem, publicItem);
		const itemPath = `apps/${framework}/public/r/${sourceItem.name}.json`;
		if (!exists(itemPath)) errors.push(`${framework}:${sourceItem.name}: public per-item JSON is missing`);
		else assertItem(`${framework}:${sourceItem.name}: per-item JSON`, sourceItem, json(itemPath), false);
	}

	assertPackageExports(framework, uiNames);
	assertSourceDependencies(framework, uiItems);
	const extras = assertDocsAndDemos(framework, uiItems);
	await assertPreviews(framework, uiNames);
	rows.push({
		framework,
		source: manifest.items.length,
		public: publicRegistry.items.length,
		ui: uiItems.length,
		docs: listFiles(`apps/${framework}/content/docs/components`, '.mdx').length - 1,
		demos: uiNames.length,
		extras,
	});
}

assertSet('core component directories', canonicalNames, listDirs('packages/core/src/components'));
assertSet(
	'core component barrel',
	canonicalNames,
	exportPaths('packages/core/src/components/index.ts').map((value) => value.replace('./', '')),
);
assertSet('shared SCSS modules', canonicalNames, listFiles('packages/styles/scss/components', '.module.scss'));

console.log('Framework | Source | Public | UI | Docs | Demos | Extras (hooks/examples/primitives)');
console.log('----------|--------|--------|----|------|-------|----------------------------------');
for (const row of rows) {
	const extras = [row.extras.hooks.join(',') || '-', row.extras.examples.join(',') || '-', row.extras.primitives.join(',') || '-'].join(' / ');
	console.log(
		`${row.framework.padEnd(9)} | ${String(row.source).padStart(6)} | ${String(row.public).padStart(6)} | ${String(row.ui).padStart(2)} | ${String(row.docs).padStart(4)} | ${String(row.demos).padStart(5)} | ${extras}`,
	);
}
console.log(
	'\nExceptions: Solid omits asChild parity; helper names/subpaths and portal policy follow the explicit framework allowlist; event/emit models are not compared by raw prop name.',
);

if (errors.length) {
	console.error(`\nParity check failed with ${errors.length} mismatch${errors.length === 1 ? '' : 'es'}:`);
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}

console.log('\nParity check passed.');
