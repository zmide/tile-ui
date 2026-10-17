import assert from 'node:assert/strict';
import test from 'node:test';
import { cases, targetSelector, structuralStyleReason, pixelMaskReason } from './cases.mjs';

test('reference matrix includes both button mappings and all shared sizes', () => {
	assert.equal(new Set(cases.map(({ id }) => id)).size, cases.length);
	for (const variant of ['default', 'secondary']) {
		for (const size of ['default', 'xs', 'sm', 'lg']) {
			assert.ok(cases.some((spec) => spec.component === 'button' && spec.variant === variant && spec.size === size && spec.state === 'idle' && spec.sharedGeometry));
		}
	}
	assert.ok(cases.some((spec) => spec.id === 'input-default' && spec.sharedGeometry));
});

test('structural exceptions never excuse basic geometry or whole component pixels', () => {
	for (const spec of cases) {
		for (const property of ['width', 'height', 'paddingLeft', 'fontSize', 'color', 'opacity']) assert.equal(structuralStyleReason(spec, property), null);
		if (spec.component === 'button' || spec.component === 'input' || spec.component === 'switch' || spec.component === 'tabs') assert.equal(pixelMaskReason(spec), null);
	}
});

test('portaled tooltip and bare input use real component selectors', () => {
	assert.equal(targetSelector({ component: 'tooltip' }, 'reference'), '.kumo-tooltip-popup');
	assert.equal(targetSelector({ component: 'tooltip' }, 'tile'), '[role="tooltip"]');
	assert.equal(targetSelector({ component: 'input' }, 'reference'), 'input');
});
