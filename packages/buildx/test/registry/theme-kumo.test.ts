import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { afterEach, describe, expect, it } from 'vitest';

import { buildRegistry } from '../../src/registry/build-registry';
import { transformReactFile } from '../../src/registry/transforms/react';
import { transformSolidFile } from '../../src/registry/transforms/solid';
import { transformVueFile } from '../../src/registry/transforms/vue';
import { reactFileItems } from '../../../react/src/registry/items/files';
import { solidFileItems } from '../../../solid/src/registry/items/files';
import { vueFileItems } from '../../../vue/src/registry/items/files';

const workspaceRoot = path.resolve(__dirname, '../../../..');
const requireStyles = createRequire(path.join(workspaceRoot, 'packages/styles/package.json'));
const frameworks = [
	{ framework: 'react' as const, items: reactFileItems, transform: transformReactFile },
	{ framework: 'vue' as const, items: vueFileItems, transform: transformVueFile },
	{ framework: 'solid' as const, items: solidFileItems, transform: transformSolidFile },
];
const temporaryDirectories: string[] = [];

interface GeneratedItem {
	name: string;
	type: string;
	registryDependencies?: string[];
	cssVars?: unknown;
	css?: unknown;
	tailwind?: unknown;
	files: Array<{ target: string; content: string }>;
}

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map((directory) => fs.rm(directory, { recursive: true, force: true })));
});

describe.each(frameworks)('$framework Kumo registry distribution', ({ framework, items, transform }) => {
	it('offers an optional file-only theme without changing the default styles contract', () => {
		const theme = items.find((item) => item.name === 'theme-kumo');
		expect(theme).toMatchObject({ type: 'registry:theme', registryDependencies: ['@tile-ui/styles'] });
		for (const property of ['cssVars', 'css', 'tailwind', 'extends', 'theme', 'style', 'baseColor']) expect(theme).not.toHaveProperty(property);
		expect(theme?.files.map((file) => file.target)).toEqual([
			'styles/themes/kumo.scss',
			'styles/themes/_shared.scss',
			'styles/themes/_light.scss',
			'styles/themes/_dark.scss',
			'styles/themes/LICENSE.kumo',
		]);
		const styles = items.find((item) => item.name === 'styles');
		expect(styles?.cssVars?.light).toBeDefined();
		expect(Object.keys(styles?.cssVars?.light ?? {}).every((name) => name.startsWith('tile-'))).toBe(true);
		expect(styles?.registryDependencies ?? []).not.toContain('@tile-ui/theme-kumo');
		expect(styles?.files.some((file) => file.source.includes('/themes/'))).toBe(false);
		expect(items.find((item) => item.name === 'theme-default')?.cssVars?.light).toHaveProperty('background', '#ffffff');
	});

	it('builds and compiles a clean opt-in install with relative Sass dependencies', async () => {
		const temporaryDirectory = await fs.mkdtemp(path.join(os.tmpdir(), `tile-ui-kumo-${framework}-`));
		temporaryDirectories.push(temporaryDirectory);
		const outDir = path.join(temporaryDirectory, 'registry');
		const selectedItems = items.filter((item) => ['styles', 'theme-kumo'].includes(item.name));
		await buildRegistry({
			framework,
			workspaceRoot,
			outDir,
			manifest: { name: `kumo-${framework}-fixture`, homepage: 'https://example.com', items: selectedItems },
			transforms: { file: transform },
			validate: { forbidWorkspaceImports: ['@tile-ui/'] },
		});
		const theme = JSON.parse(await fs.readFile(path.join(outDir, 'theme-kumo.json'), 'utf8')) as GeneratedItem;
		expect(theme.cssVars).toBeUndefined();
		expect(theme.css).toBeUndefined();
		expect(theme.tailwind).toBeUndefined();
		expect(theme.registryDependencies).toEqual(['@tile-ui/styles']);
		const license = theme.files.find((file) => file.target === 'styles/themes/LICENSE.kumo')?.content ?? '';
		expect(license).toContain('Cloudflare');
		expect(license).toContain('Permission is hereby granted, free of charge');
		expect(license).toContain('THE SOFTWARE IS PROVIDED "AS IS"');
		const summary = JSON.parse(await fs.readFile(path.join(outDir, 'registry.json'), 'utf8')) as { items: GeneratedItem[] };
		expect(summary.items.find((item) => item.name === 'theme-kumo')).not.toHaveProperty('cssVars');
		const styles = JSON.parse(await fs.readFile(path.join(outDir, 'styles.json'), 'utf8')) as GeneratedItem;
		const projectDir = path.join(temporaryDirectory, 'consumer');
		for (const item of [styles, theme]) {
			for (const file of item.files) {
				const target = path.join(projectDir, file.target);
				await fs.mkdir(path.dirname(target), { recursive: true });
				await fs.writeFile(target, file.content);
			}
		}
		const entry = theme.files.find((file) => file.target === 'styles/themes/kumo.scss')?.content ?? '';
		expect(entry).toContain("@use './light';");
		expect(entry).toContain("@use './dark';");
		expect(entry).not.toMatch(/@tile-ui|generated/);
		expect(entry).not.toMatch(/@use ['"]\.\.\/(?:theme|globals|reset)['"]/);
		const sass = (await import(pathToFileURL(requireStyles.resolve('sass')).href)) as { compile: (file: string) => { css: string } };
		const css = sass.compile(path.join(projectDir, 'styles/themes/kumo.scss')).css;
		expect(css).toMatch(/--background\s*:/);
		expect(css).toMatch(/--tile-[\w-]+\s*:/);
		expect(css).toContain('.light');
		expect(css).toContain('.dark');
		expect(css).toMatch(/\[data-theme=['"]?light['"]?\]/);
		expect(css).toMatch(/\[data-theme=['"]?dark['"]?\]/);
		expect(css).not.toMatch(/(?:^|[;{])\s*(?:box-sizing\s*:|margin\s*:\s*0)|@(?:import|font-face)\b/m);
	});
});
