#!/usr/bin/env node
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = path.join(root, 'tests/theme-visual');
const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'tile-ui-theme-visual-'));
const reportPath = path.join(output, 'report.json');
const frameworks = (process.env.TILE_THEME_FRAMEWORKS ?? 'react,vue,solid').split(',');
const baselineScss = process.env.TILE_THEME_BASELINE_SCSS ? path.resolve(process.env.TILE_THEME_BASELINE_SCSS) : undefined;
const compileOnly = process.argv.includes('--compile-only');
const report = {
	status: 'running',
	environment: {
		browser: 'Chromium',
		viewport: { width: 1280, height: 960 },
		dpr: 1,
		locale: 'en-US',
		timezone: 'UTC',
		reducedMotion: true,
		fixedTime: '2026-01-01T00:00:00.000Z',
	},
	assertions: [],
	screenshots: [],
	scenarios: [],
	errors: [],
	serverLogs: [],
	defaultRegression: {
		status: baselineScss ? 'pending' : 'not-run',
		baselineScss: baselineScss ?? null,
		method: 'computed geometry/styles comparison; screenshots are review artifacts, not pixel diffs',
	},
	actualKumoReference: { status: 'not-run', reason: 'Separate tests/theme-reference fixture; this suite verifies Tile contracts, not screenshot parity with @cloudflare/kumo.' },
	limits: [
		'Chromium only; no committed image baselines or pixel-diff assertions.',
		'Geometry parity covers the listed equivalent controls, not the complete component catalog.',
		'Fixture normalizes the host font to Arial; consumer fonts and nested theme scopes are not covered.',
	],
};
const servers = [];
let browser;
let interrupted = false;
const saveReport = () => fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
const check = (name, predicate, detail) => {
	assert.ok(predicate, `${name}${detail === undefined ? '' : `: ${JSON.stringify(detail)}`}`);
	report.assertions.push(name);
};
const equal = (name, actual, expected) => {
	assert.deepEqual(actual, expected, name);
	report.assertions.push(name);
};

async function stopServers() {
	await Promise.allSettled(
		servers.map(async ({ child }) => {
			if (child.exitCode !== null || child.signalCode !== null) return;
			child.kill('SIGTERM');
			await Promise.race([new Promise((resolve) => child.once('exit', resolve)), delay(3_000)]);
			if (child.exitCode === null && child.signalCode === null) {
				child.kill('SIGKILL');
				await Promise.race([new Promise((resolve) => child.once('exit', resolve)), delay(1_000)]);
			}
		}),
	);
}
async function interrupt(signal) {
	if (interrupted) return;
	interrupted = true;
	report.status = 'interrupted';
	report.error = signal;
	saveReport();
	await browser?.close().catch(() => {});
	await stopServers();
	process.exit(signal === 'SIGINT' ? 130 : 143);
}
process.once('SIGINT', () => void interrupt('SIGINT'));
process.once('SIGTERM', () => void interrupt('SIGTERM'));
// Hard upper bound includes failed navigation / startup, not just assertions.
const watchdog = setTimeout(() => void interrupt('suite timeout (8 minutes)'), 8 * 60_000);
watchdog.unref();

async function startServer(framework, baseline = false) {
	const name = `${framework}${baseline ? '-baseline' : ''}`;
	const serverLog = path.join(output, `${name}-server.log`);
	const cacheDir = path.join(output, `${name}-vite-cache`);
	const log = fs.createWriteStream(serverLog);
	const child = spawn(process.execPath, [path.join(fixture, 'server.mjs'), framework, cacheDir, ...(baseline ? [baselineScss] : [])], {
		cwd: root,
		env: { ...process.env, TZ: 'UTC', CI: '1', NO_COLOR: '1' },
		stdio: ['ignore', 'pipe', 'pipe'],
	});
	servers.push({ child, name });
	report.serverLogs.push(serverLog);
	let outputText = '';
	let startupError;
	child.on('error', (error) => {
		startupError = error;
	});
	child.stdout.on('data', (data) => {
		outputText += data;
		log.write(data);
	});
	child.stderr.on('data', (data) => log.write(data));
	child.once('close', () => log.end());
	const deadline = Date.now() + 60_000;
	while (Date.now() < deadline) {
		if (startupError) throw startupError;
		if (child.exitCode !== null) throw new Error(`${name} Vite exited with ${child.exitCode}; see ${serverLog}`);
		const match = outputText.match(/THEME_FIXTURE_URL=(http:\/\/[^\s]+)/);
		if (match) return match[1].replace(/\/$/, '');
		await delay(100);
	}
	throw new Error(`${name} Vite startup timed out; see ${serverLog}`);
}

