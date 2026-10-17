import { createRequire } from 'node:module';

const require = createRequire(new URL('../package.json', import.meta.url));
const sass = require('sass');

export const kumoCss = sass.compile(new URL('../scss/theme.scss', import.meta.url).pathname).css;

// Test-only inspection of the compiled stylesheet, not a second token source.
export const kumoModes = Object.fromEntries(
	['light', 'dark'].map((mode) => {
		const block = [...kumoCss.matchAll(/([^{}]+)\{([^{}]+)\}/g)].find(([, selector]) => selector.includes(`.${mode}`));
		if (!block) throw new Error(`Missing Kumo ${mode} rule`);
		return [mode, Object.fromEntries([...block[2].matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]))];
	}),
);
