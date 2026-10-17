import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { beforeEach, afterEach, expect } from 'vitest';

import { buildRegistry } from '../../src/registry/build-registry';
import { createReactRegistryConfig } from '../../src/registry/presets/react';
import { createSolidRegistryConfig } from '../../src/registry/presets/solid';
import { createVueRegistryConfig } from '../../src/registry/presets/vue';
import { reactRegistryManifest } from '../../../react/src/registry/manifest';
import { solidRegistryManifest } from '../../../solid/src/registry/manifest';
import { vueRegistryManifest } from '../../../vue/src/registry/manifest';

const requireSolid = createRequire(path.resolve(__dirname, '../../../solid/package.json'));
const ts = requireSolid('typescript') as {
	transpileModule: (
		source: string,
		options: { fileName: string; reportDiagnostics: boolean; compilerOptions: { jsx?: number; target: number } },
	) => {
		diagnostics?: unknown[];
	};
};

interface GeneratedRegistryFile {
	target?: string;
	content: string;
}

interface GeneratedRegistryItem {
	name: string;
	registryDependencies?: string[];
	files: GeneratedRegistryFile[];
}

function registryDependencyName(dependency: string): string | undefined {
	return dependency.startsWith('@tile-ui/') ? dependency.slice('@tile-ui/'.length) : undefined;
}

async function readGeneratedItem(outDir: string, name: string): Promise<GeneratedRegistryItem> {
	return JSON.parse(await fs.readFile(path.join(outDir, `${name}.json`), 'utf-8')) as GeneratedRegistryItem;
}

async function resolveInstallClosure(outDir: string, selectedItems: string[]): Promise<Map<string, GeneratedRegistryItem>> {
	const installed = new Map<string, GeneratedRegistryItem>();
	const pending = [...selectedItems];
	while (pending.length > 0) {
		const name = pending.shift()!;
		if (installed.has(name)) continue;
		const item = await readGeneratedItem(outDir, name);
		installed.set(name, item);
		for (const dependency of item.registryDependencies ?? []) {
			const dependencyName = registryDependencyName(dependency);
			if (dependencyName && !installed.has(dependencyName)) pending.push(dependencyName);
		}
	}
	return installed;
}

function relativeModuleSpecifiers(content: string): string[] {
	return [...content.matchAll(/(?:from\s+|import\s*)(['"])(\.[^'"]+)\1/g)].map((match) => match[2]);
}

function resolveGeneratedTarget(fromTarget: string, specifier: string, targets: Map<string, string>): string | undefined {
	const base = path.posix.normalize(path.posix.join(path.posix.dirname(fromTarget), specifier));
	for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}.scss`, `${base}.module.scss`, `${base}/index.ts`, `${base}/index.tsx`]) {
		if (targets.has(candidate)) return candidate;
	}
	return undefined;
}

function dependencyClosure(items: Map<string, GeneratedRegistryItem>, itemName: string): Set<string> {
	const closure = new Set<string>([itemName]);
	const pending = [itemName];
	while (pending.length > 0) {
		const current = items.get(pending.shift()!);
		for (const dependency of current?.registryDependencies ?? []) {
			const name = registryDependencyName(dependency);
			if (name && !closure.has(name)) {
				closure.add(name);
				pending.push(name);
			}
		}
	}
	return closure;
}

async function materializeInstalledItems(outDir: string, projectDir: string, selectedItems: string[]): Promise<Map<string, GeneratedRegistryItem>> {
	const installed = await resolveInstallClosure(outDir, selectedItems);
	const targets = new Map<string, string>();
	for (const [itemName, item] of installed) {
		for (const file of item.files) {
			expect(file.content, itemName).not.toContain('@tile-ui/');
			if (file.target) targets.set(file.target, itemName);
		}
	}

	for (const [itemName, item] of installed) {
		const allowedOwners = dependencyClosure(installed, itemName);
		for (const file of item.files) {
			if (!file.target) continue;
			for (const specifier of relativeModuleSpecifiers(file.content)) {
				const resolvedTarget = resolveGeneratedTarget(file.target, specifier, targets);
				expect(resolvedTarget, `${itemName}:${file.target} has unresolved generated import '${specifier}'`).toBeDefined();
				const owner = resolvedTarget ? targets.get(resolvedTarget) : undefined;
				expect(allowedOwners.has(owner ?? ''), `${itemName}:${file.target} imports '${specifier}' from undeclared registry item '${owner}'`).toBe(true);
			}
			const target = path.join(projectDir, file.target);
			await fs.mkdir(path.dirname(target), { recursive: true });
			await fs.writeFile(target, file.content);
		}
	}
	return installed;
}

async function typeCheckGeneratedSolidProject(projectDir: string): Promise<void> {
	await fs.writeFile(path.join(projectDir, 'scss.d.ts'), "declare module '*.module.scss' { const styles: Record<string, string>; export default styles; }\n");
	const solidRoot = path.dirname(requireSolid.resolve('solid-js/package.json'));
	await fs.writeFile(
		path.join(projectDir, 'tsconfig.json'),
		JSON.stringify({
			compilerOptions: {
				target: 'ES2017',
				lib: ['DOM', 'DOM.Iterable', 'ESNext'],
				strict: true,
				noEmit: true,
				module: 'ESNext',
				moduleResolution: 'Bundler',
				jsx: 'Preserve',
				jsxImportSource: 'solid-js',
				ignoreDeprecations: '6.0',
				baseUrl: '.',
				paths: { 'solid-js': [solidRoot], 'solid-js/*': [`${solidRoot}/*`] },
			},
			include: ['components/**/*.ts', 'components/**/*.tsx', 'primitives/**/*.ts', 'consumer.ts', 'scss.d.ts'],
		}),
	);
	try {
		execFileSync(process.execPath, [requireSolid.resolve('typescript/lib/tsc.js'), '--noEmit', '-p', path.join(projectDir, 'tsconfig.json')], { stdio: 'pipe' });
	} catch (error) {
		const output = error as { stdout?: Buffer; stderr?: Buffer };
		throw new Error([output.stdout?.toString(), output.stderr?.toString()].filter(Boolean).join('\n'));
	}
}

