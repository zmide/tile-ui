import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { reactRegistryManifest } from '../../../react/src/registry/manifest';
import { solidRegistryManifest } from '../../../solid/src/registry/manifest';
import { vueRegistryManifest } from '../../../vue/src/registry/manifest';

const workspaceRoot = path.resolve(__dirname, '../../../..');

const EXPECTED_UI_COMPONENTS = [
	'accordion',
	'alert',
	'alert-dialog',
	'aspect-ratio',
	'attachment',
	'avatar',
	'badge',
	'breadcrumb',
	'bubble',
	'button',
	'button-group',
	'calendar',
	'card',
	'carousel',
	'chart',
	'checkbox',
	'collapsible',
	'combobox',
	'command',
	'context-menu',
	'dialog',
	'direction',
	'drawer',
	'dropdown-menu',
	'empty',
	'field',
	'form',
	'hover-card',
	'input',
	'input-group',
	'input-otp',
	'item',
	'kbd',
	'label',
	'liveline',
	'marker',
	'menubar',
	'message',
	'message-scroller',
	'native-select',
	'navigation-menu',
	'pagination',
	'popover',
	'progress',
	'radio-group',
	'resizable',
	'scroll-area',
	'select',
	'separator',
	'sheet',
	'sidebar',
	'skeleton',
	'slider',
	'sonner',
	'spinner',
	'switch',
	'table',
	'tabs',
	'textarea',
	'toggle',
	'toggle-group',
	'tooltip',
];

const EXPECTED_SOLID_UI_COMPONENTS = EXPECTED_UI_COMPONENTS;

describe.each([
	['react', reactRegistryManifest, 72],
	['vue', vueRegistryManifest, 72],
	['solid', solidRegistryManifest, 71],
] as const)('%s optional Kumo theme contract', (_framework, manifest, total) => {
	it('adds one explicit licensed theme without injecting a host palette', () => {
		expect(manifest.items).toHaveLength(total);
		const theme = manifest.items.find((item) => item.name === 'theme-kumo');
		expect(theme).toEqual({
			name: 'theme-kumo',
			type: 'registry:theme',
			title: 'Kumo Theme',
			description: 'Optional Kumo light and dark theme. Import the copied Sass entry explicitly to opt in.',
			registryDependencies: ['@tile-ui/styles'],
			files: [
				{ source: 'packages/themes/kumo/scss/theme.scss', type: 'registry:file', transform: 'copy', target: 'styles/themes/kumo.scss' },
				{ source: 'packages/themes/kumo/scss/_shared.scss', type: 'registry:file', transform: 'copy', target: 'styles/themes/_shared.scss' },
				{ source: 'packages/themes/kumo/scss/_light.scss', type: 'registry:file', transform: 'copy', target: 'styles/themes/_light.scss' },
				{ source: 'packages/themes/kumo/scss/_dark.scss', type: 'registry:file', transform: 'copy', target: 'styles/themes/_dark.scss' },
				{ source: 'packages/themes/kumo/LICENSE', type: 'registry:file', transform: 'copy', target: 'styles/themes/LICENSE.kumo' },
			],
		});
	});
});

