import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stylesScssDir = path.join(__dirname, '../../packages/styles/scss');
const workspaceRoot = path.join(__dirname, '../..');

export default defineNuxtConfig({
	compatibilityDate: '2025-01-01',
	devtools: { enabled: true },
	extensions: ['.tsx', '.ts', '.js'],
	alias: {
		'@tile-ui/buildx': path.join(workspaceRoot, 'packages/buildx/src/index.ts'),
		'@tile-ui/core': path.join(workspaceRoot, 'packages/core/src/index.ts'),
		'@tile-ui/styles': path.join(workspaceRoot, 'packages/styles'),
		'@tile-ui/vue': path.join(workspaceRoot, 'packages/vue/src/index.ts'),
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					importers: [],
					loadPaths: [stylesScssDir],
				},
			},
		},
	},
	css: ['@tile-ui/styles/scss/globals.scss', '~/assets/docs.scss'],
	build: {
		transpile: ['@tile-ui/vue', '@tile-ui/core'],
	},
});
