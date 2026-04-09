import type { PackageRegistryManifest } from '../../../buildx/src/registry/types';

import { reactUiItems } from './items/ui';
import { reactHookItems } from './items/hooks';
import { reactLibItems } from './items/lib';
import { reactFileItems } from './items/files';

export const reactRegistryManifest: PackageRegistryManifest = {
  name: 'tile-ui-react',
  homepage: 'https://react.tile-ui.dev',
  items: [...reactLibItems, ...reactFileItems, ...reactHookItems, ...reactUiItems],
};
