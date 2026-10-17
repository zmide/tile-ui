import type { PackageRegistryItem } from '@tile-ui/buildx/registry/types';
import { darkThemeOverrides, lightThemeCssVars, tileExtensionCssVars } from '../../../../core/src/tokens';

export const reactFileItems: PackageRegistryItem[] = [
	{
		name: 'styles',
		type: 'registry:style',
		title: 'Styles',
		description: 'Tile UI runtime extensions and shared Sass dependencies.',
		devDependencies: ['sass'],
		cssVars: {
			light: tileExtensionCssVars,
		},
		files: [
			{
				source: 'packages/styles/scss/tokens.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/tokens.scss',
			},
			{
				source: 'packages/styles/scss/globals.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/globals.scss',
			},
			{
				source: 'packages/styles/scss/theme.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/theme.scss',
			},
			{
				source: 'packages/styles/scss/reset.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/reset.scss',
			},
			{
				source: 'packages/styles/scss/variables/_colors.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/variables/_colors.scss',
			},
			{
				source: 'packages/styles/scss/mixins/_utils.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/mixins/_utils.scss',
			},
		],
	},
	{
		name: 'theme-default',
		type: 'registry:theme',
		title: 'Default Theme',
		description: 'Optional Tile UI default palette and runtime token theme.',
		registryDependencies: ['@tile-ui/styles'],
		cssVars: {
			light: lightThemeCssVars,
			dark: darkThemeOverrides,
		},
		files: [
			{
				source: 'packages/styles/scss/theme.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/theme.scss',
			},
		],
	},
	{
		name: 'theme-kumo',
		type: 'registry:theme',
		title: 'Kumo Theme',
		description: 'Optional Kumo light and dark theme. Import the copied Sass entry explicitly to opt in.',
		registryDependencies: ['@tile-ui/styles'],
		files: [
			{
				source: 'packages/themes/kumo/scss/theme.scss',
				type: 'registry:file',
				transform: 'copy',
				target: 'styles/themes/kumo.scss',
			},
			{
				source: 'packages/themes/kumo/scss/_shared.scss',
				type: 'registry:file',
				transform: 'copy',
				target: 'styles/themes/_shared.scss',
			},
			{
				source: 'packages/themes/kumo/scss/_light.scss',
				type: 'registry:file',
				transform: 'copy',
				target: 'styles/themes/_light.scss',
			},
			{
				source: 'packages/themes/kumo/scss/_dark.scss',
				type: 'registry:file',
				transform: 'copy',
				target: 'styles/themes/_dark.scss',
			},
			{
				source: 'packages/themes/kumo/LICENSE',
				type: 'registry:file',
				transform: 'copy',
				target: 'styles/themes/LICENSE.kumo',
			},
		],
	},
];
