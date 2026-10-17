import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export const fixtureRoot = path.dirname(fileURLToPath(import.meta.url));
export const workspaceRoot = path.resolve(fixtureRoot, '../..');
const fromPackage = (name) => createRequire(path.join(workspaceRoot, `packages/${name}/package.json`));
const solidRequire = fromPackage('solid');
const reactRequire = fromPackage('react');
const vueRequire = fromPackage('vue');

export async function createFixtureConfig(framework, cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tile-theme-vite-')), baselineScss) {
	if (!['react', 'vue', 'solid'].includes(framework)) throw new Error(`Unknown framework: ${framework}`);
	if (baselineScss && !fs.existsSync(path.join(baselineScss, 'theme.scss'))) throw new Error(`Baseline SCSS directory has no theme.scss: ${baselineScss}`);
	const plugins = [];
	if (framework === 'vue') {
		const babel = await import(solidRequire.resolve('@babel/core'));
		const presetTypescript = solidRequire.resolve('@babel/preset-typescript');
		// Nuxt owns this transitive compiler; resolve its existing pnpm package, without installing.
		const dependencyRoot = path.join(workspaceRoot, 'node_modules/.pnpm');
		const compilerPackage = fs.readdirSync(dependencyRoot).find((name) => name.startsWith('@vue+babel-plugin-jsx@'));
		if (!compilerPackage) throw new Error('Installed Vue JSX compiler not found');
		const jsx = path.join(dependencyRoot, compilerPackage, 'node_modules/@vue/babel-plugin-jsx/dist/index.mjs');
		plugins.push({
			name: 'theme-vue-jsx',
			enforce: 'pre',
			async transform(source, id) {
				if (!id.endsWith('.tsx') || !id.includes('/packages/vue/')) return;
				const result = await babel.transformAsync(source, {
					filename: id,
					babelrc: false,
					configFile: false,
					presets: [[presetTypescript, { allExtensions: true, isTSX: true }]],
					plugins: [jsx],
					sourceMaps: true,
				});
				return { code: result.code, map: result.map };
			},
		});
	}
	if (framework === 'solid') {
		const { default: solid } = await import(solidRequire.resolve('vite-plugin-solid'));
		plugins.push(solid({ dev: false, hot: false }));
	}
	plugins.push({
		name: 'theme-visual-pages',
		configureServer(server) {
			server.middlewares.use((request, response, next) => {
				const pathname = new URL(request.url, 'http://fixture.local').pathname;
				if (pathname === '/favicon.ico') {
					response.statusCode = 204;
					response.end();
					return;
				}
				const match = pathname.match(/^\/(default|kumo)\/(light|dark)\/?$/);
				if (!match) return next();
				const [, theme, mode] = match;
				if (baselineScss && theme !== 'default') {
					response.statusCode = 404;
					response.end('Baseline server only serves the default theme.');
					return;
				}
				const entry = `/@fs/${path.join(fixtureRoot, `${framework}.${framework === 'vue' ? 'ts' : 'tsx'}`)}`;
				// Each document imports exactly ONE theme. Mode changes never swap a stylesheet.
				const stylesheet =
					theme === 'kumo'
						? path.join(workspaceRoot, 'packages/themes/kumo/scss/theme.scss')
						: path.join(baselineScss ?? path.join(workspaceRoot, 'packages/styles/scss'), 'theme.scss');
				const html = `<!doctype html><html lang="en" class="${mode}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Tile ${framework}: ${theme} ${mode}</title><link rel="icon" href="data:,"></head><body><main id="fixture-root"></main><script type="module">import ${JSON.stringify(`/@fs/${stylesheet}`)}; import ${JSON.stringify(`/@fs/${path.join(fixtureRoot, 'host.css')}`)}; import ${JSON.stringify(entry)};</script></body></html>`;
				server
					.transformIndexHtml(pathname, html)
					.then((transformed) => {
						response.setHeader('Content-Type', 'text/html');
						response.end(transformed);
					})
					.catch(next);
			});
		},
	});
	const packageDirectory = (require, name) => path.dirname(require.resolve(`${name}/package.json`));
	const reactDirectory = packageDirectory(reactRequire, 'react');
	const reactDomDirectory = packageDirectory(reactRequire, 'react-dom');
	const solidDirectory = packageDirectory(solidRequire, 'solid-js');
	return {
		configFile: false,
		// Sass is installed here, not at the workspace root. No dependency install or symlink.
		root: path.join(workspaceRoot, 'packages/solid'),
		cacheDir,
		plugins,
		clearScreen: false,
		appType: 'custom',
		esbuild: framework === 'react' ? { jsx: 'automatic', jsxImportSource: 'react' } : undefined,
		resolve: {
			alias: [
				...(baselineScss ? [{ find: '@tile-ui/styles/scss', replacement: baselineScss }] : []),
				{ find: /^@tile-ui\/core\/liveline$/, replacement: path.join(workspaceRoot, 'packages/core/src/liveline/index.ts') },
				{ find: /^@tile-ui\/core$/, replacement: path.join(workspaceRoot, 'packages/core/src/index.ts') },
				{ find: '@tile-ui/styles', replacement: path.join(workspaceRoot, 'packages/styles') },
				...['react', 'vue', 'solid'].map((name) => ({ find: new RegExp(`^@tile-ui/${name}$`), replacement: path.join(workspaceRoot, `packages/${name}/src/index.ts`) })),
				{ find: /^react$/, replacement: reactDirectory },
				{ find: /^react\//, replacement: `${reactDirectory}/` },
				{ find: /^react-dom$/, replacement: reactDomDirectory },
				{ find: /^react-dom\//, replacement: `${reactDomDirectory}/` },
				{ find: /^vue$/, replacement: vueRequire.resolve('vue/dist/vue.runtime.esm-bundler.js') },
				// Node's export conditions otherwise choose server.ts / server.js for these.
				{ find: /^solid-js\/web$/, replacement: path.join(solidDirectory, 'web/dist/web.js') },
				{ find: /^solid-js\/store$/, replacement: path.join(solidDirectory, 'store/dist/store.js') },
				{ find: /^solid-js$/, replacement: path.join(solidDirectory, 'dist/solid.js') },
			],
			dedupe: ['react', 'react-dom', 'vue', 'solid-js'],
		},
		css: {
			modules: { generateScopedName: 'tile-theme-[name]__[local]' },
			preprocessorOptions: { scss: { loadPaths: [baselineScss ?? path.join(workspaceRoot, 'packages/styles/scss')] } },
		},
		server: { host: '127.0.0.1', port: 0, fs: { allow: [workspaceRoot, ...(baselineScss ? [baselineScss] : [])] }, watch: { ignored: ['**/.agents/**'] } },
	};
}
