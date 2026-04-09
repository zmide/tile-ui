import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildRegistry } from '@tile-ui/buildx/registry';
import { createVueRegistryConfig } from '@tile-ui/buildx/registry/presets/vue';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '../../..');
const outDir = path.resolve(__dirname, '../public/r');
const { vueRegistryManifest } = await import(pathToFileUrl(path.resolve(workspaceRoot, 'packages/vue/src/registry/manifest.ts')).href);

await buildRegistry({
	manifest: vueRegistryManifest,
	...createVueRegistryConfig({
		workspaceRoot,
		outDir,
	}),
});

function pathToFileUrl(filePath) {
	return new URL(`file://${filePath}`);
}
