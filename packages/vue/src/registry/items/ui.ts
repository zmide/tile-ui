import type { PackageRegistryItem } from '@tile-ui/buildx/registry/types';

export const vueUiItems: PackageRegistryItem[] = [
	{
		name: 'button',
		type: 'registry:ui',
		title: 'Button',
		description: 'Multi-variant Vue button component for Tile UI.',
		dependencies: ['vue'],
		devDependencies: ['sass'],
		registryDependencies: ['core', 'utils'],
		files: [
			{
				source: 'packages/vue/src/components/button/button.tsx',
				type: 'registry:ui',
				transform: 'vue-component',
			},
			{
				source: 'packages/styles/scss/components/button.module.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'components/ui/button/button.module.scss',
			},
		],
	},
	{
		name: 'input',
		type: 'registry:ui',
		title: 'Input',
		description: 'Accessible Vue input component for Tile UI.',
		dependencies: ['vue'],
		devDependencies: ['sass'],
		registryDependencies: ['core', 'utils'],
		files: [
			{
				source: 'packages/vue/src/components/input/input.tsx',
				type: 'registry:ui',
				transform: 'vue-component',
			},
			{
				source: 'packages/styles/scss/components/input.module.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'components/ui/input/input.module.scss',
			},
		],
	},
	{
		name: 'textarea',
		type: 'registry:ui',
		title: 'Textarea',
		description: 'Accessible Vue textarea component for Tile UI.',
		dependencies: ['vue'],
		devDependencies: ['sass'],
		registryDependencies: ['core', 'utils'],
		files: [
			{
				source: 'packages/vue/src/components/textarea/textarea.tsx',
				type: 'registry:ui',
				transform: 'vue-component',
			},
			{
				source: 'packages/styles/scss/components/textarea.module.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'components/ui/textarea/textarea.module.scss',
			},
		],
	},
	{
		name: 'label',
		type: 'registry:ui',
		title: 'Label',
		description: 'Vue label primitive for Tile UI forms.',
		dependencies: ['vue'],
		devDependencies: ['sass'],
		registryDependencies: ['core'],
		files: [
			{
				source: 'packages/vue/src/components/label/label.tsx',
				type: 'registry:ui',
				transform: 'vue-component',
			},
			{
				source: 'packages/styles/scss/components/label.module.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'components/ui/label/label.module.scss',
			},
		],
	},
	{
		name: 'card',
		type: 'registry:ui',
		title: 'Card',
		description: 'Composable Vue card primitives for Tile UI.',
		dependencies: ['vue'],
		devDependencies: ['sass'],
		registryDependencies: ['core'],
		files: [
			{
				source: 'packages/vue/src/components/card/card.tsx',
				type: 'registry:ui',
				transform: 'vue-component',
			},
			{
				source: 'packages/styles/scss/components/card.module.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'components/ui/card/card.module.scss',
			},
		],
	},
];
