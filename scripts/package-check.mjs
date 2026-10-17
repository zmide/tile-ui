import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { constants as fsConstants, statSync } from 'node:fs';
import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const workspaceRoot = path.resolve(import.meta.dirname, '..');
const tempParent = os.tmpdir();
const packageNames = ['core', 'styles', 'theme-kumo', 'react', 'vue', 'solid'];
const frameworkNames = ['react', 'vue', 'solid'];
const timeout = Number(process.env.TILE_PACKAGE_CHECK_TIMEOUT_MS ?? 180_000);
const startedAt = Date.now();
let tempRoot = '';

function log(message) {
	console.log(`[package:check] ${message}`);
}

async function run(command, args, options = {}) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd: options.cwd ?? workspaceRoot,
			env: { ...process.env, CI: '1', ...options.env },
			stdio: ['ignore', 'pipe', 'pipe'],
		});
		let stdout = '';
		let stderr = '';
		const limit = 64 * 1024 * 1024;
		const append = (current, chunk) => {
			const next = current + chunk;
			return next.length > limit ? next.slice(-limit) : next;
		};
		child.stdout.on('data', (chunk) => {
			stdout = append(stdout, chunk);
			if (options.echo) process.stdout.write(chunk);
		});
		child.stderr.on('data', (chunk) => {
			stderr = append(stderr, chunk);
			if (options.echo) process.stderr.write(chunk);
		});
		const timer = setTimeout(() => {
			child.kill('SIGTERM');
			setTimeout(() => child.kill('SIGKILL'), 5000).unref();
		}, options.timeout ?? timeout);
		child.on('error', (error) => {
			clearTimeout(timer);
			reject(new Error(`${command} ${args.join(' ')} failed to start: ${error.message}`, { cause: error }));
		});
		child.on('close', (code, signal) => {
			clearTimeout(timer);
			if (code === 0) resolve({ stdout, stderr });
			else {
				const output = [stdout, stderr].filter(Boolean).join('\n').trim();
				process.stderr.write(`\n${command} ${args.join(' ')} failed (${signal ?? code})${output ? `:\n${output}` : ''}\n`);
				reject(new Error(`${command} ${args.join(' ')} failed (${signal ?? code}):\n${output}`));
			}
		});
	});
}