async function buildGeneratedSolidPrimitiveProject(projectDir: string, selectedItems: string[]): Promise<void> {
	const vite = (await import(pathToFileURL(requireSolid.resolve('vite')).href)) as { build: (options: Record<string, unknown>) => Promise<unknown> };
	const entry = path.join(projectDir, 'consumer.ts');
	await fs.writeFile(entry, `${selectedItems.map((name) => `export * from './primitives/${name}';`).join('\n')}\n`);
	const solidRoot = path.dirname(requireSolid.resolve('solid-js/package.json'));
	const shared = {
		root: projectDir,
		logLevel: 'silent',
		resolve: { alias: [{ find: /^solid-js(\/.*)?$/, replacement: `${solidRoot}$1` }] },
	};
	await vite.build({
		...shared,
		resolve: { ...shared.resolve, conditions: ['browser'] },
		build: { outDir: path.join(projectDir, '.vite-browser'), emptyOutDir: true, lib: { entry, formats: ['es'], fileName: () => 'consumer.js' } },
	});
	await vite.build({
		...shared,
		resolve: { ...shared.resolve, conditions: ['node'] },
		ssr: { noExternal: true, resolve: { conditions: ['node'] } },
		build: { ssr: entry, outDir: path.join(projectDir, '.vite-server'), emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'consumer.mjs' } } },
	});
	await import(`${pathToFileURL(path.join(projectDir, '.vite-server/consumer.mjs')).href}?test=${Date.now()}`);
}

async function buildGeneratedSolidProject(projectDir: string, selectedItems: string[]): Promise<void> {
	const sass = (await import(pathToFileURL(requireSolid.resolve('sass')).href)) as { compile: (file: string) => unknown };
	const vite = (await import(pathToFileURL(requireSolid.resolve('vite')).href)) as { build: (options: Record<string, unknown>) => Promise<unknown> };
	const solid = (await import(pathToFileURL(requireSolid.resolve('vite-plugin-solid')).href)).default as (options?: Record<string, unknown>) => unknown;
	// Direction is the existing style-free provider; every other family must compile its module.
	const moduleFiles = selectedItems.filter((name) => name !== 'direction').map((name) => path.join(projectDir, `components/ui/${name}/${name}.module.scss`));
	for (const file of moduleFiles) sass.compile(file);
	const entry = path.join(projectDir, 'entry.tsx');
	await fs.writeFile(entry, `${selectedItems.map((name) => `export * from './components/ui/${name}';`).join('\n')}\n`);
	const solidRoot = path.dirname(requireSolid.resolve('solid-js/package.json'));
	const shared = {
		root: projectDir,
		plugins: [solid()],
		logLevel: 'silent',
		resolve: { alias: [{ find: /^solid-js(\/.*)?$/, replacement: `${solidRoot}$1` }] },
		css: { preprocessorOptions: { scss: {} } },
	};
	await vite.build({
		...shared,
		resolve: { ...shared.resolve, conditions: ['browser'] },
		build: { outDir: path.join(projectDir, '.vite-browser'), emptyOutDir: true, lib: { entry, formats: ['es'], fileName: () => 'consumer.js', cssFileName: 'consumer' } },
	});
	await vite.build({
		...shared,
		resolve: { ...shared.resolve, conditions: ['node'] },
		ssr: { noExternal: true, resolve: { conditions: ['node'] } },
		build: { ssr: entry, outDir: path.join(projectDir, '.vite-server'), emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'consumer.mjs' } } },
	});
}

function expectRegistrySafeCssVars(item: { cssVars?: { light?: Record<string, string>; dark?: Record<string, string>; theme?: Record<string, string> } }) {
	const names = Object.values(item.cssVars ?? {}).flatMap((variables) => Object.keys(variables ?? {}));
	expect(names.length).toBeGreaterThan(0);
	expect(names.every((name) => name.startsWith('tile-'))).toBe(true);
}

