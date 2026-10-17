import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';

const require = createRequire(import.meta.url);

export default defineConfig({
	base: './',
	plugins: [vueJsx()],
	resolve: { dedupe: ['vue'] },
	css: {
		preprocessorOptions: {
			scss: { loadPaths: [dirname(require.resolve('@tile-ui/styles/tokens.scss'))] },
		},
	},
});
