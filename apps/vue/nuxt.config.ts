import path from 'path';
import { fileURLToPath } from 'url';

import type { HmrContext, Plugin, ViteDevServer } from 'vite';

import docsData from './.generated/docs.json';
import { buildDocs } from './scripts/build-docs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stylesScssDir = path.join(__dirname, '../../packages/styles/scss');
const workspaceRoot = path.join(__dirname, '../..');
const docsRoot = path.join(__dirname, 'content/docs');
const generatedDocsFile = path.join(__dirname, '.generated/docs.json');

const docsHmrPlugin: Plugin = {
	name: 'tile-ui-vue-docs-hmr',
	apply: 'serve',
	configureServer(server: ViteDevServer) {
		server.watcher.add([docsRoot, generatedDocsFile]);
	},
	handleHotUpdate(ctx: HmrContext) {
		if (!ctx.file.startsWith(docsRoot) || !ctx.file.endsWith('.mdx')) {
			return;
		}

		buildDocs();
		ctx.server.ws.send({ type: 'full-reload' });
		return [];
	},
};

export default defineNuxtConfig({
	compatibilityDate: '2025-01-01',
	devtools: { enabled: true },
	trailingSlash: true,
	extensions: ['.tsx', '.ts', '.js'],
	alias: {
		'@tile-ui/buildx': path.join(workspaceRoot, 'packages/buildx/src/index.ts'),
		'@tile-ui/core': path.join(workspaceRoot, 'packages/core/src/index.ts'),
		'@tile-ui/styles': path.join(workspaceRoot, 'packages/styles'),
		'@tile-ui/vue': path.join(workspaceRoot, 'packages/vue/src/index.ts'),
	},
	vite: {
		plugins: [docsHmrPlugin],
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
	nitro: {
		prerender: {
			routes: docsData.routes,
		},
	},
});