describe.each([
	['react', reactRegistryManifest],
	['vue', vueRegistryManifest],
])('%s manifest 完整性', (_framework, manifest) => {
	it('覆盖全部 62 个 UI 组件且无重复', () => {
		const uiNames = manifest.items.filter((item) => item.type === 'registry:ui').map((item) => item.name);
		expect(new Set(uiNames).size).toBe(uiNames.length);
		expect([...uiNames].sort()).toEqual([...EXPECTED_UI_COMPONENTS].sort());
	});

	it('每个 item 至少包含一个 file', () => {
		for (const item of manifest.items) {
			expect(item.files.length, `${item.name} 缺少 file`).toBeGreaterThan(0);
		}
	});

	it('每个 UI item 的源码文件真实存在', () => {
		for (const item of manifest.items.filter((i) => i.type === 'registry:ui')) {
			for (const file of item.files) {
				expect(fs.existsSync(path.join(workspaceRoot, file.source)), `${file.source} 不存在`).toBe(true);
			}
		}
	});

	it('每个包含 SCSS 的 UI item 都依赖共享 styles item', () => {
		for (const item of manifest.items.filter((i) => i.type === 'registry:ui' && i.files.some((file) => file.source.endsWith('.scss')))) {
			expect(item.registryDependencies, `${item.name} 缺少 @tile-ui/styles`).toContain('@tile-ui/styles');
		}
	});

	it('registryDependencies 引用的 item 均存在', () => {
		const names = new Set(manifest.items.map((item) => item.name));
		for (const item of manifest.items) {
			for (const dep of item.registryDependencies ?? []) {
				if (dep.startsWith('@tile-ui/')) {
					const local = dep.slice('@tile-ui/'.length);
					expect(names.has(local), `${item.name} 引用未知依赖 ${dep}`).toBe(true);
				}
			}
		}
	});

	it('所有 portal 消费者都声明可解析的 portal registry 依赖', () => {
		const portal = manifest.items.find((item) => item.name === 'portal');
		expect(portal?.type).toBe('registry:lib');
		expect(portal?.files).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					target: 'components/ui/portal/index.ts',
				}),
				expect.objectContaining({
					target: 'components/ui/portal/portal.tsx',
				}),
			]),
		);

		for (const item of manifest.items) {
			const importsPortal = item.files.some((file) => {
				if (!fs.existsSync(path.join(workspaceRoot, file.source))) {
					return false;
				}

				return fs.readFileSync(path.join(workspaceRoot, file.source), 'utf-8').includes("from '../portal'");
			});

			if (importsPortal) {
				expect(item.registryDependencies, `${item.name} 缺少 portal registry 依赖`).toContain('@tile-ui/portal');
				expect(item.registryDependencies, `${item.name} 仍包含未命名空间化的 portal registry 依赖`).not.toContain('portal');
			}
		}
	});
});

describe('核心库导出与 UI 组件一致性', () => {
	it('@tile-ui/core 导出全部 62 个组件的公共契约', () => {
		const coreIndex = fs.readFileSync(path.join(workspaceRoot, 'packages/core/src/components/index.ts'), 'utf-8');
		for (const name of EXPECTED_UI_COMPONENTS) {
			expect(coreIndex, `core 缺少 ${name}`).toContain(`'./${name}'`);
		}
	});

	it('两个框架的 UI 组件集合保持一致', () => {
		const reactNames = reactRegistryManifest.items
			.filter((i) => i.type === 'registry:ui')
			.map((i) => i.name)
			.sort();
		const vueNames = vueRegistryManifest.items
			.filter((i) => i.type === 'registry:ui')
			.map((i) => i.name)
			.sort();
		expect(reactNames).toEqual(vueNames);
	});
});

