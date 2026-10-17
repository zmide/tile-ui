import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildCoreClosureSource } from '../../src/registry/presets/core-source';

const workspaceRoot = path.resolve(__dirname, '../../../..');

describe('tabs indicator registry closure', () => {
	it.each(['react', 'vue', 'solid'])('includes the framework-neutral browser helper for %s without cross-package imports', (framework) => {
		const source = buildCoreClosureSource(workspaceRoot, [path.join(workspaceRoot, `packages/${framework}/src/components/tabs/tabs.tsx`)]);
		expect(source).toContain('export function observeTabsIndicator(');
		expect(source).toContain('export function getTabsState(');
		expect(source).not.toMatch(/from ['"].*tabs\.indicator/);
		expect(source).not.toContain('@tile-ui/core');
	});
});
