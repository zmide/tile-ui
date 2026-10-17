// This is a mapping of public APIs, not a replacement implementation of Kumo.
export const referenceCommit = '7e0ff40546f08405d05bc9754f0ff0fd009ece0a';

export const dependencyVersions = {
	'@base-ui/react': '1.9.0',
	'@phosphor-icons/react': '2.1.10',
	'@tailwindcss/cli': '4.1.17',
	cn: '0.4.0',
	react: '19.1.0',
	'react-dom': '19.1.0',
	tailwindcss: '4.1.17',
};

export const cases = [
	...['default', 'secondary'].flatMap((variant) =>
		['default', 'xs', 'sm', 'lg'].map((size) => ({ id: `button-${variant}-${size}`, component: 'button', variant, size, state: 'idle', sharedGeometry: true })),
	),
	...['default', 'secondary'].flatMap((variant) =>
		['hover', 'focus', 'disabled'].map((state) => ({ id: `button-${variant}-${state}`, component: 'button', variant, size: 'default', state, sharedGeometry: true })),
	),
	...['default', 'xs', 'sm', 'lg'].map((size) => ({ id: `input-${size}`, component: 'input', size, state: 'idle', sharedGeometry: true })),
	...['placeholder', 'focus', 'disabled'].map((state) => ({ id: `input-${state}`, component: 'input', size: 'default', state, sharedGeometry: true })),
	...['unchecked', 'checked', 'mixed'].map((state) => ({ id: `checkbox-${state}`, component: 'checkbox', state, sharedGeometry: false })),
	...['default', 'sm'].flatMap((size) => ['unchecked', 'checked'].map((state) => ({ id: `switch-${size}-${state}`, component: 'switch', size, state, sharedGeometry: false }))),
	...['default', 'line'].map((variant) => ({ id: `tabs-${variant}`, component: 'tabs', variant, state: 'idle', sharedGeometry: false })),
	{ id: 'tooltip-open', component: 'tooltip', state: 'open', sharedGeometry: false },
];

export const geometryProperties = [
	'width',
	'height',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',
	'borderTopLeftRadius',
	'borderTopRightRadius',
	'borderBottomRightRadius',
	'borderBottomLeftRadius',
	'fontSize',
	'lineHeight',
	'letterSpacing',
	'gap',
];
export const styleProperties = [
	'fontFamily',
	'fontWeight',
	'color',
	'backgroundColor',
	'backgroundImage',
	'borderTopWidth',
	'borderRightWidth',
	'borderBottomWidth',
	'borderLeftWidth',
	'borderTopColor',
	'boxShadow',
	'outlineWidth',
	'outlineColor',
	'outlineOffset',
	'opacity',
	'cornerShape',
];

export function targetSelector(spec, library) {
	if (spec.component === 'input') return 'input';
	if (spec.component === 'checkbox') return '[role="checkbox"]';
	if (spec.component === 'switch') return '[role="switch"]';
	if (spec.component === 'tabs') return '[role="tablist"]';
	if (spec.component === 'tooltip') return library === 'reference' ? '.kumo-tooltip-popup' : '[role="tooltip"]';
	return 'button';
}

// Exact, DOM-specific exceptions only. All other style, geometry and pixel
// differences fail. In particular, different gradient DOM does NOT exempt pixels.
export function structuralStyleReason(spec, property) {
	if (spec.component === 'button' && spec.variant === 'default' && property === 'backgroundImage') {
		return 'Kumo paints its emphasis gradient on an aria-hidden child span; Tile paints it on the button background. The screenshot comparison still checks the complete rendered gradient.';
	}
	if (spec.component === 'button' && spec.variant === 'default' && property === 'boxShadow') {
		return 'Kumo paints the emphasis inset highlight on its aria-hidden gradient child; Tile paints it on the button. The complete rendered shadow remains pixel-gated.';
	}
	return null;
}

export function pixelMaskReason(spec) {
	if (spec.component === 'checkbox' && spec.state !== 'unchecked') {
		return 'The actual Kumo indicator uses a Phosphor filled glyph; Tile uses a stroked SVG path. Only the union of the measured SVG rectangles is excluded from the pixel gate, not the checkbox surface or geometry.';
	}
	if (spec.component === 'tooltip') {
		return 'Kumo uses a three-path SVG tooltip arrow; Tile uses a rotated square. Only the measured arrow rectangles are excluded from the pixel gate; popup paint and placement remain checked.';
	}
	return null;
}
