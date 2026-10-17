import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import * as sass from 'sass';
import { kumoCss, kumoModes } from './theme-css.mjs';

const directory = new URL('../', import.meta.url);

test('standalone Sass has only relative internal dependencies and ships its license', () => {
	const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'tile-theme-sass-'));
	try {
		fs.cpSync(new URL('scss', directory), temporary, { recursive: true });
		assert.equal(sass.compile(path.join(temporary, 'theme.scss')).css, kumoCss);
		assert.doesNotMatch(kumoCss, /@(?:import|font-face)|box-sizing\s*:|(?:^|[;{])\s*margin\s*:/);
		assert.match(fs.readFileSync(new URL('LICENSE', directory), 'utf8'), /Copyright \(c\) 2026 Cloudflare, Inc\./);
		const manifest = JSON.parse(fs.readFileSync(new URL('package.json', directory), 'utf8'));
		assert.deepEqual(manifest.exports, { './theme.css': './dist/theme.css', './theme.scss': './scss/theme.scss' });
	} finally {
		fs.rmSync(temporary, { recursive: true, force: true });
	}
});

test('both modes provide complete, nonempty and acyclic aliases', () => {
	assert.deepEqual(Object.keys(kumoModes.light).sort(), Object.keys(kumoModes.dark).sort());
	for (const [mode, values] of Object.entries(kumoModes)) {
		assert.equal(values['tile-color-mode'], mode);
		const complete = new Set();
		function visit(name, ancestors = []) {
			assert.ok(!ancestors.includes(name), `Circular alias: ${[...ancestors, name].join(' -> ')}`);
			assert.ok(name in values, `Missing alias: ${name}`);
			assert.ok(values[name].trim());
			if (complete.has(name)) return;
			for (const [, dependency, separator] of values[name].matchAll(/var\(--([\w-]+)\s*([,)])/g)) {
				if (separator === ',' && !(dependency in values)) continue;
				visit(dependency, [...ancestors, name]);
			}
			complete.add(name);
		}
		for (const name of Object.keys(values)) visit(name);
	}
	assert.match(kumoCss, /:root,/);
	for (const mode of ['light', 'dark']) {
		assert.match(kumoCss, new RegExp(`color-scheme: ${mode}`));
		assert.ok(kumoCss.includes(`[data-theme=${mode}]`));
	}
});

test('retains effective palette, typography and accessibility corrections', () => {
	assert.equal(kumoModes.light['tile-surface-base'], '#fff');
	assert.equal(kumoModes.dark['tile-surface-base'], 'oklch(17% 0 0)');
	assert.equal(kumoModes.light['tile-text-base'], '14px');
	assert.equal(kumoModes.light['tile-text-brand'], '#f6821f');
	assert.equal(kumoModes.dark['tile-button-link-color'], 'var(--tile-text-link)');
	const values = kumoModes.light;
	assert.match(values['tile-button-default-background-image'], /linear-gradient\(to bottom/);
	assert.match(values['tile-button-default-shadow'], /inset 0 1px 0 0/);
	assert.notEqual(values['tile-button-default-hover-background-image'], values['tile-button-default-background-image']);
	assert.equal(values['tile-checkbox-checked-background'], 'var(--tile-contrast)');
	assert.deepEqual(
		['xs', 'sm', '', 'lg'].map((size) => values[`tile-input-${size ? `${size}-` : ''}height`]),
		['1.25rem', '1.625rem', '2.25rem', '2.5rem'],
	);
	assert.equal(values['tile-switch-width'], '2.25rem');
	assert.equal(values['tile-switch-height'], '1.125rem');
	assert.equal(values['tile-chart-font-size'], '13px');
	assert.equal(values['tile-chart-grid-color'], 'var(--tile-hairline)');
	assert.equal(values['tile-chart-tooltip-background'], 'var(--tile-surface-base)');
	assert.equal(values['tile-chart-tooltip-border'], 'var(--tile-line)');
	assert.equal(values['tile-liveline-control-font'], '400 13px/20px var(--tile-font-sans)');
	assert.equal(values['tile-liveline-control-foreground'], 'var(--tile-text-subtle)');
	assert.equal(values['tile-liveline-control-active-foreground'], 'var(--tile-text-default)');
	assert.equal(values['tile-liveline-value-font'], 'var(--tile-font-mono)');
});

test('theme satisfies shared component variable interfaces without owning component behavior', () => {
	const styles = new URL('../../styles/scss/', directory);
	const defaults = ['tokens.scss', 'theme.scss', 'variables/_colors.scss'].map((name) => fs.readFileSync(new URL(name, styles), 'utf8')).join('\n');
	const defaultNames = new Set([...defaults.matchAll(/--([\w-]+)/g)].map((match) => match[1]));
	for (const name of fs.readdirSync(new URL('components/', styles)).filter((name) => name.endsWith('.scss'))) {
		const source = fs.readFileSync(new URL(`components/${name}`, styles), 'utf8');
		const localNames = new Set([...source.matchAll(/--([\w-]+)\s*:/g)].map((match) => match[1]));
		for (const [, token] of source.matchAll(/var\(--(tile-[\w-]+)\s*\)/g)) {
			if (token.startsWith('tile-tabs-indicator-') || token === 'tile-aspect-ratio-padding') continue;
			assert.ok(defaultNames.has(token) || token in kumoModes.light || localNames.has(token), `${name}: missing ${token}`);
		}
	}
});
