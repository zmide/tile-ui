import type { PackageRegistryManifest } from '@tile-ui/buildx/registry/types';

import { vueUiItems } from './items/ui';
import { vueComposableItems } from './items/composables';
import { vueLibItems } from './items/lib';
import { vueFileItems } from './items/files';

export const vueRegistryManifest: PackageRegistryManifest = {
	name: 'tile-ui-vue',
	homepage: 'https://vue.tile-ui.dev',
	items: [...vueLibItems, ...vueFileItems, ...vueComposableItems, ...vueUiItems],
};