function expectScopedDerivedTokens(styles: string, defaultTheme: { cssVars: { light: Record<string, string> } }) {
	const stylesItem = JSON.parse(styles) as { cssVars: { light: Record<string, string> }; files: Array<{ target: string; content: string }> };
	const aliases = stylesItem.files.find((file) => file.target === 'styles/variables/_colors.scss')?.content;

	expect(stylesItem.cssVars.light).not.toHaveProperty('tile-primary-hover');
	expect(defaultTheme.cssVars.light).not.toHaveProperty('tile-primary-hover');
	expect(aliases).toContain('var(--tile-primary-hover, color-mix(in srgb, var(--primary) 90%, var(--background)))');
	expect(aliases).toContain('var(--tile-radius-sm, max(0px, calc(var(--radius) - 0.25rem)))');
}

let tempDir = '';

beforeEach(async () => {
	tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tile-ui-buildx-'));
});

afterEach(async () => {
	if (tempDir) {
		await fs.rm(tempDir, { recursive: true, force: true });
	}
});

describe('buildRegistry', () => {
	it('builds and type-checks real Batch 2 Solid registry components with complete core closure', async () => {
		const workspaceRoot = path.resolve(__dirname, '../../../..');
		const outDir = path.join(tempDir, 'batch2-registry');
		const slugs = ['label', 'form', 'toggle-group', 'slider', 'input-otp', 'native-select', 'checkbox', 'radio-group', 'switch'];
		const selectedSlugs = ['form', 'toggle-group', 'slider', 'input-otp', 'native-select', 'checkbox', 'radio-group', 'switch'];
		const manifest = {
			name: 'foundation-fixture',
			homepage: 'https://example.com',
			items: [
				{
					name: 'core',
					type: 'registry:lib' as const,
					title: 'Core',
					description: 'Core',
					registryDependencies: ['@tile-ui/utils'],
					files: [{ source: '__virtual__/shared/core.ts', type: 'registry:lib' as const, transform: 'copy' as const, target: 'components/ui/lib/core.ts' }],
				},
				{
					name: 'utils',
					type: 'registry:lib' as const,
					title: 'Utils',
					description: 'Utils',
					files: [{ source: '__virtual__/shared/utils.ts', type: 'registry:lib' as const, transform: 'copy' as const, target: 'components/ui/lib/utils.ts' }],
				},
				{
					name: 'styles',
					type: 'registry:style' as const,
					title: 'Styles',
					description: 'Styles',
					files: [
						{
							source: 'packages/styles/scss/variables/_colors.scss',
							type: 'registry:file' as const,
							transform: 'style' as const,
							target: 'styles/variables/_colors.scss',
						},
						{
							source: 'packages/styles/scss/mixins/_utils.scss',
							type: 'registry:file' as const,
							transform: 'style' as const,
							target: 'styles/mixins/_utils.scss',
						},
					],
				},
				...slugs.map((name) => ({
					name,
					type: 'registry:ui' as const,
					title: name,
					description: name,
					dependencies: ['solid-js'],
					registryDependencies: ['@tile-ui/core', '@tile-ui/utils', '@tile-ui/styles', ...(name === 'form' ? ['@tile-ui/label'] : [])],
					files: [
						{ source: `packages/solid/src/components/${name}/${name}.tsx`, type: 'registry:ui' as const, transform: 'solid-component' as const },
						{ source: `packages/solid/src/components/${name}/index.ts`, type: 'registry:ui' as const, transform: 'solid-barrel' as const },
						{
							source: `packages/styles/scss/components/${name}.module.scss`,
							type: 'registry:file' as const,
							transform: 'style' as const,
							target: `components/ui/${name}/${name}.module.scss`,
						},
					],
				})),
			],
		};
		await buildRegistry({ manifest, ...createSolidRegistryConfig({ workspaceRoot, outDir }) });
		const coreItem = JSON.parse(await fs.readFile(path.join(outDir, 'core.json'), 'utf-8')) as { files: Array<{ content: string }> };
		const core = coreItem.files[0]?.content ?? '';
		expect(core).toContain('export class FormStore');
		expect(core).toContain('export type ToggleVariant');
		expect(core).toContain('export function getToggleStyleKeys');
		expect(core).toContain("export type RadioGroupOrientation = 'horizontal' | 'vertical'");
		expect(core).toContain('export interface ToggleGroupItemBaseProps');
		expect(core).not.toMatch(/^\s*(?:import|from)\b.*(?:form\.types|toggle\.types)/m);
		expect(core).not.toContain("from './form.types'");
		expect(core).not.toContain("from '../toggle/toggle.types'");

		const formProjectDir = path.join(tempDir, 'form-consumer');
		await fs.mkdir(formProjectDir, { recursive: true });
		const formInstall = await materializeInstalledItems(outDir, formProjectDir, ['form']);
		expect([...formInstall.keys()].sort()).toEqual(['core', 'form', 'label', 'styles', 'utils']);
		await typeCheckGeneratedSolidProject(formProjectDir);

		const projectDir = path.join(tempDir, 'batch2-consumer');
		await fs.mkdir(projectDir, { recursive: true });
		const installed = await materializeInstalledItems(outDir, projectDir, selectedSlugs);
		expect(installed.has('label')).toBe(true);
		await typeCheckGeneratedSolidProject(projectDir);
	}, 30_000);

	it('keeps the published generation unchanged when staging aborts', async () => {
		const outDir = path.join(tempDir, 'transaction-abort');
		const sourcePath = path.join(tempDir, 'source.ts');
		const controller = new AbortController();
		await fs.mkdir(outDir, { recursive: true });
		await fs.writeFile(path.join(outDir, 'registry.json'), 'published-registry\n');
		await fs.writeFile(path.join(outDir, 'source.json'), 'published-source\n');
		await fs.writeFile(sourcePath, 'export const value = true;\n');

		await expect(
			buildRegistry({
				framework: 'solid',
				workspaceRoot: tempDir,
				outDir,
				signal: controller.signal,
				manifest: {
					name: 'transaction',
					homepage: 'https://example.com',
					items: [
						{
							name: 'source',
							type: 'registry:lib',
							title: 'Source',
							description: 'New source',
							files: [{ source: 'source.ts', type: 'registry:lib', transform: 'copy' }],
						},
					],
				},
				transforms: { file: async ({ content }) => ({ content, target: 'source.ts' }) },
				hooks: {
					onStagedFile: () => controller.abort(new DOMException('Stop staged generation.', 'AbortError')),
				},
			}),
		).rejects.toMatchObject({ name: 'AbortError' });

		expect(await fs.readFile(path.join(outDir, 'registry.json'), 'utf-8')).toBe('published-registry\n');
		expect(await fs.readFile(path.join(outDir, 'source.json'), 'utf-8')).toBe('published-source\n');
		expect((await fs.readdir(tempDir)).filter((entry) => entry.includes('.transaction-abort.staging-') || entry.includes('.transaction-abort.backup-'))).toEqual([]);
	});

	it('keeps the published generation unchanged when staging fails after a write', async () => {
		const outDir = path.join(tempDir, 'transaction-failure');
		const sourcePath = path.join(tempDir, 'source.ts');
		await fs.mkdir(outDir, { recursive: true });
		await fs.writeFile(path.join(outDir, 'registry.json'), 'published-registry\n');
		await fs.writeFile(sourcePath, 'export const value = true;\n');

		await expect(
			buildRegistry({
				framework: 'solid',
				workspaceRoot: tempDir,
				outDir,
				manifest: {
					name: 'transaction',
					homepage: 'https://example.com',
					items: [
						{
							name: 'source',
							type: 'registry:lib',
							title: 'Source',
							description: 'New source',
							files: [{ source: 'source.ts', type: 'registry:lib', transform: 'copy' }],
						},
					],
				},
				transforms: { file: async ({ content }) => ({ content, target: 'source.ts' }) },
				hooks: {
					onStagedFile: () => {
						throw new Error('staging failed');
					},
				},
			}),
		).rejects.toThrow('staging failed');

		expect(await fs.readFile(path.join(outDir, 'registry.json'), 'utf-8')).toBe('published-registry\n');
		expect((await fs.readdir(tempDir)).filter((entry) => entry.includes('.transaction-failure.staging-') || entry.includes('.transaction-failure.backup-'))).toEqual([]);
	});

	it('builds react button registry output', async () => {
		const outDir = path.join(tempDir, 'react');
		await buildRegistry({
			manifest: reactRegistryManifest,
			...createReactRegistryConfig({
				workspaceRoot: path.resolve(__dirname, '../../../..'),
				outDir,
			}),
		});

		const content = await fs.readFile(path.join(outDir, 'button.json'), 'utf-8');
		const button = JSON.parse(content) as { files: Array<{ content: string }> };
		const core = await fs.readFile(path.join(outDir, 'core.json'), 'utf-8');
		const styles = await fs.readFile(path.join(outDir, 'styles.json'), 'utf-8');
		expect(content).toContain('"name": "button"');
		expect(button.files.every((file) => !file.content.includes('@tile-ui/styles'))).toBe(true);
		expect(button.files.every((file) => !file.content.includes('@tile-ui/core'))).toBe(true);
		expect(content).toContain('"registryDependencies": [');
		expect(content).toContain('"@tile-ui/core"');
		expect(content).toContain('"@tile-ui/utils"');
		expect(content).toContain('"@tile-ui/styles"');
		expect(content).toContain("@use '../../../styles/variables/colors' as *;");
		expect(core).toContain("import { capitalize, formatBytes, generateId } from './utils';");
		expect(styles).toContain('"type": "registry:style"');
		expect(styles).toContain('"cssVars"');
		const stylesItem = JSON.parse(styles) as { cssVars?: { light?: Record<string, string>; dark?: Record<string, string>; theme?: Record<string, string> } };
		expectRegistrySafeCssVars(stylesItem);
		expect(styles).toContain('"target": "styles/tokens.scss"');
		expect(styles).toContain('"target": "styles/theme.scss"');
		expect(styles).toContain('"target": "styles/reset.scss"');
		const defaultTheme = JSON.parse(await fs.readFile(path.join(outDir, 'theme-default.json'), 'utf-8')) as { cssVars: { light: Record<string, string> } };
		expect(defaultTheme.cssVars.light.background).toBe('#ffffff');
		expectScopedDerivedTokens(styles, defaultTheme);
	});

	it('builds expanded react registry items', async () => {
		const outDir = path.join(tempDir, 'react-expanded');
		await buildRegistry({
			manifest: reactRegistryManifest,
			...createReactRegistryConfig({
				workspaceRoot: path.resolve(__dirname, '../../../..'),
				outDir,
			}),
		});

		const registry = await fs.readFile(path.join(outDir, 'registry.json'), 'utf-8');
		expect(registry).toContain('"name": "input"');
		expect(registry).toContain('"name": "textarea"');
		expect(registry).toContain('"name": "label"');
		expect(registry).toContain('"name": "card"');
		expect(registry).toContain('"name": "core"');
		expect(registry).toContain('"name": "styles"');
		expect(registry).toContain('"type": "registry:style"');
		expect(registry).toContain('"cssVars"');
		expect(registry).toContain('"name": "use-copy-to-clipboard"');
		expect(registry).toContain('"name": "use-media-query"');
		expect(registry).toContain('"name": "use-local-storage"');
		const portal = JSON.parse(await fs.readFile(path.join(outDir, 'portal.json'), 'utf-8')) as { files: Array<{ target: string; content: string }> };
		const dialog = JSON.parse(await fs.readFile(path.join(outDir, 'dialog.json'), 'utf-8')) as { registryDependencies: string[]; files: Array<{ content: string }> };
		expect(portal.files.map((file) => file.target)).toEqual(['components/ui/portal/index.ts', 'components/ui/portal/portal.tsx']);
		expect(portal.files[0]?.content).toContain("from './portal'");
		expect(dialog.registryDependencies).toContain('@tile-ui/portal');
		expect(dialog.registryDependencies).not.toContain('portal');
		expect(dialog.files.some((file) => file.content.includes("from '../portal'"))).toBe(true);
	});

	it('builds vue button registry output', async () => {
		const outDir = path.join(tempDir, 'vue');
		await buildRegistry({
			manifest: vueRegistryManifest,
			...createVueRegistryConfig({
				workspaceRoot: path.resolve(__dirname, '../../../..'),
				outDir,
			}),
		});

		const content = await fs.readFile(path.join(outDir, 'button.json'), 'utf-8');
		const button = JSON.parse(content) as { files: Array<{ content: string }> };
		const core = await fs.readFile(path.join(outDir, 'core.json'), 'utf-8');
		const styles = await fs.readFile(path.join(outDir, 'styles.json'), 'utf-8');
		expect(content).toContain('"name": "button"');
		expect(button.files.every((file) => !file.content.includes('@tile-ui/styles'))).toBe(true);
		expect(button.files.every((file) => !file.content.includes('@tile-ui/core'))).toBe(true);
		expect(content).toContain('"registryDependencies": [');
		expect(content).toContain('"@tile-ui/core"');
		expect(content).toContain('"@tile-ui/utils"');
		expect(content).toContain('"@tile-ui/styles"');
		expect(content).toContain("@use '../../../styles/variables/colors' as *;");
		expect(core).toContain("import { capitalize, formatBytes, generateId } from './utils';");
		expect(styles).toContain('"type": "registry:style"');
		expect(styles).toContain('"cssVars"');
		expectRegistrySafeCssVars(JSON.parse(styles));
		const defaultTheme = JSON.parse(await fs.readFile(path.join(outDir, 'theme-default.json'), 'utf-8')) as { cssVars: { light: Record<string, string> } };
		expect(defaultTheme.cssVars.light.background).toBe('#ffffff');
		expectScopedDerivedTokens(styles, defaultTheme);
	});

	it('builds expanded vue registry items', async () => {
		const outDir = path.join(tempDir, 'vue-expanded');
		await buildRegistry({
			manifest: vueRegistryManifest,
			...createVueRegistryConfig({
				workspaceRoot: path.resolve(__dirname, '../../../..'),
				outDir,
			}),
		});

		const registry = await fs.readFile(path.join(outDir, 'registry.json'), 'utf-8');
		expect(registry).toContain('"name": "input"');
		expect(registry).toContain('"name": "textarea"');
		expect(registry).toContain('"name": "label"');
		expect(registry).toContain('"name": "card"');
		expect(registry).toContain('"name": "core"');
		expect(registry).toContain('"name": "styles"');
		expect(registry).toContain('"type": "registry:style"');
		expect(registry).toContain('"cssVars"');
		expect(registry).toContain('"name": "use-copy-to-clipboard"');
		expect(registry).toContain('"name": "use-media-query"');
		expect(registry).toContain('"name": "use-local-storage"');
		const portal = JSON.parse(await fs.readFile(path.join(outDir, 'portal.json'), 'utf-8')) as { files: Array<{ target: string; content: string }> };
		const dialog = JSON.parse(await fs.readFile(path.join(outDir, 'dialog.json'), 'utf-8')) as { registryDependencies: string[]; files: Array<{ content: string }> };
		expect(portal.files.map((file) => file.target)).toEqual(['components/ui/portal/index.ts', 'components/ui/portal/portal.tsx']);
		expect(portal.files[0]?.content).toContain("from './portal'");
		expect(dialog.registryDependencies).toContain('@tile-ui/portal');
		expect(dialog.registryDependencies).not.toContain('portal');
		expect(dialog.files.some((file) => file.content.includes("from '../portal'"))).toBe(true);
	});

	it('builds the complete Solid registry and removes stale artifacts', async () => {
		const outDir = path.join(tempDir, 'solid');
		const secondOutDir = path.join(tempDir, 'solid-second');
		await fs.mkdir(outDir, { recursive: true });
		await fs.writeFile(path.join(outDir, 'stale.json'), '{}');

		await buildRegistry({
			manifest: solidRegistryManifest,
			...createSolidRegistryConfig({
				workspaceRoot: path.resolve(__dirname, '../../../..'),
				outDir,
			}),
		});
		await buildRegistry({
			manifest: solidRegistryManifest,
			...createSolidRegistryConfig({
				workspaceRoot: path.resolve(__dirname, '../../../..'),
				outDir: secondOutDir,
			}),
		});

		const outputNames = (await fs.readdir(outDir)).sort();
		const secondOutputNames = (await fs.readdir(secondOutDir)).sort();
		expect(outputNames).toEqual([...solidRegistryManifest.items.map((item) => `${item.name}.json`), 'registry.json'].sort());
		expect(secondOutputNames).toEqual(outputNames);
		expect(outputNames).not.toContain('stale.json');
		for (const outputName of outputNames) {
			expect(await fs.readFile(path.join(secondOutDir, outputName), 'utf-8'), `${outputName} differs across deterministic Solid registry builds`).toBe(
				await fs.readFile(path.join(outDir, outputName), 'utf-8'),
			);
		}

		const registry = JSON.parse(await fs.readFile(path.join(outDir, 'registry.json'), 'utf-8')) as { name: string; items: Array<{ name: string; type: string }> };
		const dialog = JSON.parse(await fs.readFile(path.join(outDir, 'dialog.json'), 'utf-8')) as {
			dependencies: string[];
			devDependencies: string[];
			registryDependencies: string[];
			files: Array<{ target: string; content: string }>;
		};
		const core = JSON.parse(await fs.readFile(path.join(outDir, 'core.json'), 'utf-8')) as { registryDependencies: string[]; files: Array<{ content: string }> };
		const utils = JSON.parse(await fs.readFile(path.join(outDir, 'utils.json'), 'utf-8')) as { files: Array<{ content: string }> };
		const styles = JSON.parse(await fs.readFile(path.join(outDir, 'styles.json'), 'utf-8')) as { files: Array<{ target: string; content: string }> };
		const dropdownMenu = JSON.parse(await fs.readFile(path.join(outDir, 'dropdown-menu.json'), 'utf-8')) as { files: Array<{ target: string; content: string }> };
		const select = JSON.parse(await fs.readFile(path.join(outDir, 'select.json'), 'utf-8')) as { files: Array<{ target: string; content: string }> };
		const localStorage = JSON.parse(await fs.readFile(path.join(outDir, 'create-local-storage.json'), 'utf-8')) as GeneratedRegistryItem & {
			type: string;
			dependencies: string[];
		};
		const mediaQuery = JSON.parse(await fs.readFile(path.join(outDir, 'create-media-query.json'), 'utf-8')) as GeneratedRegistryItem & {
			type: string;
			dependencies: string[];
		};
		const clipboard = JSON.parse(await fs.readFile(path.join(outDir, 'create-copy-to-clipboard.json'), 'utf-8')) as GeneratedRegistryItem & {
			type: string;
			dependencies: string[];
		};

		expect(registry.name).toBe('tile-ui-solid');
		expect(registry.items.filter((item) => item.type === 'registry:ui')).toHaveLength(62);
		expect(registry.items.filter((item) => item.type === 'registry:hook')).toEqual([
			expect.objectContaining({ name: 'create-local-storage' }),
			expect.objectContaining({ name: 'create-media-query' }),
			expect.objectContaining({ name: 'create-copy-to-clipboard' }),
		]);
		expect(registry.items).toHaveLength(71);
		expect(registry.items.filter((item) => item.type === 'registry:theme')).toEqual([
			expect.objectContaining({ name: 'theme-default' }),
			expect.objectContaining({ name: 'theme-kumo' }),
		]);
		for (const item of [localStorage, mediaQuery, clipboard]) {
			expect(item.type).toBe('registry:hook');
			expect(item.dependencies).toEqual(['solid-js']);
			expect(item.registryDependencies).toBeUndefined();
			expect(item.files).toHaveLength(1);
			expect(item.files[0]?.target).toBe(`primitives/${item.name}.ts`);
			expect(item.files[0]?.content).not.toContain('@tile-ui/');
		}
		expect(localStorage.files[0]?.content).toContain('export function createLocalStorage');
		expect(localStorage.files[0]?.content).toContain('export function createSessionStorage');
		expect(mediaQuery.files[0]?.content).toContain('export function createWindowSize');
		expect(mediaQuery.files[0]?.content).toContain('export function createMediaQuery');
		expect(mediaQuery.files[0]?.content).toContain('export function createIsMobile');
		expect(mediaQuery.files[0]?.content).toContain('export function createOnlineStatus');
		expect(mediaQuery.files[0]?.content).toContain('export function createScrollPosition');
		expect(mediaQuery.files[0]?.content).not.toContain('createMousePosition');
		expect(clipboard.files[0]?.content).toContain('export function createCopyToClipboard');
		expect(clipboard.files[0]?.content).not.toContain('createClickOutside');
		expect(clipboard.files[0]?.content).not.toContain('createKeyPress');
		expect(dialog.dependencies).toEqual(['solid-js']);
		expect(dialog.devDependencies).toContain('sass');
		expect(dialog.registryDependencies).toEqual(expect.arrayContaining(['@tile-ui/button', '@tile-ui/core', '@tile-ui/styles', '@tile-ui/utils']));
		expect(dialog.files.map((file) => file.target)).toEqual(['components/ui/dialog/dialog.tsx', 'components/ui/dialog/index.ts', 'components/ui/dialog/dialog.module.scss']);
		expect(dialog.files[0]?.content).toContain("from '../lib/utils'");
		expect(dialog.files[0]?.content).toContain("from '../button'");
		expect(dialog.files[0]?.content).toContain("from 'solid-js/web'");
		expect(dialog.files[0]?.content).not.toContain('@tile-ui/');
		expect(core.registryDependencies).toContain('@tile-ui/utils');
		expect(core.files[0]?.content).toContain('export interface DialogBaseProps');
		expect(core.files[0]?.content).toContain('export interface AttachmentBaseProps');
		expect(core.files[0]?.content).toContain('export interface AspectRatioBaseProps');
		expect(core.files[0]?.content).not.toContain('@tile-ui/');
		expect(utils.files[0]?.content).toContain('export function invokeEventHandler');
		for (const name of [
			'activateModalFocusScope',
			'composeEventHandlers',
			'composeRefs',
			'createAnchoredPosition',
			'createCollectionRegistry',
			'createCompositeIdRegistry',
			'createControllableSignal',
			'createHoverIntent',
			'createPortalScope',
			'registerDismissableLayer',
			'resolvePortalContainer',
			'useRequiredContext',
			'listenToFormReset',
			'setNativeValue',
			'setNativeChecked',
			'getRovingFocusTarget',
			'moveRovingFocus',
			'getPointerAxisRatio',
			'createFormStoreSnapshot',
			'createExternalStoreAccessor',
		]) {
			expect(utils.files[0]?.content).toContain(`export function ${name}`);
		}
		expect(utils.files[0]?.content).not.toMatch(/from ['"](?:@tile-ui\/|\.\.\/\.\.\/src\/)/);
		expect(utils.files[0]?.content.match(/from 'solid-js';/g)).toHaveLength(1);
		const utilsResult = ts.transpileModule(utils.files[0]!.content, {
			fileName: 'components/ui/lib/utils.ts',
			reportDiagnostics: true,
			compilerOptions: { target: 4 },
		});
		expect(utilsResult.diagnostics ?? [], 'generated Solid utils syntax diagnostics').toEqual([]);
		const utilsProjectDir = path.join(tempDir, 'solid-utils-consumer');
		await fs.mkdir(path.join(utilsProjectDir, 'components/ui/lib'), { recursive: true });
		await fs.writeFile(path.join(utilsProjectDir, 'components/ui/lib/utils.ts'), utils.files[0]!.content);
		await typeCheckGeneratedSolidProject(utilsProjectDir);
		expect(styles.files.map((file) => file.target)).toEqual(expect.arrayContaining(['styles/variables/_colors.scss', 'styles/mixins/_utils.scss']));
		expect(dropdownMenu.files.map((file) => file.target)).toContain('components/ui/dropdown-menu/menu-internals.tsx');
		expect(select.files.map((file) => file.target)).toContain('components/ui/select/logical-tab.ts');

		for (const outputName of outputNames.filter((name) => name !== 'registry.json')) {
			const item = JSON.parse(await fs.readFile(path.join(outDir, outputName), 'utf-8')) as { files: Array<{ content: string }> };
			for (const file of item.files) {
				expect(file.content, outputName).not.toContain('@tile-ui/');
			}
		}

		for (const itemName of solidRegistryManifest.items.filter((item) => item.type === 'registry:ui').map((item) => item.name)) {
			const item = JSON.parse(await fs.readFile(path.join(outDir, `${itemName}.json`), 'utf-8')) as { files: Array<{ target: string; content: string }> };
			const component = item.files.find((file) => file.target.endsWith('.tsx'));
			expect(component, `${itemName} component output missing`).toBeDefined();
			const result = ts.transpileModule(component!.content, {
				fileName: component!.target,
				reportDiagnostics: true,
				compilerOptions: { jsx: 1, target: 4 },
			});
			expect(result.diagnostics ?? [], `${itemName} generated consumer syntax diagnostics`).toEqual([]);
		}

		const batch2ProjectDir = path.join(tempDir, 'solid-batch2-production-consumer');
		await fs.mkdir(batch2ProjectDir, { recursive: true });
		const batch2Slugs = [
			'button-group',
			'checkbox',
			'field',
			'form',
			'input-group',
			'input-otp',
			'native-select',
			'progress',
			'radio-group',
			'slider',
			'switch',
			'textarea',
			'toggle-group',
		];
		const batch2Install = await materializeInstalledItems(outDir, batch2ProjectDir, batch2Slugs);
		for (const slug of batch2Slugs) expect(batch2Install.has(slug), `${slug} missing from recursive production install`).toBe(true);
		await typeCheckGeneratedSolidProject(batch2ProjectDir);

		const batch4Slugs = [
			'alert-dialog',
			'combobox',
			'command',
			'context-menu',
			'drawer',
			'dropdown-menu',
			'hover-card',
			'menubar',
			'navigation-menu',
			'popover',
			'select',
			'sheet',
			'tooltip',
		];
		for (const slug of batch4Slugs) {
			const projectDir = path.join(tempDir, `solid-${slug}-consumer`);
			await fs.mkdir(projectDir, { recursive: true });
			const installed = await materializeInstalledItems(outDir, projectDir, [slug]);
			expect(installed.has(slug), `${slug} missing from independent recursive install`).toBe(true);
			await typeCheckGeneratedSolidProject(projectDir);
			await buildGeneratedSolidProject(projectDir, [slug]);
		}

		const completeProjectDir = path.join(tempDir, 'solid-complete-manifest-consumer');
		await fs.mkdir(completeProjectDir, { recursive: true });
		const completeInstall = await materializeInstalledItems(
			outDir,
			completeProjectDir,
			solidRegistryManifest.items.map((item) => item.name),
		);
		expect(completeInstall.size).toBe(71);
		expect(completeInstall.has('theme-kumo')).toBe(true);
		await typeCheckGeneratedSolidProject(completeProjectDir);
		await buildGeneratedSolidProject(
			completeProjectDir,
			solidRegistryManifest.items.filter((item) => item.type === 'registry:ui').map((item) => item.name),
		);

		for (const slug of ['create-local-storage', 'create-media-query', 'create-copy-to-clipboard']) {
			const projectDir = path.join(tempDir, `solid-${slug}-consumer`);
			await fs.mkdir(projectDir, { recursive: true });
			const installed = await materializeInstalledItems(outDir, projectDir, [slug]);
			expect([...installed.keys()]).toEqual([slug]);
			await fs.writeFile(path.join(projectDir, 'consumer.ts'), `export * from './primitives/${slug}';\n`);
			await typeCheckGeneratedSolidProject(projectDir);
			await buildGeneratedSolidPrimitiveProject(projectDir, [slug]);
		}
	}, 120_000);

	it('rejects any workspace package import left in transformed source', async () => {
		const sourcePath = path.join(tempDir, 'source.ts');
		await fs.writeFile(sourcePath, "import value from '@tile-ui/unexpected';\nexport { value };\n", 'utf-8');

		await expect(
			buildRegistry({
				framework: 'solid',
				workspaceRoot: tempDir,
				outDir: path.join(tempDir, 'forbidden'),
				manifest: {
					name: 'forbidden',
					homepage: 'https://example.com',
					items: [
						{
							name: 'source',
							type: 'registry:lib',
							title: 'Source',
							description: 'Source',
							files: [{ source: 'source.ts', type: 'registry:lib', transform: 'copy' }],
						},
					],
				},
				transforms: {
					file: async ({ content, file }) => ({ content, target: file.target }),
				},
				validate: {
					forbidWorkspaceImports: ['@tile-ui/'],
				},
			}),
		).rejects.toThrow("forbidden import '@tile-ui/'");
	});
});
