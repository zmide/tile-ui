import { createRequire } from 'node:module';
import path from 'node:path';
import { createFixtureConfig, workspaceRoot } from './vite.config.mjs';

const require = createRequire(path.join(workspaceRoot, 'packages/solid/package.json'));
const { createServer } = await import(require.resolve('vite'));
const [framework = 'react', cacheDir, baselineScss] = process.argv.slice(2);
const server = await createServer(await createFixtureConfig(framework, cacheDir, baselineScss));
await server.listen();
console.log(`THEME_FIXTURE_URL=${server.resolvedUrls.local[0]}`);
let closing = false;
async function close() {
	if (closing) return;
	closing = true;
	await server.close();
	process.exit(0);
}
process.on('SIGTERM', close);
process.on('SIGINT', close);