const selectors = Object.fromEntries([
	...['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'].map((size) => [`button-${size}`, `[data-fixture="button-${size}"] button`]),
	...['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].map((variant) => [`variant-${variant}`, `[data-fixture="variant-${variant}"] button`]),
	['input', '[data-fixture="input"] input'],
	['checkbox', '[data-fixture="checkbox"] button'],
	['switch', '[data-fixture="switch"] button'],
	['tabs-list', '[data-fixture="tabs"] [role="tablist"]'],
	['tabs-trigger', '[data-fixture="tabs"] [role="tab"]'],
	['select-trigger', '[data-fixture="select"] [role="combobox"]'],
	['chart', '[data-fixture="chart"] svg'],
	['liveline', '[data-fixture="liveline"] canvas'],
]);
const parityKeys = [
	'button-xs',
	'button-sm',
	'button-default',
	'button-lg',
	'button-icon-xs',
	'button-icon-sm',
	'button-icon',
	'button-icon-lg',
	'input',
	'checkbox',
	'switch',
	'tabs-list',
	'tabs-trigger',
	'select-trigger',
	'chart',
	'liveline',
];

async function inspect(page, selector) {
	return page
		.locator(selector)
		.first()
		.evaluate((element) => {
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			const properties = [
				'backgroundColor',
				'backgroundImage',
				'color',
				'borderTopColor',
				'borderTopWidth',
				'borderRadius',
				'boxShadow',
				'outlineColor',
				'outlineWidth',
				'outlineStyle',
				'outlineOffset',
				'fontFamily',
				'fontSize',
				'fontWeight',
				'lineHeight',
				'paddingTop',
				'paddingRight',
				'paddingBottom',
				'paddingLeft',
				'opacity',
			];
			return { width: rect.width, height: rect.height, styles: Object.fromEntries(properties.map((property) => [property, style[property]])) };
		});
}
async function geometry(page) {
	return Object.fromEntries(await Promise.all(Object.entries(selectors).map(async ([name, selector]) => [name, await inspect(page, selector)])));
}
async function settle(page) {
	await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
	// Permit CSS transition completion; reduce-motion is not honored by every component.
	await page.waitForTimeout(250);
}
async function setMode(page, mode, selector = 'class') {
	await page.evaluate(({ mode, selector }) => window.__themeFixture.setMode(mode, selector), { mode, selector });
	await settle(page);
}
async function screenshot(page, name) {
	const target = path.join(output, `${name}.png`);
	await page.screenshot({ path: target, fullPage: true, animations: 'disabled' });
	report.screenshots.push(target);
}

async function accessibility(page, label, scope) {
	if (!(await page.evaluate(() => Boolean(window.axe)))) await page.addScriptTag({ content: axeSource });
	const result = await page.evaluate(async (selector) => {
		const result = await window.axe.run(selector ? document.querySelector(selector) : document, {
			runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
		});
		return { violations: result.violations, incomplete: result.incomplete, passes: result.passes.map((rule) => rule.id) };
	}, scope);
	const artifact = path.join(output, `${label.replaceAll('/', '-')}-axe.json`);
	fs.writeFileSync(artifact, `${JSON.stringify(result, null, 2)}\n`);
	report.accessibility ??= [];
	report.accessibility.push({
		label,
		scope: scope ?? 'document',
		artifact,
		violations: result.violations,
		incomplete: result.incomplete.map((rule) => ({ id: rule.id, nodes: rule.nodes.map((node) => ({ target: node.target, failureSummary: node.failureSummary })) })),
	});
	// Keep collecting every mode/surface and baseline result, but fail the suite below.
	if (result.violations.length === 0) equal(`${label}: axe WCAG A/AA violations`, result.violations, []);
	else console.error(`${label}: ${result.violations.length} axe violation(s); see ${artifact}`);
}
async function canvasState(page) {
	return page.locator('[data-fixture="liveline"] canvas').evaluate((canvas) => {
		const rect = canvas.getBoundingClientRect();
		const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
		let painted = 0;
		let hash = 2166136261;
		for (let index = 0; index < pixels.length; index += 1) {
			hash = Math.imul(hash ^ pixels[index], 16777619);
			if (index % 4 === 3 && pixels[index] !== 0) painted += 1;
		}
		return { width: canvas.width, height: canvas.height, cssWidth: rect.width, cssHeight: rect.height, painted, hash: (hash >>> 0).toString(16) };
	});
}
async function themeState(page) {
	return page.evaluate(() => {
		const root = getComputedStyle(document.documentElement);
		return {
			marker: root.getPropertyValue('--tile-color-mode').trim(),
			scheme: root.colorScheme,
			background: getComputedStyle(document.body).backgroundColor,
			foreground: getComputedStyle(document.body).color,
			variables: Object.fromEntries(['--background', '--foreground', '--border', '--ring', '--chart-1'].map((name) => [name, root.getPropertyValue(name).trim()])),
		};
	});
}
async function remember(page, selector) {
	await page
		.locator(selector)
		.first()
		.evaluate((element) => {
			window.__rememberedThemeNode = element;
		});
}
async function sameNode(page, selector, label) {
	check(
		label,
		await page
			.locator(selector)
			.first()
			.evaluate((element) => element === window.__rememberedThemeNode),
	);
}
function compareGeometry(name, before, after, keys = Object.keys(before), styles = false) {
	for (const key of keys) {
		for (const dimension of ['width', 'height'])
			check(`${name}: ${key} ${dimension}`, Math.abs(before[key][dimension] - after[key][dimension]) <= 0.25, {
				before: before[key][dimension],
				after: after[key][dimension],
			});
		if (styles) equal(`${name}: ${key} computed styles`, after[key].styles, before[key].styles);
	}
}

async function newPage(url, framework, theme, mode, baseline = false) {
	const context = await browser.newContext({
		viewport: report.environment.viewport,
		deviceScaleFactor: 1,
		locale: 'en-US',
		timezoneId: 'UTC',
		reducedMotion: 'reduce',
		colorScheme: 'light',
	});
	const page = await context.newPage();
	page.setDefaultTimeout(12_000);
	page.setDefaultNavigationTimeout(45_000);
	const prefix = `${framework}/${baseline ? 'baseline-' : ''}${theme}/${mode}`;
	page.on('pageerror', (error) => report.errors.push({ scenario: prefix, type: 'pageerror', message: error.message }));
	page.on('console', (message) => {
		if (message.type() === 'error') report.errors.push({ scenario: prefix, type: 'console', message: message.text() });
	});
	page.on('requestfailed', (request) => report.errors.push({ scenario: prefix, type: 'requestfailed', message: `${request.url()}: ${request.failure()?.errorText}` }));
	page.on('response', (response) => {
		if (response.status() >= 400) report.errors.push({ scenario: prefix, type: 'http', message: `${response.status()} ${response.url()}` });
	});
	await page.clock.setFixedTime(new Date(report.environment.fixedTime));
	await page.goto(`${url}/${theme}/${mode}`, { waitUntil: 'networkidle' });
	await page.waitForFunction((name) => document.documentElement.dataset.fixtureReady === name, framework);
	await page.locator('[data-fixture="liveline"] canvas').waitFor();
	await settle(page);
	return { context, page, prefix };
}

async function checkIndicator(page, name, theme) {
	const indicator = page.locator('[data-fixture="tabs"] [data-slot="tabs-indicator"]');
	equal(`${name}: one inert tabs indicator`, await indicator.count(), 1);
	equal(`${name}: indicator aria-hidden`, await indicator.getAttribute('aria-hidden'), 'true');
	if (theme === 'default') {
		equal(`${name}: default indicator does not change layout`, await indicator.evaluate((node) => getComputedStyle(node).display), 'none');
		return;
	}
	const box = await indicator.boundingBox();
	const active = await page.locator('[data-fixture="tabs"] [role="tab"][aria-selected="true"]').boundingBox();
	check(`${name}: Kumo indicator is visible`, Boolean(box && active && box.width > 0 && box.height > 0));
	for (const dimension of ['x', 'y', 'width', 'height'])
		check(`${name}: indicator aligns ${dimension}`, Math.abs(box[dimension] - active[dimension]) <= 0.75, { indicator: box, active });
}

async function surfaceSnapshot(page, prefix, mode) {
	const surfaces = {};
	await page.locator('[data-fixture="dialog-trigger"]').click();
	await page.locator('[data-fixture="dialog-content"]').waitFor();
	await settle(page);
	surfaces.dialog = await inspect(page, '[data-fixture="dialog-content"]');
	await screenshot(page, `${prefix}-${mode}-dialog`);
	await page.keyboard.press('Escape');
	await page.locator('[data-fixture="dialog-content"]').waitFor({ state: 'hidden' });
	await page.locator('[data-fixture="select"] [role="combobox"]').click();
	await page.locator('[data-fixture="select-content"]').waitFor();
	await settle(page);
	surfaces.select = await inspect(page, '[data-fixture="select-content"]');
	await screenshot(page, `${prefix}-${mode}-select`);
	// Baseline snapshots test styling, not adapter keyboard behavior against old CSS.
	await page.locator('[data-fixture="select-content"] [role="option"]').first().click();
	await page.locator('[data-fixture="select-content"]').waitFor({ state: 'hidden' });
	await page.mouse.move(0, 0);
	await page.locator('[data-fixture="tooltip-trigger"]').focus();
	await page.locator('[data-fixture="tooltip-content"]').waitFor();
	await settle(page);
	surfaces.tooltip = await inspect(page, '[data-fixture="tooltip-content"]');
	await screenshot(page, `${prefix}-${mode}-tooltip`);
	await page.locator('[data-fixture="input"] input').focus();
	await page.locator('[data-fixture="tooltip-content"]').waitFor({ state: 'hidden' });
	await page.evaluate(() => window.__themeFixture.showToast());
	await page.locator('[data-slot="toast"]').waitFor();
	await settle(page);
	surfaces.toast = await inspect(page, '[data-slot="toast"]');
	await screenshot(page, `${prefix}-${mode}-toast`);
	await page.evaluate(() => window.__themeFixture.dismissToasts());
	return surfaces;
}

async function runScenario(url, framework, theme, initialMode, baseline = false) {
	const { page, context, prefix } = await newPage(url, framework, theme, initialMode, baseline);
	const label = prefix;
	try {
		const initial = await themeState(page);
		equal(`${label}: CSS color-scheme`, initial.scheme, initialMode);
		if (theme === 'kumo') equal(`${label}: color-mode marker`, initial.marker, initialMode);
		for (const [name, value] of Object.entries(initial.variables)) check(`${label}: ${name} defined`, value.length > 0);
		const initialGeometry = await geometry(page);
		for (const [name, box] of Object.entries(initialGeometry)) check(`${label}: ${name} nonzero geometry`, box.width > 0 && box.height > 0);
		const expected = theme === 'kumo' ? { xs: 20, sm: 26, default: 36, lg: 40 } : { xs: 24, sm: 32, default: 36, lg: 40 };
		for (const [size, height] of Object.entries(expected)) equal(`${label}: button-${size} height contract`, initialGeometry[`button-${size}`].height, height);
		for (const size of ['icon-xs', 'icon-sm', 'icon', 'icon-lg'])
			equal(`${label}: ${size} square`, initialGeometry[`button-${size}`].width, initialGeometry[`button-${size}`].height);
		equal(`${label}: disabled button`, await page.locator('[data-fixture="disabled"] button').isDisabled(), true);
		if (!baseline) await checkIndicator(page, label, theme);
		const initialCanvas = await canvasState(page);
		check(`${label}: canvas is painted`, initialCanvas.painted > 100, initialCanvas);
		equal(`${label}: canvas backing width`, initialCanvas.width, Math.round(initialCanvas.cssWidth));
		equal(`${label}: canvas backing height`, initialCanvas.height, Math.round(initialCanvas.cssHeight));
		await screenshot(page, `${framework}-${baseline ? 'baseline-' : ''}${theme}-${initialMode}`);
		if (theme === 'kumo' && !baseline) await accessibility(page, `${label}/initial`);
		if (baseline) return { geometry: initialGeometry, surfaces: await surfaceSnapshot(page, `${framework}-baseline-default`, initialMode), theme: initial };

		// Uncontrolled component state is deliberately used, so remounts would be observable.
		await page.locator('[data-fixture="checkbox"] button').click();
		await page.locator('[data-fixture="switch"] button').click();
		await page.getByRole('tab', { name: 'Analytics', exact: true }).click();
		await settle(page);
		await checkIndicator(page, `${label}: selected`, theme);
		const inputSelector = '[data-fixture="input"] input';
		await page.locator(inputSelector).fill('Keep this input selection');
		await page.locator(inputSelector).evaluate((input) => {
			input.focus();
			input.setSelectionRange(5, 14, 'forward');
		});
		await remember(page, inputSelector);
		const focusedBefore = await inspect(page, inputSelector);
		check(`${label}: input focus ring`, focusedBefore.styles.boxShadow !== 'none' || focusedBefore.styles.outlineStyle !== 'none');
		const oppositeMode = initialMode === 'light' ? 'dark' : 'light';
		await setMode(page, oppositeMode, 'data-theme');
		const opposite = await themeState(page);
		equal(`${label}: data-theme mode`, opposite.scheme, oppositeMode);
		if (theme === 'kumo') equal(`${label}: data-theme marker`, opposite.marker, oppositeMode);
		check(`${label}: background changes`, initial.background !== opposite.background);
		check(`${label}: foreground changes`, initial.foreground !== opposite.foreground);
		await sameNode(page, inputSelector, `${label}: mode preserves input node`);
		equal(
			`${label}: input value/focus/selection survive`,
			await page.locator(inputSelector).evaluate((input) => ({
				value: input.value,
				start: input.selectionStart,
				end: input.selectionEnd,
				direction: input.selectionDirection,
				focused: document.activeElement === input,
			})),
			{ value: 'Keep this input selection', start: 5, end: 14, direction: 'forward', focused: true },
		);
		equal(`${label}: checkbox checked survives`, await page.locator('[data-fixture="checkbox"] button').getAttribute('aria-checked'), 'true');
		equal(`${label}: switch checked survives`, await page.locator('[data-fixture="switch"] button').getAttribute('aria-checked'), 'true');
		equal(`${label}: selected tab survives`, await page.getByRole('tab', { name: 'Analytics', exact: true }).getAttribute('aria-selected'), 'true');
		compareGeometry(`${label}: mode preserves geometry`, initialGeometry, await geometry(page));
		const focusedAfter = await inspect(page, inputSelector);
		check(
			`${label}: ring responds to mode`,
			focusedBefore.styles.boxShadow !== focusedAfter.styles.boxShadow || focusedBefore.styles.outlineColor !== focusedAfter.styles.outlineColor,
		);
		const oppositeCanvas = await canvasState(page);
		check(`${label}: canvas repaints on root mode`, oppositeCanvas.hash !== initialCanvas.hash && oppositeCanvas.painted > 100, { initialCanvas, oppositeCanvas });
		equal(`${label}: canvas backing dimensions survive`, [oppositeCanvas.width, oppositeCanvas.height], [initialCanvas.width, initialCanvas.height]);
		const initialStroke = await page
			.locator('[data-fixture="chart"] svg path[stroke]')
			.first()
			.evaluate((node) => getComputedStyle(node).stroke);
		await setMode(page, initialMode);
		const resetStroke = await page
			.locator('[data-fixture="chart"] svg path[stroke]')
			.first()
			.evaluate((node) => getComputedStyle(node).stroke);
		check(`${label}: chart semantic stroke follows root mode`, resetStroke !== initialStroke, { resetStroke, initialStroke });
		await screenshot(page, `${framework}-${theme}-${initialMode}-state-preserved`);

		const surfaceResults = {};
		for (const surface of ['dialog', 'select', 'tooltip', 'toast']) {
			await setMode(page, initialMode);
			let selector;
			if (surface === 'dialog') {
				await page.locator('[data-fixture="dialog-trigger"]').click();
				selector = '[data-fixture="dialog-content"]';
			} else if (surface === 'select') {
				await page.locator('[data-fixture="select"] [role="combobox"]').click();
				selector = '[data-fixture="select-content"]';
			} else if (surface === 'tooltip') {
				// Keep hover transitions from scheduling a close while testing keyboard focus.
				await page.mouse.move(0, 0);
				await page.locator('[data-fixture="tooltip-trigger"]').focus();
				selector = '[data-fixture="tooltip-content"]';
			} else {
				await page.locator(inputSelector).focus();
				await page.evaluate(() => window.__themeFixture.showToast());
				selector = '[data-slot="toast"]';
			}
			await page.locator(selector).waitFor();
			await settle(page);
			if (theme === 'kumo' && (surface === 'dialog' || surface === 'select')) await accessibility(page, `${label}/${surface}`, selector);
			if (surface !== 'toast')
				check(`${label}: ${surface} escapes isolated app root`, await page.locator(selector).evaluate((node) => !document.getElementById('fixture-root').contains(node)));
			await remember(page, selector);
			const before = await inspect(page, selector);
			surfaceResults[surface] = before;
			if (surface === 'dialog') {
				await page.locator('[data-fixture="dialog-input"] input').fill('Portal state survives');
				await page.locator('[data-fixture="dialog-input"] input').evaluate((input) => {
					input.focus();
					input.setSelectionRange(2, 9);
				});
			}
			const activeBefore = await page.evaluate(() => {
				window.__themeActiveNode = document.activeElement;
				return Boolean(document.activeElement);
			});
			check(`${label}: ${surface} has active element`, activeBefore);
			await setMode(page, oppositeMode, 'data-theme');
			await sameNode(page, selector, `${label}: ${surface} remains open and mounted`);
			check(`${label}: ${surface} preserves focus`, await page.evaluate(() => document.activeElement === window.__themeActiveNode));
			const after = await inspect(page, selector);
			compareGeometry(`${label}: ${surface} mode geometry`, { surface: before }, { surface: after });
			check(
				`${label}: ${surface} theme changes`,
				before.styles.backgroundColor !== after.styles.backgroundColor || before.styles.color !== after.styles.color || before.styles.boxShadow !== after.styles.boxShadow,
			);
			if (surface === 'dialog')
				equal(
					`${label}: dialog input selection survives`,
					await page.locator('[data-fixture="dialog-input"] input').evaluate((input) => ({ value: input.value, start: input.selectionStart, end: input.selectionEnd })),
					{ value: 'Portal state survives', start: 2, end: 9 },
				);
			await screenshot(page, `${framework}-${theme}-${initialMode}-${surface}-toggled`);
			if (surface === 'toast') await page.evaluate(() => window.__themeFixture.dismissToasts());
			else {
				await page.keyboard.press('Escape');
				await page.locator(selector).waitFor({ state: 'hidden' });
			}
		}
		await setMode(page, initialMode);
		await page.locator(inputSelector).blur();
		await page.setViewportSize({ width: 375, height: 844 });
		await settle(page);
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
		check(`${label}: mobile has no horizontal overflow`, overflow <= 1, overflow);
		await screenshot(page, `${framework}-${theme}-${initialMode}-mobile`);
		const result = { geometry: initialGeometry, surfaces: surfaceResults, themeState: initial, canvas: { initial: initialCanvas, opposite: oppositeCanvas } };
		report.scenarios.push({ framework, theme, initialMode, ...result });
		return result;
	} finally {
		await context.close();
	}
}

try {
	for (const framework of frameworks) check(`valid framework ${framework}`, ['react', 'vue', 'solid'].includes(framework));
	if (baselineScss) check('baseline SCSS exists', fs.existsSync(path.join(baselineScss, 'theme.scss')));
	const urls = Object.fromEntries(await Promise.all(frameworks.map(async (framework) => [framework, await startServer(framework)])));
	if (compileOnly) {
		for (const framework of frameworks) {
			const response = await fetch(`${urls[framework]}/default/light`);
			check(`${framework}: fixture HTML compiles`, response.ok);
			const entry = `${urls[framework]}/@fs/${path.join(fixture, `${framework}.${framework === 'vue' ? 'ts' : 'tsx'}`)}`;
			const compiled = await fetch(entry);
			check(`${framework}: fixture entry transforms`, compiled.ok, await compiled.text());
		}
		report.status = 'compile-only';
		report.limits.push('Compile-only: no browser assertions were executed, and transitive component CSS was not exhaustively compiled.');
	} else {
		check('Kumo entry is ready', fs.existsSync(path.join(root, 'packages/themes/kumo/scss/theme.scss')));
		browser = await chromium.launch({ headless: true });
		const results = {};
		for (const framework of frameworks) {
			results[framework] = {};
			for (const theme of ['default', 'kumo'])
				for (const mode of ['light', 'dark']) {
					console.log(`Checking ${framework}/${theme}/${mode}`);
					results[framework][`${theme}/${mode}`] = await runScenario(urls[framework], framework, theme, mode);
				}
		}
		for (const theme of ['default', 'kumo'])
			for (const mode of ['light', 'dark'])
				for (const framework of frameworks.slice(1))
					compareGeometry(
						`framework parity ${theme}/${mode} ${framework} vs ${frameworks[0]}`,
						results[frameworks[0]][`${theme}/${mode}`].geometry,
						results[framework][`${theme}/${mode}`].geometry,
						parityKeys,
					);
		for (const framework of frameworks)
			check(
				`${framework}: separate theme entry changes button geometry`,
				results[framework]['default/light'].geometry['button-xs'].height !== results[framework]['kumo/light'].geometry['button-xs'].height,
			);
		if (baselineScss) {
			for (const framework of frameworks) {
				const baselineUrl = await startServer(framework, true);
				for (const mode of ['light', 'dark']) {
					console.log(`Comparing ${framework}/default/${mode} with original SCSS`);
					const baseline = await runScenario(baselineUrl, framework, 'default', mode, true);
					const current = results[framework][`default/${mode}`];
					compareGeometry(`default regression ${framework}/${mode}`, baseline.geometry, current.geometry, Object.keys(selectors), true);
					compareGeometry(`default floating regression ${framework}/${mode}`, baseline.surfaces, current.surfaces, Object.keys(baseline.surfaces), true);
				}
			}
			report.defaultRegression.status = 'passed';
		}
		equal('no browser runtime/console/network errors', report.errors, []);
		equal(
			'all Kumo axe scans have no WCAG A/AA violations',
			(report.accessibility ?? []).filter((scan) => scan.violations.length > 0).map((scan) => ({ label: scan.label, violations: scan.violations })),
			[],
		);
		report.status = 'passed';
	}
	saveReport();
	console.log(`Theme visual ${report.status}: ${report.assertions.length} assertions.`);
	console.log(`Artifacts: ${output}`);
	console.log(`Report: ${reportPath}`);
} catch (error) {
	report.status = 'failed';
	report.error = error.stack ?? String(error);
	saveReport();
	console.error(error);
	console.error(`Artifacts and server logs: ${output}`);
	process.exitCode = 1;
} finally {
	clearTimeout(watchdog);
	await browser?.close().catch(() => {});
	await stopServers();
}
