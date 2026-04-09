import type { PackageRegistryManifest } from '@tile-ui/buildx/registry/types';

import { reactUiItems } from './items/ui';
import { reactHookItems } from './items/hooks';
import { reactLibItems } from './items/lib';
import { reactFileItems } from './items/files';

export const reactRegistryManifest: PackageRegistryManifest = {
	name: 'tile-ui-react',
	homepage: 'https://react.tile-ui.dev',
	items: [...reactLibItems, ...reactFileItems, ...reactHookItems, ...reactUiItems],
};
