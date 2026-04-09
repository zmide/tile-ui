import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { watchRegistry } from '@tile-ui/buildx/registry';
import { createVueRegistryConfig } from '@tile-ui/buildx/registry/presets/vue';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '../../..');
const outDir = path.resolve(__dirname, '../public/r');

await watchRegistry({
	run: async () => {
		await runBuild();
	},
	watchPaths: [
		path.resolve(workspaceRoot, 'packages/vue/src/registry'),
		path.resolve(workspaceRoot, 'packages/vue/src/components'),
		path.resolve(workspaceRoot, 'packages/vue/src/composables'),
		path.resolve(workspaceRoot, 'packages/core/src'),
		path.resolve(workspaceRoot, 'packages/styles/scss'),
	],
});

async function runBuild() {
	const { vueRegistryManifest } = await import(`${pathToFileURL(path.resolve(workspaceRoot, 'packages/vue/src/registry/manifest.ts')).href}?t=${Date.now()}`);

	await import('@tile-ui/buildx/registry').then(({ buildRegistry }) =>
		buildRegistry({
			manifest: vueRegistryManifest,
			...createVueRegistryConfig({
				workspaceRoot,
				outDir,
			}),
		}),
	);
}
