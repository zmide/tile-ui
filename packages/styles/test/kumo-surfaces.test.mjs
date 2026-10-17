import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import * as sass from 'sass';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const scss = path.join(root, 'packages/styles/scss');
const names =
	'card empty alert table avatar kbd separator skeleton spinner dialog alert-dialog popover tooltip hover-card sheet drawer sonner calendar progress carousel resizable scroll-area aspect-ratio direction attachment bubble message message-scroller marker item'.split(
		' ',
	);
import { kumoModes } from '../../themes/kumo/test/theme-css.mjs';
const compile = (source) => sass.compileString(source, { loadPaths: [scss], style: 'expanded' }).css;
const css = Object.fromEntries(names.map((name) => [name, compile(fs.readFileSync(path.join(scss, `components/${name}.module.scss`), 'utf8'))]));
const declarations = (tokens) =>
	Object.entries(tokens)
		.map(([key, value]) => `--${key}:${value};`)
		.join('');

test('all owned SCSS compiles and theme surface overrides are consumed', () => {
	assert.equal(Object.keys(css).length, 30);
	const combined = Object.values(css).join('\n');
	const prefixes = names.map((name) => `tile-${name === 'sonner' ? 'toast' : name}-`);
	for (const mode of ['light', 'dark']) {
		for (const token of Object.keys(kumoModes[mode]).filter((name) => prefixes.some((prefix) => name.startsWith(prefix)))) {
			assert.ok(combined.includes(`--${token}`), `Unconsumed ${mode} surface override: ${token}`);
		}
	}
});

