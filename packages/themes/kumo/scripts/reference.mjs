#!/usr/bin/env node
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
	cases,
	dependencyVersions,
	geometryProperties,
	styleProperties,
	targetSelector,
	structuralStyleReason,
	pixelMaskReason,
	referenceCommit,
} from '../test/reference/cases.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const fixture = fileURLToPath(new URL('../test/reference/', import.meta.url));
const artifactRoot = path.join(os.tmpdir(), 'opencode');
fs.mkdirSync(artifactRoot, { recursive: true });
const output = fs.mkdtempSync(path.join(artifactRoot, 'tile-kumo-reference-'));
const report = {
	ok: false,
	referenceCommit,
	startedAt: new Date().toISOString(),
	dependencies: {},
	environment: { node: process.version, platform: process.platform, rootFontSize: 16, bodyFontSize: 14, font: 'neutral system sans', dpr: 1 },
	policy: { geometryTolerancePx: 0.1, pixelChannelTolerance: 2, allowedDifferentPixels: 0, broadMismatchAllowlist: false },
	comparisons: [],
	findings: [],
	exceptions: [],
	screenshots: [],
	limits: [
		'React adapter only; cross-framework parity is a separate check.',
		'Not a full Kumo component, interaction, accessibility, or responsive suite.',
		'System fonts are deterministic only on the same host/browser. No pixel-perfect claim is implied by passing a subset.',
	],
};
let server;
let browser;

