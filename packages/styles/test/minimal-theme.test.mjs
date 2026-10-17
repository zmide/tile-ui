import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as sass from 'sass';
import { chromium } from 'playwright';

test('a new Sass-only theme changes component visuals and modes in either import order', async () => {
	const component = sass.compile(new URL('../scss/components/button.module.scss', import.meta.url).pathname, {
		loadPaths: [new URL('../scss', import.meta.url).pathname],
	}).css;
	const theme = sass.compileString(`
		:root, .light { --primary: #14604a; --primary-foreground: #fff; }
		.dark { --primary: #f0c060; --primary-foreground: #171717; }
		:root { --tile-button-height: 48px; --tile-button-radius: 18px; --tile-button-font-size: 18px; --tile-button-default-shadow: 0 3px 0 #123; }
	`).css;
	const browser = await chromium.launch({ headless: true });
	try {
		const page = await browser.newPage();
		for (const styles of [theme + component, component + theme]) {
			await page.setContent(`<style>${styles}button{transition:none!important}</style><button class="button sizeDefault variantDefault">Sample</button>`);
			const read = () =>
				page.locator('button').evaluate((element) => {
					const style = getComputedStyle(element);
					return { height: style.height, radius: style.borderRadius, font: style.fontSize, shadow: style.boxShadow, background: style.backgroundColor };
				});
			const light = await read();
			assert.equal(light.height, '48px');
			assert.equal(light.radius, '18px');
			assert.equal(light.font, '18px');
			assert.match(light.shadow, /3px/);
			assert.equal(light.background, 'rgb(20, 96, 74)');
			await page.evaluate(() => (document.documentElement.className = 'dark'));
			assert.equal((await read()).background, 'rgb(240, 192, 96)');
			await page.evaluate(() => (document.documentElement.className = 'light'));
			assert.deepEqual(await read(), light);
		}
	} finally {
		await browser.close();
	}
});
