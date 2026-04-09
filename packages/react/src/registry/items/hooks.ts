import type { PackageRegistryItem } from '../../../../buildx/src/registry/types';

export const reactHookItems: PackageRegistryItem[] = [
  {
    name: 'use-copy-to-clipboard',
    type: 'registry:hook',
    title: 'useCopyToClipboard',
    description: 'React hook for clipboard copy interactions.',
    files: [
      {
        source: 'packages/react/src/hooks/use-event.ts',
        type: 'registry:hook',
        transform: 'react-hook',
        target: 'hooks/use-copy-to-clipboard.ts',
      },
    ],
  },
  {
    name: 'use-media-query',
    type: 'registry:hook',
    title: 'useMediaQuery',
    description: 'React hook for viewport and media query state.',
    files: [
      {
        source: 'packages/react/src/hooks/use-media.ts',
        type: 'registry:hook',
        transform: 'react-hook',
        target: 'hooks/use-media-query.ts',
      },
    ],
  },
  {
    name: 'use-local-storage',
    type: 'registry:hook',
    title: 'useLocalStorage',
    description: 'React hook for local and session storage state.',
    files: [
      {
        source: 'packages/react/src/hooks/use-local-storage.ts',
        type: 'registry:hook',
        transform: 'react-hook',
        target: 'hooks/use-local-storage.ts',
      },
    ],
  },
];
