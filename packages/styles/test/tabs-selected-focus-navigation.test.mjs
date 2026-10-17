import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { chromium } from 'playwright';

const require = createRequire(new URL('../../react/package.json', import.meta.url));
const sass = require('sass');
const root = new URL('../../../', import.meta.url);
const css = sass.compile(new URL('packages/styles/scss/components/tabs.module.scss', root).pathname, {
	loadPaths: [new URL('packages/styles/scss', root).pathname],
}).css;
import { kumoModes } from '../../themes/kumo/test/theme-css.mjs';
const declarations = (tokens) =>
	Object.entries(tokens)
		.map(([key, value]) => `--${key}:${value};`)
		.join('');

test('Kumo tab geometry matches the measured reference and inactive light text passes contrast', async () => {
	const browser = await chromium.launch({ headless: true });
	try {
		const page = await browser.newPage();
		for (const mode of ['light', 'dark']) {
			for (const variant of ['default', 'line']) {
				const tokens = kumoModes[mode];
				await page.setContent(`<style>:root{${declarations(tokens)}}*{box-sizing:border-box}body{font-family:var(--tile-font-sans);font-size:14px;line-height:1.5;background:var(--background)}button{font:inherit;margin:0;padding:0;background:transparent;border:0}${css}</style>
					<div class="root"><div class="list ${variant === 'line' ? 'variantLine' : ''}" role="tablist" data-orientation="horizontal"><button class="trigger" role="tab" aria-selected="true" data-state="active">Overview</button><button class="trigger" role="tab" aria-selected="false" data-state="inactive">Settings</button></div></div>`);
				const measured = await page.locator('.list').evaluate((list) => ({
					width: list.getBoundingClientRect().width,
					height: list.getBoundingClientRect().height,
					triggerWidth: list.firstElementChild.getBoundingClientRect().width,
					triggerHeight: list.firstElementChild.getBoundingClientRect().height,
				}));
				assert.ok(Math.abs(measured.width - (variant === 'line' ? 164.609375 : 160.609375)) < 0.1, `${mode}/${variant}: reference list width`);
				assert.equal(measured.height, variant === 'line' ? 30 : 36);
				assert.ok(Math.abs(measured.triggerWidth - (variant === 'line' ? 77.6719 : 81.6719)) < 0.1, `${mode}/${variant}: reference trigger width`);
				assert.equal(measured.triggerHeight, variant === 'line' ? 24 : 32);
				await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
				const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['color-contrast'] })).violations);
				assert.deepEqual(violations, [], `${mode}/${variant}: axe color contrast`);
			}
		}
	} finally {
		await browser.close();
	}
});

test('selected tabs retain keyboard focus in both Kumo variants without changing default shadows', async () => {
	const browser = await chromium.launch({ headless: true });
	try {
		const page = await browser.newPage();
		for (const mode of ['original', 'light', 'dark']) {
			for (const variant of ['default', 'line']) {
				const tokens = mode === 'original' ? { background: '#fff', foreground: '#111', ring: '#222', 'tile-shadow-color': '0 0 0' } : kumoModes[mode];
				await page.setContent(`<style>:root{${declarations(tokens)}}${css}button{transition:none!important}</style>
					<div class="list ${variant === 'line' ? 'variantLine' : ''}" role="tablist" data-orientation="horizontal">
					<button class="trigger" role="tab" aria-selected="true" data-state="active">Selected</button></div>`);
				const before = await page.locator('button').evaluate((button) => getComputedStyle(button).boxShadow);
				await page.keyboard.press('Tab');
				const focused = await page.locator('button').evaluate((button) => ({
					visible: button.matches(':focus-visible'),
					shadow: getComputedStyle(button).boxShadow,
				}));
				assert.equal(focused.visible, true, `${mode}/${variant}: actual keyboard focus`);
				if (mode === 'original') {
					assert.equal(focused.shadow, before, `${variant}: original selected shadow is unchanged`);
					assert.equal(variant === 'line' ? focused.shadow === 'none' : focused.shadow.includes('2px'), true);
				} else {
					assert.notEqual(focused.shadow, 'none', `${mode}/${variant}: visible focus shadow`);
					assert.ok(focused.shadow.includes('inset') && focused.shadow.includes('2px'), `${mode}/${variant}: inset 2px focus ring`);
					const expected = await page.locator('button').evaluate((button) => {
						const probe = document.createElement('span');
						probe.style.boxShadow = 'inset 0 0 0 2px var(--tile-brand)';
						button.append(probe);
						const shadow = getComputedStyle(probe).boxShadow;
						probe.remove();
						return shadow;
					});
					assert.equal(focused.shadow, expected, `${mode}/${variant}: uses brand focus color`);
				}
			}
		}
	} finally {
		await browser.close();
	}
});
