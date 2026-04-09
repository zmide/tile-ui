import type { PackageRegistryItem } from '@tile-ui/buildx/registry/types';

export const vueFileItems: PackageRegistryItem[] = [
	{
		name: 'styles',
		type: 'registry:file',
		title: 'Styles',
		description: 'Shared SCSS assets required by Tile UI registry items.',
		devDependencies: ['sass'],
		files: [
			{
				source: 'packages/styles/scss/globals.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'styles/globals.scss',
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
];