test('owned modules preserve computed default styles in light and dark', async () => {
	const browser = await chromium.launch({ headless: true });
	try {
		const page = await browser.newPage();
		const theme = sass.compile(path.join(scss, 'theme.scss'), { loadPaths: [scss] }).css;
		const resetMotion = '* { animation: none !important; transition: none !important; }';
		for (const name of names) {
			// Compare against the untouched source, but share the same current default tokens.
			const original = execFileSync('git', ['show', `HEAD:packages/styles/scss/components/${name}.module.scss`], { cwd: root, encoding: 'utf8' });
			const baseline = compile(original);
			const classes = [...new Set([...baseline.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map((match) => match[1]))];
			const fixture =
				classes
					.map(
						(cls) =>
							`<div class="${cls}" data-size="default" data-side="top" data-state="selected" data-today="true" data-type="error">${classes.map((child) => `<div class="${child}">Sample</div>`).join('')}<button class="dayButton">Button</button></div>`,
					)
					.join('') +
				`<div class="root" data-rich-colors="true"><div class="toast" data-type="error"><span class="title">Error</span><span class="description">Description</span><span class="icon">!</span></div></div>`;
			for (const mode of ['light', 'dark']) {
				const snapshot = async (styles) => {
					await page.setContent(`<style>${theme}\n${styles}\n${resetMotion}</style><main class="${mode}">${fixture}</main>`);
					return page.locator('main *').evaluateAll((elements) =>
						elements.map((element) => {
							const style = getComputedStyle(element);
							return Object.fromEntries([...style].filter((key) => !key.startsWith('--')).map((key) => [key, style.getPropertyValue(key)]));
						}),
					);
				};
				const actual = await snapshot(css[name]);
				const expected = await snapshot(baseline);
				const differences = actual.flatMap((style, index) =>
					Object.entries(style)
						.filter(([key, value]) => value !== expected[index][key])
						.map(([key, value]) => ({ index, key, actual: value, expected: expected[index][key] })),
				);
				assert.deepEqual(differences, [], `${name}: ${mode} default regression`);
			}
		}
	} finally {
		await browser.close();
	}
});

test('surface variables switch dynamically and style tooltip arrows, status toasts, and dates', async () => {
	const browser = await chromium.launch({ headless: true });
	try {
		const page = await browser.newPage();
		const modeCSS = ['light', 'dark'].map((mode) => `.${mode},[data-theme="${mode}"]{${declarations(kumoModes[mode])}}`).join('\n');
		// Prefix the local classes to emulate independently scoped CSS Modules without relying on hashes.
		const scoped = (name) => css[name].replace(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g, `.${name}-$1`) + '\n*{transition:none!important}';
		await page.setContent(
			`<style>${modeCSS}\n${['tooltip', 'sonner', 'calendar', 'card', 'dialog'].map(scoped).join('\n')}</style><main class="light"><div class="tooltip-content" data-side="top">Tip<span class="tooltip-arrow"></span></div><div class="sonner-root" data-rich-colors="true"><div class="sonner-toast" data-type="error"><span class="sonner-title">Error</span><span class="sonner-description">Details</span></div></div><button class="calendar-dayButton" data-selected-single="true">16</button><div class="card-card">Card</div><div class="dialog-content">Dialog</div></main>`,
		);
		const read = () =>
			page.evaluate(() => {
				const style = (selector) => getComputedStyle(document.querySelector(selector));
				return {
					background: style('.tooltip-content').backgroundColor,
					arrow: style('.tooltip-arrow').backgroundColor,
					arrowShadow: style('.tooltip-arrow').boxShadow,
					tipSize: style('.tooltip-content').fontSize,
					toast: style('.sonner-toast').backgroundColor,
					toastTitle: style('.sonner-title').color,
					toastDescription: style('.sonner-description').color,
					selected: style('.calendar-dayButton').backgroundColor,
					card: style('.card-card').backgroundColor,
					dialogWidth: style('.dialog-content').maxWidth,
					dialogTop: style('.dialog-content').top,
				};
			});
		const light = await read();
		assert.equal(light.background, light.arrow);
		assert.equal(light.background, light.card);
		assert.notEqual(light.arrowShadow, 'none');
		assert.equal(light.tipSize, '13px');
		assert.notEqual(light.toastTitle, light.toastDescription);
		assert.equal(light.dialogWidth, '384px');
		assert.equal(light.dialogTop, '64px');
		await page.locator('main').evaluate((element) => {
			element.className = 'dark';
		});
		const dark = await read();
		assert.equal(dark.background, dark.arrow);
		assert.notEqual(dark.background, light.background);
		assert.notEqual(dark.selected, light.selected);
		assert.notEqual(dark.toastTitle, light.toastTitle);
		await page.locator('main').evaluate((element) => {
			element.className = '';
			element.dataset.theme = 'light';
		});
		assert.deepEqual(await read(), light);
		await page.locator('main').evaluate((element) => {
			element.dataset.theme = 'dark';
		});
		assert.deepEqual(await read(), dark);
		await page.setViewportSize({ width: 390, height: 844 });
		assert.equal((await read()).dialogTop, '32px');
	} finally {
		await browser.close();
	}
});

test('Sonner rich-color specificity preserves default descendants and per-toast overrides', async () => {
	const browser = await chromium.launch({ headless: true });
	try {
		const page = await browser.newPage();
		const theme = sass.compile(path.join(scss, 'theme.scss'), { loadPaths: [scss] }).css;
		const original = execFileSync('git', ['show', 'HEAD:packages/styles/scss/components/sonner.module.scss'], { cwd: root, encoding: 'utf8' });
		const fixture = ['true', 'false']
			.map(
				(rootRich) =>
					`<div class="root" data-rich-colors="${rootRich}">${['success', 'error', 'info', 'warning'].map((type) => ['inherited', 'true', 'false'].map((rich) => `<div class="toast" data-type="${type}" ${rich === 'inherited' ? '' : `data-rich-colors="${rich}"`}><span class="title">${type}</span><span class="description">Description</span><span class="icon">!</span><button class="close">Close</button></div>`).join('')).join('')}</div>`,
			)
			.join('');
		for (const mode of ['light', 'dark']) {
			const snapshot = async (styles) => {
				await page.setContent(`<style>${theme}\n${styles}\n*{transition:none!important}</style><main class="${mode}">${fixture}</main>`);
				const result = [];
				const toasts = page.locator('.toast');
				for (let index = 0; index < (await toasts.count()); index++) {
					const toast = toasts.nth(index);
					const colors = await toast.evaluate((element) => {
						const rootRich = element.parentElement.dataset.richColors === 'true';
						const rich = element.dataset.richColors === 'true' || (rootRich && element.dataset.richColors !== 'false');
						const color = (target) => getComputedStyle(target).color;
						return {
							rich,
							foreground: color(element),
							description: color(element.querySelector('.description')),
							close: color(element.querySelector('.close')),
							background: getComputedStyle(element).backgroundColor,
							icon: color(element.querySelector('.icon')),
						};
					});
					if (colors.rich) {
						assert.equal(colors.description, colors.foreground);
						assert.equal(colors.close, colors.foreground);
						assert.equal(colors.icon, colors.foreground);
					} else {
						assert.equal(colors.description, mode === 'light' ? 'rgb(113, 113, 122)' : 'rgb(161, 161, 170)');
					}
					await toast.locator('.close').hover({ force: true });
					const hover = await toast.locator('.close').evaluate((element) => getComputedStyle(element).color);
					if (colors.rich) assert.equal(hover, colors.foreground);
					result.push({ ...colors, hover });
				}
				return result;
			};
			assert.deepEqual(await snapshot(css.sonner), await snapshot(compile(original)), `${mode}: rich and non-rich cascade differs from original`);
		}
	} finally {
		await browser.close();
	}
});
