import type { PackageRegistryManifest } from '@tile-ui/buildx/registry/types';

import { solidFileItems } from './items/files';
import { solidLibItems } from './items/lib';
import { solidPrimitiveItems } from './items/primitives';
import { solidUiItems } from './items/ui';

export const solidRegistryManifest: PackageRegistryManifest = {
	name: 'tile-ui-solid',
	homepage: 'https://github.com/zmide/tile-ui/tree/master/packages/solid',
	items: [...solidLibItems, ...solidFileItems, ...solidPrimitiveItems, ...solidUiItems],
};