function finding(detail) {
	report.findings.push(detail);
}
function packageInfo(directory, name) {
	const filename = path.join(directory, 'node_modules', name, 'package.json');
	return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

async function settle(page) {
	await page.evaluate(async () => {
		await document.fonts.ready;
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	});
}

async function measure(locator) {
	return locator.evaluate(
		(element, properties) => {
			const rect = element.getBoundingClientRect();
			const css = getComputedStyle(element);
			return {
				tag: element.tagName,
				rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
				styles: Object.fromEntries(properties.map((key) => [key, css[key] ?? ''])),
				placeholder: element.matches('input')
					? { color: getComputedStyle(element, '::placeholder').color, opacity: getComputedStyle(element, '::placeholder').opacity }
					: null,
				html: element.outerHTML,
			};
		},
		[...geometryProperties, ...styleProperties],
	);
}

function equalValue(a, b) {
	if (a === b) return true;
	if (/^-?[\d.]+px$/.test(a) && /^-?[\d.]+px$/.test(b)) return Math.abs(parseFloat(a) - parseFloat(b)) <= report.policy.geometryTolerancePx;
	return false;
}

async function comparePixels(page, reference, tile, masks) {
	return page.evaluate(
		async ({ reference, tile, masks, tolerance }) => {
			async function decode(data) {
				const image = new Image();
				image.src = `data:image/png;base64,${data}`;
				await image.decode();
				const canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				const context = canvas.getContext('2d');
				context.drawImage(image, 0, 0);
				return { width: image.width, height: image.height, data: context.getImageData(0, 0, image.width, image.height).data };
			}
			const a = await decode(reference),
				b = await decode(tile);
			if (a.width !== b.width || a.height !== b.height) throw new Error('Screenshot dimensions differ');
			let differentPixels = 0,
				maskedDifferentPixels = 0,
				maxChannelDelta = 0,
				totalChannelDelta = 0;
			for (let i = 0; i < a.data.length; i += 4) {
				const x = (i / 4) % a.width,
					y = Math.floor(i / 4 / a.width);
				let different = false;
				for (let c = 0; c < 4; c++) {
					const delta = Math.abs(a.data[i + c] - b.data[i + c]);
					maxChannelDelta = Math.max(maxChannelDelta, delta);
					totalChannelDelta += delta;
					if (delta > tolerance) different = true;
				}
				if (different) {
					if (masks.some((r) => x >= r.x && y >= r.y && x < r.x + r.width && y < r.y + r.height)) maskedDifferentPixels++;
					else differentPixels++;
				}
			}
			return { width: a.width, height: a.height, differentPixels, maskedDifferentPixels, maxChannelDelta, meanChannelDelta: totalChannelDelta / a.data.length };
		},
		{ reference: reference.toString('base64'), tile: tile.toString('base64'), masks, tolerance: report.policy.pixelChannelTolerance },
	);
}

try {
	if (process.argv.length > 2) throw new Error('Usage: KUMO_REFERENCE_DEPS=/path/to/isolated/project pnpm --filter @tile-ui/theme-kumo test:reference');
	if (!process.env.KUMO_REFERENCE_DEPS)
		throw new Error(
			'KUMO_REFERENCE_DEPS is required. Install optional dependencies OUTSIDE the repository: npm install --prefix "$KUMO_REFERENCE_DEPS" --no-audit --no-fund ' +
				Object.entries(dependencyVersions)
					.map(([name, version]) => `${name}@${version}`)
					.join(' '),
		);
	const deps = path.resolve(process.env.KUMO_REFERENCE_DEPS);
	const depsRequire = createRequire(path.join(deps, 'package.json'));
	for (const [name, expected] of Object.entries(dependencyVersions)) {
		const actual = packageInfo(deps, name).version;
		assert.equal(actual, expected, `${name}: isolated reference dependency must be ${expected}, got ${actual}`);
		report.dependencies[name] = actual;
	}
	const referenceRoot = path.join(root, '.agents/workspaces/kumo');
	const head = execFileSync('git', ['-C', referenceRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
	assert.equal(head, referenceCommit, 'Reference checkout must match pinned commit');
	const referenceStatus = execFileSync('git', ['-C', referenceRoot, 'status', '--porcelain', '--untracked-files=no', '--', 'packages/kumo/src'], { encoding: 'utf8' }).trim();
	assert.equal(referenceStatus, '', 'Reference source has tracked modifications; refusing an unpinned comparison');
	const referenceSource = path.join(referenceRoot, 'packages/kumo/src');
	const compiledCss = path.join(output, 'reference.css');
	const cssInput = path.join(output, 'consumer.css');
	// Preserve Kumo's documented consumer import order. Explicit sources are
	// essential: hidden workspaces and node_modules are excluded from auto scan.
	fs.writeFileSync(
		cssInput,
		`@import ${JSON.stringify(path.join(referenceSource, 'styles/kumo.css'))};\n@import ${JSON.stringify(path.join(deps, 'node_modules/tailwindcss/index.css'))} source(none);\n@source ${JSON.stringify(referenceSource)};\n@source ${JSON.stringify(fixture)};\n@custom-variant dark (&:where([data-mode="dark"], [data-mode="dark"] *));\n`,
	);
	const cli = path.join(deps, 'node_modules/@tailwindcss/cli/dist/index.mjs');
	const tailwindLog = execFileSync(process.execPath, [cli, '-i', cssInput, '-o', compiledCss], { cwd: output, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
	fs.writeFileSync(path.join(output, 'tailwind.log'), tailwindLog ?? '');
	const appRequire = createRequire(path.join(root, 'apps/solid/package.json'));
	const { createServer } = await import(pathToFileURL(appRequire.resolve('vite')).href);
	const { chromium } = await import('playwright');
	const aliases = [
		{ find: /^react-dom(\/.*)?$/, replacement: path.join(deps, 'node_modules/react-dom') + '$1' },
		{ find: /^react(\/.*)?$/, replacement: path.join(deps, 'node_modules/react') + '$1' },
		{ find: /^@base-ui\/react(\/.*)?$/, replacement: path.join(deps, 'node_modules/@base-ui/react') + '$1' },
		{ find: '@phosphor-icons/react', replacement: depsRequire.resolve('@phosphor-icons/react') },
		{ find: /^cn$/, replacement: depsRequire.resolve('cn') },
		{ find: /^@tile-ui\/core$/, replacement: path.join(fixture, 'tile-core.ts') },
		{ find: '@tile-ui/theme-kumo/theme.scss', replacement: path.join(root, 'packages/themes/kumo/scss/theme.scss') },
		{ find: /^@tile-ui\/styles\/scss\/(.*)$/, replacement: path.join(root, 'packages/styles/scss') + '/$1' },
		{ find: '@reference-css', replacement: compiledCss },
	];
	for (const component of ['button', 'input', 'checkbox', 'switch', 'tabs', 'tooltip']) {
		aliases.push({ find: `@reference/${component}`, replacement: path.join(referenceSource, 'components', component, `${component}.tsx`) });
		aliases.push({ find: `@tile/${component}`, replacement: path.join(root, 'packages/react/src/components', component, `${component}.tsx`) });
	}
	// Vite 8 uses Oxc for JSX; no React/refresh plugin or root installation needed.
	server = await createServer({
		configFile: false,
		root: fixture,
		cacheDir: path.join(output, 'vite-cache'),
		resolve: { alias: aliases, dedupe: ['react', 'react-dom'] },
		oxc: { jsx: { runtime: 'automatic' } },
		css: { preprocessorOptions: { scss: { loadPaths: [path.join(root, 'packages/styles/scss')] } } },
		server: { host: '127.0.0.1', port: 0, fs: { allow: [root, deps, output] } },
		optimizeDeps: { include: ['react', 'react-dom/client'], exclude: ['@tile-ui/core'] },
	});
	await server.listen();
	const url = `http://127.0.0.1:${server.httpServer.address().port}`;
	report.environment.vite = appRequire('vite/package.json').version;
	browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1152, height: 900 },
		deviceScaleFactor: 1,
		locale: 'en-US',
		timezoneId: 'UTC',
		reducedMotion: 'reduce',
		colorScheme: 'light',
	});
	report.environment.browser = browser.version();
	const pages = {};
	for (const library of ['reference', 'tile']) {
		const page = await context.newPage();
		pages[library] = page;
		page.on('pageerror', (error) => finding({ library, check: 'pageerror', message: error.message }));
		page.on('console', (message) => {
			if (message.type() === 'error') finding({ library, check: 'console', message: message.text() });
		});
		await page.goto(`${url}/?library=${library}`, { waitUntil: 'networkidle' });
		await page.waitForFunction(() => window.__kumoReference, { timeout: 30_000 });
		await settle(page);
	}
	for (const mode of ['light', 'dark']) {
		for (const page of Object.values(pages)) {
			await page.evaluate((mode) => window.__kumoReference.setMode(mode), mode);
			await settle(page);
		}
		for (const spec of cases) {
			const comparison = { id: spec.id, mode, sharedGeometry: spec.sharedGeometry, measurements: {}, differences: [], screenshots: {}, masks: [] };
			const images = {};
			for (const [library, page] of Object.entries(pages)) {
				const sample = page.locator(`[data-sample="${spec.id}"]`);
				const target = spec.component === 'tooltip' ? page.locator(targetSelector(spec, library)) : sample.locator(targetSelector(spec, library)).first();
				await page.mouse.move(0, 0);
				await page.evaluate(() => document.activeElement?.blur());
				await sample.scrollIntoViewIfNeeded();
				if (spec.state === 'hover') await target.hover();
				if (spec.state === 'focus') {
					await page.keyboard.press('Tab');
					await target.focus();
				}
				await settle(page);
				comparison.measurements[library] = await measure(target);
				const sampleBox = await sample.boundingBox();
				const targetBox = comparison.measurements[library].rect;
				comparison.measurements[library].relativePosition = { x: targetBox.x - sampleBox.x, y: targetBox.y - sampleBox.y };
				if (pixelMaskReason(spec)) {
					const selector = spec.component === 'checkbox' ? 'svg' : library === 'reference' ? '[data-side] svg' : '[aria-hidden="true"]';
					const glyphs = spec.component === 'checkbox' ? target.locator(selector) : library === 'reference' ? target.locator('svg') : target.locator(selector);
					for (const glyph of await glyphs.all()) {
						const rect = await glyph.boundingBox();
						if (rect)
							comparison.masks.push({
								x: Math.floor(rect.x - sampleBox.x),
								y: Math.floor(rect.y - sampleBox.y),
								width: Math.ceil(rect.width) + 1,
								height: Math.ceil(rect.height) + 1,
							});
					}
				}
				const filename = path.join(output, `${mode}-${spec.id}-${library}.png`);
				images[library] = await sample.screenshot({ path: filename, animations: 'disabled' });
				comparison.screenshots[library] = filename;
				report.screenshots.push(filename);
			}
			const a = comparison.measurements.reference,
				b = comparison.measurements.tile;
			for (const property of [...geometryProperties, ...styleProperties]) {
				if (equalValue(a.styles[property], b.styles[property])) continue;
				if (property === 'boxShadow') {
					// Tailwind reserves invisible shadow slots. Remove only exact
					// transparent zero-sized entries, never visible shadow layers.
					const normalize = (value) => value.replaceAll('rgba(0, 0, 0, 0) 0px 0px 0px 0px, ', '');
					if (normalize(a.styles[property]) === normalize(b.styles[property])) continue;
				}
				const difference = { property, reference: a.styles[property], tile: b.styles[property] };
				const reason = structuralStyleReason(spec, property);
				if (reason) report.exceptions.push({ id: spec.id, mode, ...difference, reason });
				else comparison.differences.push(difference);
			}
			for (const property of ['width', 'height']) {
				if (Math.abs(a.rect[property] - b.rect[property]) > report.policy.geometryTolerancePx)
					comparison.differences.push({ property: `rect.${property}`, reference: a.rect[property], tile: b.rect[property] });
			}
			for (const property of ['x', 'y']) {
				if (Math.abs(a.relativePosition[property] - b.relativePosition[property]) > report.policy.geometryTolerancePx)
					comparison.differences.push({ property: `relativePosition.${property}`, reference: a.relativePosition[property], tile: b.relativePosition[property] });
			}
			if (a.placeholder && JSON.stringify(a.placeholder) !== JSON.stringify(b.placeholder))
				comparison.differences.push({ property: 'placeholder', reference: a.placeholder, tile: b.placeholder });
			comparison.pixels = await comparePixels(pages.reference, images.reference, images.tile, comparison.masks);
			if (comparison.pixels.maskedDifferentPixels)
				report.exceptions.push({
					id: spec.id,
					mode,
					property: 'glyphPixels',
					reason: pixelMaskReason(spec),
					pixels: comparison.pixels.maskedDifferentPixels,
					masks: comparison.masks,
				});
			if (comparison.differences.length || comparison.pixels.differentPixels)
				finding({ id: spec.id, mode, check: 'reference-mismatch', differences: comparison.differences, differentPixels: comparison.pixels.differentPixels });
			report.comparisons.push(comparison);
		}
	}
	report.ok = report.findings.length === 0;
} catch (error) {
	finding({ check: 'runner', message: error.stack ?? String(error) });
} finally {
	await browser?.close();
	await server?.close();
	fs.writeFileSync(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
	console.log(`Kumo reference: ${report.ok ? 'PASS' : 'FAIL'}; ${report.comparisons.length} comparisons; ${report.findings.length} findings.`);
	console.log(`Artifacts and report: ${output}`);
	for (const item of report.findings.slice(0, 12)) console.error(JSON.stringify(item));
	if (!report.ok) process.exitCode = 1;
}
