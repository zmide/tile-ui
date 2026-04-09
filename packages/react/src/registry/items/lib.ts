import type { PackageRegistryItem } from '@tile-ui/buildx/registry/types';

export const reactLibItems: PackageRegistryItem[] = [
	{
		name: 'core',
		type: 'registry:lib',
		title: 'Core',
		description: 'Registry runtime helpers for React Tile UI items.',
		files: [
			{
				source: '__virtual__/button/core.ts',
				type: 'registry:lib',
				transform: 'build-react-lib',
				target: 'components/ui/lib/core.ts',
			},
		],
	},
	{
		name: 'utils',
		type: 'registry:lib',
		title: 'Utils',
		description: 'Shared utility helpers for Tile UI registries.',
		files: [
			{
				source: '__virtual__/shared/utils.ts',
				type: 'registry:lib',
				transform: 'build-utils',
				target: 'components/ui/lib/utils.ts',
			},
		],
	},
];
