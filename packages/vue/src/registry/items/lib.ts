import type { PackageRegistryItem } from '../../../../buildx/src/registry/types';

export const vueLibItems: PackageRegistryItem[] = [
  {
    name: 'core',
    type: 'registry:lib',
    title: 'Core',
    description: 'Registry runtime helpers for Vue Tile UI items.',
    files: [
      {
        source: '__virtual__/button/core.ts',
        type: 'registry:lib',
        transform: 'build-vue-core',
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