async function writeJson(filePath, value) {
	await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function collectExportTargets(exports, targets = []) {
	if (typeof exports === 'string') targets.push(exports);
	else if (exports && typeof exports === 'object') for (const value of Object.values(exports)) collectExportTargets(value, targets);
	return targets;
}

function packageDependencyNames(packageJson) {
	return [...Object.keys(packageJson.dependencies ?? {}), ...Object.keys(packageJson.devDependencies ?? {}), ...Object.keys(packageJson.peerDependencies ?? {})];
}

async function packAndInspect(packDir) {
	await run('corepack', ['pnpm', '--filter', '@tile-ui/core', 'build'], { timeout: 300_000 });
	await run('corepack', ['pnpm', '--filter', '@tile-ui/styles', 'build'], { timeout: 300_000 });
	await run('corepack', ['pnpm', '--filter', '@tile-ui/theme-kumo', 'build']);
	for (const name of ['react', 'vue', 'solid']) await run('corepack', ['pnpm', '--filter', `@tile-ui/${name}`, 'build'], { timeout: 300_000 });

	const tarballs = {};
	for (const name of packageNames) {
		const packageDir = path.join(workspaceRoot, 'packages', name === 'theme-kumo' ? 'themes/kumo' : name);
		const before = new Set(await readdir(packDir));
		await run('corepack', ['pnpm', 'pack', '--pack-destination', packDir], { cwd: packageDir });
		const created = (await readdir(packDir)).filter((entry) => !before.has(entry) && entry.endsWith('.tgz'));
		assert.equal(created.length, 1, `${name} pack must create exactly one tarball`);
		const tarball = path.join(packDir, created[0]);
		tarballs[name] = tarball;

		const { stdout } = await run('tar', ['-tzf', tarball]);
		const entries = stdout.trim().split('\n').filter(Boolean);
		assert(entries.includes('package/package.json'), `${name} tarball is missing package.json`);
		assert(entries.includes('package/README.md'), `${name} tarball is missing README.md`);
		assert(entries.includes('package/README.zh-CN.md'), `${name} tarball is missing README.zh-CN.md`);
		for (const entry of entries) {
			assert(entry.startsWith('package/'), `${name} has an unsafe tar entry: ${entry}`);
			assert(!/(^|\/)(?:src|test|tests|docs|temp|tmp|node_modules)(?:\/|$)/i.test(entry), `${name} includes unwanted path: ${entry}`);
			if (name === 'styles' || name === 'theme-kumo')
				assert(/^package\/(?:package\.json|README(?:\.zh-CN)?\.md|LICENSE|scss\/|css\/|dist\/)/.test(entry), `${name} includes unexpected path: ${entry}`);
			else assert(/^package\/(?:package\.json|README(?:\.zh-CN)?\.md|LICENSE|dist\/)/.test(entry), `${name} includes unexpected path: ${entry}`);
		}

		const extractDir = path.join(packDir, `extract-${name}`);
		await mkdir(extractDir, { recursive: true });
		await run('tar', ['-xzf', tarball, '-C', extractDir]);
		const packedRoot = path.join(extractDir, 'package');
		const packageJson = JSON.parse(await readFile(path.join(packedRoot, 'package.json'), 'utf8'));
		assert(!JSON.stringify(packageJson).includes('workspace:'), `${name} package.json retains a workspace protocol`);
		for (const target of collectExportTargets(packageJson.exports)) {
			assert(target.startsWith('./'), `${name} export target is not package-relative: ${target}`);
			assert(!target.split('/').includes('..'), `${name} export target escapes the package: ${target}`);
			if (!target.includes('*')) await access(path.join(packedRoot, target), fsConstants.R_OK);
		}
	}
	log(`packed and inspected ${packageNames.length} packages`);
	return tarballs;
}

async function createConsumerWorkspace(tarballs) {
	const consumerRoot = path.join(tempRoot, 'consumers');
	await mkdir(consumerRoot, { recursive: true });
	await writeJson(path.join(consumerRoot, 'package.json'), { name: 'tile-ui-package-consumers', private: true, type: 'module', packageManager: 'pnpm@9.15.0' });
	await writeFile(path.join(consumerRoot, 'pnpm-workspace.yaml'), "packages:\n  - 'projects/*'\n");
	const projects = [
		'node',
		'react-vite',
		'vue-vite',
		'solid-vite',
		'solid-ssr',
		'styles',
		'styles-kumo',
		'registry-react',
		'registry-vue',
		'registry-solid',
		...frameworkNames.map((framework) => `registry-${framework}-kumo`),
	];
	for (const project of projects) {
		const projectDir = path.join(consumerRoot, 'projects', project);
		await mkdir(projectDir, { recursive: true });
		await writeJson(path.join(projectDir, 'package.json'), { name: `consumer-${project}`, private: true, type: 'module' });
	}

	const tarballSpecs = Object.fromEntries(packageNames.map((name) => [`@tile-ui/${name}`, `file:${tarballs[name]}`]));
	const dependencies = {
		...tarballSpecs,
		'@radix-ui/react-label': '^2.1.7',
		'@radix-ui/react-slot': '^1.2.3',
		'@types/node': '^25.0.0',
		'@types/react': '19.1.2',
		'@types/react-dom': '19.1.2',
		'@vitejs/plugin-vue-jsx': '^5.1.5',
		react: '19.1.0',
		'react-dom': '19.1.0',
		sass: '^1.86.3',
		'solid-js': '^1.9.15',
		typescript: 'npm:@typescript/typescript6@^6.0.2',
		vite: '^7.3.1',
		'vite-plugin-solid': '^2.11.0',
		vue: '^3.5.0',
	};
	const rootPackage = JSON.parse(await readFile(path.join(consumerRoot, 'package.json'), 'utf8'));
	rootPackage.devDependencies = dependencies;
	rootPackage.pnpm = { overrides: tarballSpecs };
	await writeJson(path.join(consumerRoot, 'package.json'), rootPackage);
	await run('corepack', ['pnpm', 'install', '--no-frozen-lockfile', '--prefer-offline', '--reporter=append-only'], { cwd: consumerRoot, timeout: 600_000, echo: true });
	for (const name of packageNames) {
		const installed = path.join(consumerRoot, 'node_modules', '@tile-ui', name);
		const stat = await (async () => {
			try {
				return await statSync(installed);
			} catch {
				return undefined;
			}
		})();
		assert(stat?.isDirectory(), `consumer install did not provide @tile-ui/${name} from the packed tarball`);
		assert(!stat.isSymbolicLink(), `@tile-ui/${name} resolved to a workspace symlink instead of the tarball`);
		const installedJson = JSON.parse(await readFile(path.join(installed, 'package.json'), 'utf8'));
		assert(!JSON.stringify(installedJson).includes('workspace:'), `installed @tile-ui/${name} retains a workspace protocol`);
	}
	log('installed clean consumer workspace from tarballs');
	return consumerRoot;
}

async function checkNodeConsumers(consumerRoot) {
	const projectDir = path.join(consumerRoot, 'projects/node');
	await writeFile(
		path.join(projectDir, 'scss-loader.mjs'),
		`export async function load(url, context, nextLoad) {
  if (url.endsWith('.scss') || url.endsWith('.css')) return { format: 'module', shortCircuit: true, source: "export default new Proxy({}, { get: (_, key) => String(key) });" };
  return nextLoad(url, context);
}
`,
	);
	await writeFile(
		path.join(projectDir, 'esm.mjs'),
		`import assert from 'node:assert/strict';
import * as core from '@tile-ui/core';
import * as solid from '@tile-ui/solid';
import * as primitives from '@tile-ui/solid/primitives';
assert(Object.keys(core).length > 20);
assert(Object.keys(solid).length > 20);
assert.equal(typeof primitives.createMediaQuery, 'function');
assert(import.meta.resolve('@tile-ui/solid').endsWith('/dist/server.js'));
assert(import.meta.resolve('@tile-ui/solid/primitives').endsWith('/dist/primitives/server.js'));
console.log('node-esm-ok');
`,
	);
	await writeFile(
		path.join(projectDir, 'cjs.cjs'),
		`const assert = require('node:assert/strict');
require.extensions['.scss'] = (module) => { module.exports = new Proxy({}, { get: (_, key) => String(key) }); };
require.extensions['.css'] = require.extensions['.scss'];
for (const name of ['@tile-ui/core', '@tile-ui/react', '@tile-ui/vue']) {
  const value = require(name);
  assert(Object.keys(value).length > 0, name);
  const resolved = require.resolve(name);
  assert.match(resolved, /\\.(?:cjs)$/);
}
console.log('node-cjs-ok');
`,
	);
	await run(process.execPath, ['--conditions=node', '--experimental-loader', './scss-loader.mjs', 'esm.mjs'], { cwd: projectDir, echo: true });
	await run(process.execPath, ['cjs.cjs'], { cwd: projectDir, echo: true });
	log('passed Node ESM/CJS package consumers');
}

async function writeTsConfig(projectDir, framework) {
	await writeFile(
		path.join(projectDir, 'scss.d.ts'),
		"declare module '*.module.scss' { const styles: Record<string, string>; export default styles; }\ndeclare module '*.scss';\ndeclare module '*.css';\n",
	);
	const jsx = framework === 'react' || framework === 'solid' ? 'react-jsx' : 'preserve';
	await writeJson(path.join(projectDir, 'tsconfig.json'), {
		compilerOptions: {
			target: 'ES2020',
			lib: ['ES2022', 'DOM', 'DOM.Iterable'],
			module: 'ESNext',
			moduleResolution: 'Bundler',
			strict: true,
			noEmit: true,
			jsx,
			...(framework === 'solid' ? { jsxImportSource: 'solid-js' } : framework === 'vue' ? { jsxImportSource: 'vue' } : {}),
			esModuleInterop: true,
			skipLibCheck: true,
			allowSyntheticDefaultImports: true,
		},
		include: ['src', 'components', 'lib', 'hooks', 'composables', 'primitives', 'styles', 'scss.d.ts'],
	});
}

async function runConsumerTool(consumerRoot, projectDir, tool, args, options = {}) {
	const binary = tool === 'tsc' ? 'tsc6' : tool;
	return run(path.join(consumerRoot, 'node_modules/.bin', binary), args, { cwd: projectDir, ...options });
}

async function checkVitePackageConsumers(consumerRoot) {
	const fixtures = {
		react: {
			entry: `import React from 'react';
import { renderToString } from 'react-dom/server';
import { Button } from '@tile-ui/react';
import { useMediaQuery } from '@tile-ui/react/hooks';
import '@tile-ui/styles/scss/components/button.module.scss';
import '@tile-ui/styles/css/theme.css';
export const html = renderToString(React.createElement(Button, null, 'package-react'));
export { useMediaQuery };
`,
			config: `import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { defineConfig } from 'vite'; const scssRoot = path.dirname(fileURLToPath(import.meta.resolve('@tile-ui/styles/tokens.scss'))); export default defineConfig({ css: { preprocessorOptions: { scss: { loadPaths: [scssRoot] } } }, build: { lib: { entry: 'src/main.tsx', formats: ['es'] } } });\n`,
			ext: 'tsx',
		},
		vue: {
			entry: `import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { Button } from '@tile-ui/vue';
import { useMediaQuery } from '@tile-ui/vue/composables';
export async function render() { return renderToString(createSSRApp({ render: () => h(Button, null, () => 'package-vue') })); }
export { useMediaQuery };
`,
			config: `import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { defineConfig } from 'vite'; import vueJsx from '@vitejs/plugin-vue-jsx'; const scssRoot = path.dirname(fileURLToPath(import.meta.resolve('@tile-ui/styles/tokens.scss'))); export default defineConfig({ plugins: [vueJsx()], css: { preprocessorOptions: { scss: { loadPaths: [scssRoot] } } }, build: { lib: { entry: 'src/main.tsx', formats: ['es'] } } });\n`,
			ext: 'tsx',
		},
		solid: {
			entry: `import { Button } from '@tile-ui/solid'; import { createMediaQuery } from '@tile-ui/solid/primitives'; export { Button, createMediaQuery };\n`,
			config: `import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { defineConfig } from 'vite'; import solid from 'vite-plugin-solid'; const scssRoot = path.dirname(fileURLToPath(import.meta.resolve('@tile-ui/styles/tokens.scss'))); export default defineConfig({ plugins: [solid()], resolve: { conditions: ['browser'] }, css: { preprocessorOptions: { scss: { loadPaths: [scssRoot] } } }, build: { lib: { entry: 'src/main.tsx', formats: ['es'] } } });\n`,
			ext: 'tsx',
		},
	};
	for (const [framework, fixture] of Object.entries(fixtures)) {
		const projectDir = path.join(consumerRoot, `projects/${framework}-vite`);
		await mkdir(path.join(projectDir, 'src'), { recursive: true });
		await writeFile(path.join(projectDir, `src/main.${fixture.ext}`), fixture.entry);
		await writeFile(path.join(projectDir, 'vite.config.mjs'), fixture.config);
		await writeTsConfig(projectDir, framework);
		await runConsumerTool(consumerRoot, projectDir, 'tsc', ['--noEmit', '-p', 'tsconfig.json']);
		await runConsumerTool(consumerRoot, projectDir, 'vite', ['build']);
	}
	log('passed React/Vue/Solid Vite package consumers');
}

async function checkSolidSsrConsumer(consumerRoot) {
	const projectDir = path.join(consumerRoot, 'projects/solid-ssr');
	await mkdir(path.join(projectDir, 'src'), { recursive: true });
	await writeFile(
		path.join(projectDir, 'src/main.tsx'),
		`import { renderToString } from 'solid-js/web'; import { Button } from '@tile-ui/solid'; export function render() { return renderToString(() => <Button>solid-ssr</Button>); }\n`,
	);
	await writeFile(
		path.join(projectDir, 'vite.config.mjs'),
		`import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { defineConfig } from 'vite'; import solid from 'vite-plugin-solid'; const scssRoot = path.dirname(fileURLToPath(import.meta.resolve('@tile-ui/styles/tokens.scss'))); export default defineConfig({ plugins: [solid({ ssr: true })], resolve: { conditions: ['node'] }, css: { preprocessorOptions: { scss: { loadPaths: [scssRoot] } } }, ssr: { noExternal: true, resolve: { conditions: ['node'] } }, build: { ssr: 'src/main.tsx', rollupOptions: { output: { entryFileNames: 'server.mjs' } } } });\n`,
	);
	await writeTsConfig(projectDir, 'solid');
	await runConsumerTool(consumerRoot, projectDir, 'tsc', ['--noEmit', '-p', 'tsconfig.json']);
	await runConsumerTool(consumerRoot, projectDir, 'vite', ['build']);
	const module = await import(`${pathToFileURL(path.join(projectDir, 'dist/server.mjs')).href}?${Date.now()}`);
	assert.match(module.render(), /solid-ssr/);
	log('passed Solid SSR browser/node condition consumer');
}

async function checkStyleExports(consumerRoot) {
	const projectDir = path.join(consumerRoot, 'projects/styles');
	await writeFile(
		path.join(projectDir, 'check.mjs'),
		`import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import * as sass from 'sass';
const require = createRequire(import.meta.url);
const scssRoot = new URL('.', import.meta.resolve('@tile-ui/styles/tokens.scss'));
for (const specifier of ['@tile-ui/styles/tokens.scss', '@tile-ui/styles/theme.scss', '@tile-ui/styles/reset.scss', '@tile-ui/styles/globals.scss', '@tile-ui/styles/scss/components/button.module.scss', '@tile-ui/styles/scss/variables/colors']) {
  const result = sass.compileString(\`@use 'pkg:\${specifier}';\`, { importers: [new sass.NodePackageImporter()], loadPaths: [scssRoot.pathname] });
  assert.equal(typeof result.css, 'string');
}
for (const specifier of ['@tile-ui/styles/tokens.css', '@tile-ui/styles/theme.css', '@tile-ui/styles/reset.css', '@tile-ui/styles/globals.css', '@tile-ui/styles/css/components/button.css']) {
  const file = require.resolve(specifier);
  assert((await readFile(file, 'utf8')).length > 0, specifier);
}
console.log('styles-ok');
`,
	);
	await run(process.execPath, ['check.mjs'], { cwd: projectDir });
	log('passed representative Sass/CSS named and wildcard exports');
}

async function checkKumoStyleExports(consumerRoot) {
	const projectDir = path.join(consumerRoot, 'projects/styles-kumo');
	await writeFile(
		path.join(projectDir, 'check.mjs'),
		`import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import * as sass from 'sass';
const require = createRequire(import.meta.url);
const css = await readFile(require.resolve('@tile-ui/theme-kumo/theme.css'), 'utf8');
assert(css.length > 0);
require.resolve('@tile-ui/theme-kumo/theme.scss');
const result = sass.compileString("@use 'pkg:@tile-ui/theme-kumo/theme.scss';", { importers: [new sass.NodePackageImporter()] });
for (const output of [css, result.css]) {
  assert.match(output, /--background\\s*:/);
  assert.match(output, /--tile-[\\w-]+\\s*:/);
  assert.match(output, /\\.light/);
  assert.match(output, /\\.dark/);
  assert.match(output, /\\[data-theme=['"]?light['"]?\\]/);
  assert.match(output, /\\[data-theme=['"]?dark['"]?\\]/);
  assert.doesNotMatch(output, /@(?:import|font-face)\\b/);
  assert.doesNotMatch(output, /(?:^|[;{])\\s*(?:box-sizing\\s*:|margin\\s*:\\s*0)/m);
}
console.log('styles-kumo-ok');
`,
	);
	await run(process.execPath, ['check.mjs'], { cwd: projectDir });
	await mkdir(path.join(projectDir, 'src'), { recursive: true });
	await writeFile(
		path.join(projectDir, 'vite.config.mjs'),
		"import { defineConfig } from 'vite'; export default defineConfig({ build: { lib: { entry: 'src/main.js', formats: ['es'] } } });\n",
	);
	for (const extension of ['css', 'scss']) {
		await writeFile(path.join(projectDir, 'src/main.js'), `import '@tile-ui/theme-kumo/theme.${extension}';\nexport const theme = 'kumo';\n`);
		await runConsumerTool(consumerRoot, projectDir, 'vite', ['build']);
	}
	log('passed isolated Kumo CSS/Sass exports and clean Vite consumers');
}

function localRegistryName(dependency) {
	return dependency.startsWith('@tile-ui/') ? dependency.slice('@tile-ui/'.length) : undefined;
}

function relativeImports(content) {
	return [...content.matchAll(/(?:from\s+|import\s*)(['"])(\.[^'"]+)\1/g)].map((match) => match[2]);
}

function resolveTarget(fromTarget, specifier, targets) {
	const base = path.posix.normalize(path.posix.join(path.posix.dirname(fromTarget), specifier));
	for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}.scss`, `${base}.module.scss`, `${base}/index.ts`, `${base}/index.tsx`])
		if (targets.has(candidate)) return candidate;
	return undefined;
}

async function loadRegistry(framework) {
	const registryDir = path.join(workspaceRoot, `apps/${framework}/public/r`);
	const index = JSON.parse(await readFile(path.join(registryDir, 'registry.json'), 'utf8'));
	const items = new Map();
	for (const summary of index.items) items.set(summary.name, JSON.parse(await readFile(path.join(registryDir, `${summary.name}.json`), 'utf8')));
	return items;
}

function registryClosure(items, selected) {
	const closure = new Set();
	const pending = [...selected];
	while (pending.length > 0) {
		const name = pending.shift();
		if (closure.has(name)) continue;
		const item = items.get(name);
		assert(item, `registry dependency ${name} does not exist`);
		closure.add(name);
		for (const dependency of item.registryDependencies ?? []) {
			const local = localRegistryName(dependency);
			if (local) pending.push(local);
		}
	}
	return closure;
}

async function materializeRegistry(framework, consumerRoot, selectedItems) {
	const projectDir = path.join(consumerRoot, `projects/registry-${framework}${selectedItems ? '-kumo' : ''}`);
	const items = await loadRegistry(framework);
	const uiNames = [...items.values()].filter((item) => item.type === 'registry:ui').map((item) => item.name);
	assert.equal(uiNames.length, 62, `${framework} must expose 62 UI registry items`);
	const allNames = [...items.keys()];
	assert.equal(registryClosure(items, allNames).size, items.size, `${framework} all-item closure is incomplete`);
	const closure = registryClosure(items, selectedItems ?? allNames.filter((name) => name !== 'theme-kumo'));

	const targets = new Map();
	for (const name of closure) {
		const item = items.get(name);
		for (const file of item.files ?? []) {
			assert.equal(typeof file.target, 'string', `${framework}:${name} has no generated target`);
			const target = file.target.replaceAll('\\', '/');
			assert(!path.posix.isAbsolute(target) && target !== '..' && !target.startsWith('../') && !target.includes('/../'), `${framework}:${name} has unsafe target ${target}`);
			assert(
				!/@tile-ui\/(?:core|styles|react|vue|solid|buildx)\b|workspace:|(?:from\s+|import\s*)['"](?:@\/|~\/)/.test(file.content),
				`${framework}:${name}:${target} retains a workspace import`,
			);
			const previous = targets.get(target);
			assert(!previous || previous.content === file.content, `${framework}:${target} has conflicting generated owners`);
			targets.set(target, { owner: name, content: file.content });
		}
	}
	for (const [target, file] of targets) {
		for (const specifier of relativeImports(file.content))
			assert(resolveTarget(target, specifier, targets), `${framework}:${file.owner}:${target} has unresolved import ${specifier}`);
		const output = path.resolve(projectDir, target);
		assert(output.startsWith(`${path.resolve(projectDir)}${path.sep}`), `${framework}:${target} escapes its consumer`);
		await mkdir(path.dirname(output), { recursive: true });
		await writeFile(output, file.content);
	}
	await writeTsConfig(projectDir, framework);
	return { projectDir, items, uiNames, targets };
}

async function checkKumoRegistry(framework, consumerRoot) {
	const { projectDir, items, targets } = await materializeRegistry(framework, consumerRoot, ['theme-kumo']);
	const theme = items.get('theme-kumo');
	assert.equal(theme.type, 'registry:theme');
	assert.deepEqual(theme.registryDependencies, ['@tile-ui/styles']);
	for (const property of ['cssVars', 'css', 'tailwind', 'extends', 'theme', 'style', 'baseColor'])
		assert.equal(theme[property], undefined, `${framework}:theme-kumo must not mutate the host theme through ${property}`);
	assert.deepEqual(theme.files.map((file) => file.target).sort(), [
		'styles/themes/LICENSE.kumo',
		'styles/themes/_dark.scss',
		'styles/themes/_light.scss',
		'styles/themes/_shared.scss',
		'styles/themes/kumo.scss',
	]);
	const license = targets.get('styles/themes/LICENSE.kumo')?.content ?? '';
	assert.match(license, /Cloudflare/);
	assert.match(license, /Permission is hereby granted, free of charge/);
	assert.match(license, /THE SOFTWARE IS PROVIDED "AS IS"/);
	const entry = targets.get('styles/themes/kumo.scss')?.content ?? '';
	assert.match(entry, /@use ['"]\.\/light['"]/);
	assert.match(entry, /@use ['"]\.\/dark['"]/);
	assert.doesNotMatch(entry, /@tile-ui|tokens|generated/);
	await writeFile(
		path.join(projectDir, 'sass-check.mjs'),
		`import assert from 'node:assert/strict'; import * as sass from 'sass';
const css = sass.compile('styles/themes/kumo.scss').css;
assert.match(css, /--background\\s*:/);
assert.match(css, /\\.dark/);
assert.doesNotMatch(css, /(?:^|[;{])\\s*(?:box-sizing\\s*:|margin\\s*:\\s*0)|@font-face/m);
console.log('registry-kumo-ok');\n`,
	);
	await run(process.execPath, ['sass-check.mjs'], { cwd: projectDir });
	log(`compiled isolated ${framework} Kumo registry install without workspace Sass paths`);
}

async function checkRegistryFramework(framework, consumerRoot) {
	const { projectDir, items, uiNames } = await materializeRegistry(framework, consumerRoot);
	const extension = framework === 'solid' ? 'tsx' : framework === 'react' ? 'tsx' : 'tsx';
	const importLines = uiNames.map((name, index) => `export * as ui${index} from './components/ui/${name}/${name}';`);
	const nonUiTargets = [...items.values()]
		.filter((item) => item.type !== 'registry:ui')
		.flatMap((item) => item.files ?? [])
		.filter((file) => /\.(?:ts|tsx)$/.test(file.target ?? ''))
		.map((file, index) => `export * as helper${index} from './${file.target.replace(/\.(?:ts|tsx)$/, '')}';`);
	await writeFile(path.join(projectDir, `entry.${extension}`), `${[...importLines, ...nonUiTargets].join('\n')}\n`);
	const plugin = framework === 'solid' ? "import solid from 'vite-plugin-solid';" : framework === 'vue' ? "import vueJsx from '@vitejs/plugin-vue-jsx';" : '';
	const plugins = framework === 'solid' ? 'plugins: [solid()],' : framework === 'vue' ? 'plugins: [vueJsx()],' : '';
	await writeFile(
		path.join(projectDir, 'vite.config.mjs'),
		`import { defineConfig } from 'vite'; ${plugin} export default defineConfig({ ${plugins} logLevel: 'error', build: { lib: { entry: 'entry.${extension}', formats: ['es'] } } });\n`,
	);
	await runConsumerTool(consumerRoot, projectDir, 'tsc', ['--noEmit', '-p', 'tsconfig.json'], { timeout: 420_000 });
	await runConsumerTool(consumerRoot, projectDir, 'vite', ['build'], { timeout: 420_000 });
	const sassProbe = [...items.values()]
		.filter((item) => item.name !== 'theme-kumo')
		.flatMap((item) => item.files ?? [])
		.filter((file) => file.target?.endsWith('.scss'))
		.map((file) => file.target);
	await writeFile(
		path.join(projectDir, 'sass-check.mjs'),
		`import * as sass from 'sass'; import { pathToFileURL } from 'node:url'; const files = ${JSON.stringify(sassProbe)}; for (const file of files) sass.compile(file, { url: pathToFileURL(file) }); console.log(files.length);\n`,
	);
	await run(process.execPath, ['sass-check.mjs'], { cwd: projectDir, timeout: 300_000 });
	log(`compiled ${framework} registry: ${uiNames.length} UI, ${items.size - uiNames.length} helper/lib/style items`);
	return uiNames.length;
}

const shardTimeout = Number(process.env.TILE_PACKAGE_CHECK_SHARD_TIMEOUT_MS ?? 900_000);
const shardConcurrency = Number(process.env.TILE_PACKAGE_CHECK_SHARD_CONCURRENCY ?? 2);

async function withTimeout(promise, ms, label) {
	let timer;
	const timeout = new Promise((_, reject) => {
		timer = setTimeout(() => reject(new Error(`${label} exceeded ${Math.round(ms / 1000)}s shard timeout`)), ms);
	});
	try {
		return await Promise.race([promise, timeout]);
	} finally {
		clearTimeout(timer);
	}
}

async function runShards(shards) {
	const results = new Array(shards.length);
	let next = 0;
	const workers = Array.from({ length: Math.min(shardConcurrency, shards.length) }, async () => {
		while (next < shards.length) {
			const index = next++;
			results[index] = await withTimeout(shards[index](), shardTimeout, `registry shard ${index + 1}/${shards.length}`);
		}
	});
	await Promise.all(workers);
	return results;
}

try {
	await mkdir(tempParent, { recursive: true });
	tempRoot = await mkdtemp(path.join(tempParent, 'tile-ui-package-check-'));
	log(`temporary root: ${tempRoot}`);
	const packDir = path.join(tempRoot, 'packs');
	await mkdir(packDir, { recursive: true });
	const tarballs = await packAndInspect(packDir);
	const consumerRoot = await createConsumerWorkspace(tarballs);
	await checkNodeConsumers(consumerRoot);
	await checkVitePackageConsumers(consumerRoot);
	await checkSolidSsrConsumer(consumerRoot);
	await checkStyleExports(consumerRoot);
	await checkKumoStyleExports(consumerRoot);
	const uiCounts = await runShards(frameworkNames.map((framework) => () => checkRegistryFramework(framework, consumerRoot)));
	const uiTotal = uiCounts.reduce((sum, count) => sum + count, 0);
	assert.equal(uiTotal, 186, 'registry gate must compile all 186 UI items');
	for (const framework of frameworkNames) await checkKumoRegistry(framework, consumerRoot);
	log(`PASS: ${packageNames.length} packages, 186 UI registry items, runtime ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
} finally {
	if (tempRoot) {
		await rm(tempRoot, { recursive: true, force: true });
		log('temporary consumers cleaned');
	}
}
