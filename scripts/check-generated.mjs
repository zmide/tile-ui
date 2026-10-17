#!/usr/bin/env node

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const disposableRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tile-generated-'));
const copyRoot = path.join(disposableRoot, 'tile-ui');
const startedAt = performance.now();
const sourceDateEpoch = '1787961600';
const managedPaths = [
	'apps/react/lib/preview-code.ts',
	'apps/react/public/r',
	'apps/react/public/og.png',
	'apps/vue/.generated/docs.json',
	'apps/vue/public/r',
	'apps/vue/public/robots.txt',
	'apps/vue/public/sitemap.xml',
	'apps/vue/public/favicon.svg',
	'apps/vue/public/og.png',
	'apps/solid/content/docs/components',
	'apps/solid/src/generated/docs.ts',
	'apps/solid/src/generated/preview-code.ts',
	'apps/solid/src/generated/primitive-preview-code.ts',
	'apps/solid/public/r',
	'apps/solid/public/robots.txt',
	'apps/solid/public/sitemap.xml',
	'apps/solid/public/favicon.svg',
	'apps/solid/public/og.png',
	'packages/styles/css',
	'packages/themes/kumo/dist',
];
const ignoredCopyNames = new Set(['.git', '.agents', '.next', '.nuxt', '.output', '.turbo', 'node_modules']);
const leftoverPattern = /(?:^|\.)(?:bak|backup|candidate|detached|lock|orig|recovery|staging|stale|tmp|transaction)(?:[.-]|$)|~$/i;

function hash(content) {
	return crypto.createHash('sha256').update(content).digest('hex');
}

