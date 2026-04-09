import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildRegistry } from '@tile-ui/buildx/registry';
import { createReactRegistryConfig } from '@tile-ui/buildx/registry/presets/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '../../..');
const outDir = path.resolve(__dirname, '../public/r');
const { reactRegistryManifest } = await import(pathToFileUrl(path.resolve(workspaceRoot, 'packages/react/src/registry/manifest.ts')).href);

await buildRegistry({
	manifest: reactRegistryManifest,
	...createReactRegistryConfig({
		workspaceRoot,
		outDir,
	}),
});

function pathToFileUrl(filePath) {
	return new URL(`file://${filePath}`);
}
