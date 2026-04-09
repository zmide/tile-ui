import type { PackageRegistryItem } from '../../../../buildx/src/registry/types';

export const vueComposableItems: PackageRegistryItem[] = [
  {
    name: 'use-copy-to-clipboard',
    type: 'registry:hook',
    title: 'useCopyToClipboard',
    description: 'Vue composable for clipboard copy interactions.',
    files: [
      {
        source: 'packages/vue/src/composables/use-event.ts',
        type: 'registry:hook',
        transform: 'vue-composable',
        target: 'composables/use-copy-to-clipboard.ts',
      },
    ],
  },
  {
    name: 'use-media-query',
    type: 'registry:hook',
    title: 'useMediaQuery',
    description: 'Vue composable for viewport and media query state.',
    files: [
      {
        source: 'packages/vue/src/composables/use-media.ts',
        type: 'registry:hook',
        transform: 'vue-composable',
        target: 'composables/use-media-query.ts',
      },
    ],
  },
  {
    name: 'use-local-storage',
    type: 'registry:hook',
    title: 'useLocalStorage',
    description: 'Vue composable for local and session storage state.',
    files: [
      {
        source: 'packages/vue/src/composables/use-local-storage.ts',
        type: 'registry:hook',
        transform: 'vue-composable',
        target: 'composables/use-local-storage.ts',
      },
    ],
  },
];