function snapshotPath(root, relative, result) {
	const target = path.join(root, relative);
	assert.ok(fs.existsSync(target), `Missing managed generated path: ${relative}`);
	const stat = fs.statSync(target);
	if (stat.isFile()) {
		const content = fs.readFileSync(target);
		result.set(relative.split(path.sep).join('/'), { content, hash: hash(content) });
		return;
	}
	for (const entry of fs.readdirSync(target, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
		snapshotPath(root, path.join(relative, entry.name), result);
	}
}

function snapshot(root) {
	const result = new Map();
	for (const relative of managedPaths) snapshotPath(root, relative, result);
	return new Map([...result].sort(([left], [right]) => left.localeCompare(right)));
}

function diffSnapshots(expected, actual) {
	const expectedNames = new Set(expected.keys());
	const actualNames = new Set(actual.keys());
	return {
		added: [...actualNames].filter((name) => !expectedNames.has(name)).sort(),
		removed: [...expectedNames].filter((name) => !actualNames.has(name)).sort(),
		changed: [...expectedNames].filter((name) => actualNames.has(name) && expected.get(name).hash !== actual.get(name).hash).sort(),
	};
}

function assertSnapshotsEqual(expected, actual, message) {
	const drift = diffSnapshots(expected, actual);
	if (drift.added.length === 0 && drift.removed.length === 0 && drift.changed.length === 0) return;
	const lines = [message];
	for (const [kind, names] of Object.entries(drift)) {
		for (const name of names) lines.push(`  ${kind}: ${name}`);
	}
	throw new Error(lines.join('\n'));
}

function run(command, args, options = {}) {
	console.log(`\n> ${[command, ...args].join(' ')}`);
	const result = spawnSync(command, args, {
		cwd: copyRoot,
		env: {
			...process.env,
			TZ: options.timezone ?? 'UTC',
			LANG: 'C.UTF-8',
			LC_ALL: 'C.UTF-8',
			SOURCE_DATE_EPOCH: sourceDateEpoch,
			TURBO_TELEMETRY_DISABLED: '1',
		},
		stdio: 'inherit',
	});
	if (result.error) throw result.error;
	assert.equal(result.status, 0, `Command failed with status ${result.status}: ${command} ${args.join(' ')}`);
}

function runGenerators(timezone) {
	run('corepack', ['pnpm', '--filter', '@tile-ui/react-docs', 'preview-code'], { timezone });
	run('corepack', ['pnpm', '--filter', '@tile-ui/vue-docs', 'docs:build'], { timezone });
	run('corepack', ['pnpm', '--filter', '@tile-ui/solid-docs', 'generate'], { timezone });
	run('corepack', ['pnpm', 'registry:build'], { timezone });
	run('corepack', ['pnpm', '--filter', '@tile-ui/styles', 'build'], { timezone });
	run('corepack', ['pnpm', '--filter', '@tile-ui/theme-kumo', 'build'], { timezone });
}

function linkNodeModules(sourceRoot, targetRoot) {
	for (const entry of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
		if (entry.name === '.git') continue;
		const source = path.join(sourceRoot, entry.name);
		const target = path.join(targetRoot, entry.name);
		if (entry.name === 'node_modules') {
			fs.symlinkSync(source, target, 'dir');
			continue;
		}
		if (entry.isDirectory() && !ignoredCopyNames.has(entry.name)) linkNodeModules(source, target);
	}
}

function assertSorted(values, label) {
	assert.deepEqual(
		values,
		[...values].sort((left, right) => left.localeCompare(right)),
		`${label} must use sorted deterministic ordering.`,
	);
}

function assertOrdering(root) {
	for (const framework of ['react', 'vue', 'solid']) {
		const registryRoot = path.join(root, `apps/${framework}/public/r`);
		const registry = JSON.parse(fs.readFileSync(path.join(registryRoot, 'registry.json'), 'utf8'));
		const names = registry.items.map((item) => item.name);
		assert.equal(new Set(names).size, names.length, `${framework} registry item ordering contains duplicates.`);
		const files = fs
			.readdirSync(registryRoot)
			.filter((name) => name.endsWith('.json'))
			.sort();
		assert.deepEqual(files, ['registry.json', ...names.map((name) => `${name}.json`)].sort(), `${framework} registry files must exactly match its ordered index.`);
	}

	const reactPreview = fs.readFileSync(path.join(root, 'apps/react/lib/preview-code.ts'), 'utf8');
	assertSorted(
		[...reactPreview.matchAll(/^\t'([^']+)': \{$/gm)].map((match) => match[1]),
		'React preview entries',
	);
	for (const relative of ['apps/solid/src/generated/preview-code.ts', 'apps/solid/src/generated/primitive-preview-code.ts']) {
		const source = fs.readFileSync(path.join(root, relative), 'utf8');
		assertSorted(
			[...source.matchAll(/^\t['"]([^'"]+)['"]: \{$/gm)].map((match) => match[1]),
			relative,
		);
	}

	const vueDocs = JSON.parse(fs.readFileSync(path.join(root, 'apps/vue/.generated/docs.json'), 'utf8'));
	const vueComponents = vueDocs.routes
		.filter((route) => /^\/docs\/components\/[^/]+\/$/.test(route))
		.map((route) => vueDocs.payloads[route.slice('/docs/'.length, -1)].doc.title);
	assertSorted(vueComponents, 'Vue component titles');
	const solidSitemap = fs.readFileSync(path.join(root, 'apps/solid/public/sitemap.xml'), 'utf8');
	const solidUrls = [...solidSitemap.matchAll(/<loc>[^<]+(\/docs\/[^<]+)<\/loc>/g)].map((match) => match[1]);
	assertSorted(solidUrls, 'Solid sitemap documentation routes');
}

function assertNoLeftovers(root) {
	const searchRoots = ['apps/react/public', 'apps/vue/public', 'apps/vue/.generated', 'apps/solid/public', 'apps/solid/src/generated', 'packages/styles/css'];
	const leftovers = [];
	const visit = (target) => {
		for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
			const absolute = path.join(target, entry.name);
			if (leftoverPattern.test(entry.name)) leftovers.push(path.relative(root, absolute));
			if (entry.isDirectory()) visit(absolute);
		}
	};
	for (const relative of searchRoots) visit(path.join(root, relative));
	assert.deepEqual(leftovers.sort(), [], `Temporary, lock, or backup artifacts remain:\n${leftovers.join('\n')}`);
}

const workspaceBefore = snapshot(workspaceRoot);

try {
	console.log(`Creating disposable generation workspace at ${copyRoot}`);
	fs.cpSync(workspaceRoot, copyRoot, {
		recursive: true,
		filter(source) {
			if (source === workspaceRoot) return true;
			return !ignoredCopyNames.has(path.basename(source));
		},
	});
	linkNodeModules(workspaceRoot, copyRoot);

	const initial = snapshot(copyRoot);
	run('corepack', ['pnpm', '--filter', '@tile-ui/solid-docs', 'packages:build']);

	console.log('\nGeneration pass 1/3 (UTC)');
	runGenerators('UTC');
	const pass1 = snapshot(copyRoot);
	assertSnapshotsEqual(initial, pass1, 'Checked-in managed generated outputs are stale:');

	console.log('\nGeneration pass 2/3 (UTC)');
	runGenerators('UTC');
	const pass2 = snapshot(copyRoot);
	assertSnapshotsEqual(pass1, pass2, 'Generated outputs changed between identical sequential passes:');

	console.log('\nGeneration pass 3/3 (Pacific/Kiritimati)');
	runGenerators('Pacific/Kiritimati');
	const timezonePass = snapshot(copyRoot);
	assertSnapshotsEqual(pass2, timezonePass, 'Generated outputs depend on the process timezone:');

	assertOrdering(copyRoot);
	assertNoLeftovers(copyRoot);
	run('corepack', ['pnpm', '--filter', '@tile-ui/solid-docs', 'generated:check']);
	run('corepack', ['pnpm', '--filter', '@tile-ui/styles', 'generated:check']);

	const workspaceAfter = snapshot(workspaceRoot);
	assertSnapshotsEqual(workspaceBefore, workspaceAfter, 'Original workspace managed paths drifted during the isolated check:');
	console.log(`\nGenerated determinism gate passed in ${((performance.now() - startedAt) / 1000).toFixed(1)}s (${pass2.size} managed files).`);
} finally {
	fs.rmSync(disposableRoot, { recursive: true, force: true });
}