describe('solid manifest 完整性', () => {
	it('精确包含 71 个 item、62 个 UI 和 3 个 primitive hook', () => {
		const uiNames = solidRegistryManifest.items.filter((item) => item.type === 'registry:ui').map((item) => item.name);
		const hookNames = solidRegistryManifest.items.filter((item) => item.type === 'registry:hook').map((item) => item.name);
		expect([...uiNames].sort()).toEqual(EXPECTED_SOLID_UI_COMPONENTS);
		expect(hookNames.sort()).toEqual(['create-copy-to-clipboard', 'create-local-storage', 'create-media-query']);
		expect(solidRegistryManifest.items).toHaveLength(71);
		expect(solidRegistryManifest.items.map((item) => item.name).sort()).toEqual(
			[...EXPECTED_SOLID_UI_COMPONENTS, 'core', 'liveline-core', 'styles', 'theme-default', 'theme-kumo', 'utils', ...hookNames].sort(),
		);
	});

	it('primitive schemas expose only Solid dependencies and explicit primitive targets', () => {
		const schemas = solidRegistryManifest.items
			.filter((item) => item.type === 'registry:hook')
			.map((item) => ({
				name: item.name,
				type: item.type,
				dependencies: item.dependencies,
				registryDependencies: item.registryDependencies,
				files: item.files.map((file) => ({ source: file.source, type: file.type, transform: file.transform, target: file.target, exports: file.exports })),
			}));

		expect(schemas).toEqual([
			{
				name: 'create-local-storage',
				type: 'registry:hook',
				dependencies: ['solid-js'],
				registryDependencies: undefined,
				files: [
					{
						source: 'packages/solid/src/primitives/storage.ts',
						type: 'registry:hook',
						transform: 'solid-primitive',
						target: 'primitives/create-local-storage.ts',
						exports: ['StorageDefaultValue', 'StorageSignal', 'createLocalStorage', 'createSessionStorage'],
					},
				],
			},
			{
				name: 'create-media-query',
				type: 'registry:hook',
				dependencies: ['solid-js'],
				registryDependencies: undefined,
				files: [
					{
						source: 'packages/solid/src/primitives/media.ts',
						type: 'registry:hook',
						transform: 'solid-primitive',
						target: 'primitives/create-media-query.ts',
						exports: ['WindowSize', 'Point', 'ReactiveValue', 'createWindowSize', 'createMediaQuery', 'createIsMobile', 'createOnlineStatus', 'createScrollPosition'],
					},
				],
			},
			{
				name: 'create-copy-to-clipboard',
				type: 'registry:hook',
				dependencies: ['solid-js'],
				registryDependencies: undefined,
				files: [
					{
						source: 'packages/solid/src/primitives/events.ts',
						type: 'registry:hook',
						transform: 'solid-primitive',
						target: 'primitives/create-copy-to-clipboard.ts',
						exports: ['CopyToClipboardOptions', 'CopyToClipboardResult', 'createCopyToClipboard'],
					},
				],
			},
		]);
	});

	it('每个 UI item 包含组件、barrel、样式和真实 Solid 依赖', () => {
		for (const item of solidRegistryManifest.items.filter((candidate) => candidate.type === 'registry:ui')) {
			expect(item.dependencies).toEqual(['solid-js']);
			expect(item.devDependencies).toContain('sass');
			expect(item.registryDependencies).toContain(item.name === 'liveline' ? '@tile-ui/liveline-core' : '@tile-ui/core');
			expect(item.registryDependencies).toContain('@tile-ui/styles');
			expect(item.files.map((file) => file.source)).toEqual([
				`packages/solid/src/components/${item.name}/${item.name}.tsx`,
				...(item.name === 'liveline' ? ['packages/solid/src/components/liveline/liveline-transition.tsx'] : []),
				...(item.name === 'dropdown-menu' ? ['packages/solid/src/components/dropdown-menu/menu-internals.tsx'] : []),
				...(item.name === 'select' ? ['packages/solid/src/components/select/logical-tab.ts'] : []),
				`packages/solid/src/components/${item.name}/index.ts`,
				// Direction is a style-free context provider in the existing Solid registry contract.
				...(item.name === 'direction' ? [] : [`packages/styles/scss/components/${item.name}.module.scss`]),
			]);

			for (const file of item.files) {
				expect(fs.existsSync(path.join(workspaceRoot, file.source)), `${file.source} 不存在`).toBe(true);
			}
		}
	});

	it('依赖闭包与源码导入一致', () => {
		const core = solidRegistryManifest.items.find((item) => item.name === 'core');
		const dialog = solidRegistryManifest.items.find((item) => item.name === 'dialog');
		const input = solidRegistryManifest.items.find((item) => item.name === 'input');
		const toggle = solidRegistryManifest.items.find((item) => item.name === 'toggle');
		const attachment = solidRegistryManifest.items.find((item) => item.name === 'attachment');
		const form = solidRegistryManifest.items.find((item) => item.name === 'form');
		const inputGroup = solidRegistryManifest.items.find((item) => item.name === 'input-group');
		const batch3Utils = ['accordion', 'calendar', 'collapsible', 'message-scroller', 'scroll-area', 'tabs'];
		const batch3Static = ['direction', 'message', 'pagination'];
		const batch4Utils = ['alert-dialog', 'combobox', 'command', 'drawer', 'dropdown-menu', 'hover-card', 'navigation-menu', 'popover', 'select', 'sheet', 'tooltip'];
		const batch5Dependencies = {
			carousel: ['@tile-ui/core', '@tile-ui/button', '@tile-ui/styles'],
			chart: ['@tile-ui/core', '@tile-ui/styles'],
			resizable: ['@tile-ui/core', '@tile-ui/styles'],
			sidebar: [
				'@tile-ui/core',
				'@tile-ui/button',
				'@tile-ui/input',
				'@tile-ui/separator',
				'@tile-ui/sheet',
				'@tile-ui/skeleton',
				'@tile-ui/tooltip',
				'@tile-ui/utils',
				'@tile-ui/styles',
			],
			sonner: ['@tile-ui/core', '@tile-ui/utils', '@tile-ui/styles'],
		};

		expect(core?.registryDependencies).toContain('@tile-ui/utils');
		expect(dialog?.registryDependencies).toEqual(expect.arrayContaining(['@tile-ui/button', '@tile-ui/core', '@tile-ui/styles', '@tile-ui/utils']));
		expect(input?.registryDependencies).toContain('@tile-ui/utils');
		expect(toggle?.registryDependencies).toContain('@tile-ui/utils');
		expect(attachment?.registryDependencies).toEqual(expect.arrayContaining(['@tile-ui/button', '@tile-ui/core', '@tile-ui/styles', '@tile-ui/utils']));
		expect(form?.registryDependencies).toEqual(expect.arrayContaining(['@tile-ui/core', '@tile-ui/label', '@tile-ui/styles', '@tile-ui/utils']));
		expect(inputGroup?.registryDependencies).toEqual(expect.arrayContaining(['@tile-ui/button', '@tile-ui/core', '@tile-ui/styles', '@tile-ui/utils']));
		for (const name of batch3Utils)
			expect(solidRegistryManifest.items.find((item) => item.name === name)?.registryDependencies).toEqual(
				expect.arrayContaining(['@tile-ui/core', '@tile-ui/styles', '@tile-ui/utils']),
			);
		for (const name of batch3Static) expect(solidRegistryManifest.items.find((item) => item.name === name)?.registryDependencies).toEqual(['@tile-ui/core', '@tile-ui/styles']);
		for (const name of batch4Utils) expect(solidRegistryManifest.items.find((item) => item.name === name)?.registryDependencies).toContain('@tile-ui/utils');
		expect(solidRegistryManifest.items.find((item) => item.name === 'alert-dialog')?.registryDependencies).toContain('@tile-ui/button');
		expect(solidRegistryManifest.items.find((item) => item.name === 'combobox')?.registryDependencies).toContain('@tile-ui/select');
		for (const name of ['context-menu', 'menubar'])
			expect(solidRegistryManifest.items.find((item) => item.name === name)?.registryDependencies).toContain('@tile-ui/dropdown-menu');
		for (const [name, dependencies] of Object.entries(batch5Dependencies))
			expect(solidRegistryManifest.items.find((item) => item.name === name)?.registryDependencies).toEqual(dependencies);
		expect(solidRegistryManifest.items.some((item) => item.name === 'portal')).toBe(false);
	});

	it('registryDependencies 均解析到 manifest item', () => {
		const names = new Set(solidRegistryManifest.items.map((item) => item.name));
		for (const item of solidRegistryManifest.items) {
			for (const dependency of item.registryDependencies ?? []) {
				const name = dependency.startsWith('@tile-ui/') ? dependency.slice('@tile-ui/'.length) : dependency;
				expect(names.has(name), `${item.name} 引用未知依赖 ${dependency}`).toBe(true);
			}
		}
	});
});
