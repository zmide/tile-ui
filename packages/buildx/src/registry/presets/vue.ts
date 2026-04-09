import fs from 'node:fs';
import path from 'node:path';

import type { RegistryBuildOptions, VirtualRegistryFile } from '../types';
import { transformVueFile } from '../transforms/vue';

function read(workspaceRoot: string, relativePath: string) {
	return fs.readFileSync(path.resolve(workspaceRoot, relativePath), 'utf-8');
}

function stripImport(content: string, statement: string) {
	return content.replace(statement, '');
}

function buildVueCore(workspaceRoot: string) {
	const buttonTypes = read(workspaceRoot, 'packages/core/src/components/button/button.types.ts');
	const buttonLogic = read(workspaceRoot, 'packages/core/src/components/button/button.logic.ts');
	const inputTypes = read(workspaceRoot, 'packages/core/src/components/input/input.types.ts');
	const inputLogic = read(workspaceRoot, 'packages/core/src/components/input/input.logic.ts');
	const textareaTypes = read(workspaceRoot, 'packages/core/src/components/textarea/textarea.types.ts');
	const textareaLogic = read(workspaceRoot, 'packages/core/src/components/textarea/textarea.logic.ts');
	const labelTypes = read(workspaceRoot, 'packages/core/src/components/label/label.types.ts');
	const labelLogic = read(workspaceRoot, 'packages/core/src/components/label/label.logic.ts');
	const cardTypes = read(workspaceRoot, 'packages/core/src/components/card/card.types.ts');
	const cardLogic = read(workspaceRoot, 'packages/core/src/components/card/card.logic.ts');

	return [
		buttonTypes,
		'',
		stripImport(stripImport(buttonLogic, "import type { ButtonVariant, ButtonSize } from './button.types';\n"), "import { capitalize } from '../../utils/helpers';\n"),
		'',
		inputTypes,
		'',
		inputLogic,
		'',
		textareaTypes,
		'',
		textareaLogic,
		'',
		labelTypes,
		'',
		labelLogic,
		'',
		cardTypes,
		'',
		cardLogic,
	]
		.join('\n')
		.replace('export function getButtonStyleKeys(\n', "import { capitalize } from './utils';\n\nexport function getButtonStyleKeys(\n");
}

export function createVueRegistryConfig(input: { workspaceRoot: string; outDir: string }): Omit<RegistryBuildOptions, 'manifest'> {
	return {
		framework: 'vue',
		workspaceRoot: input.workspaceRoot,
		outDir: input.outDir,
		transforms: {
			file: transformVueFile,
			buildVirtualFiles: async ({ workspaceRoot }): Promise<VirtualRegistryFile[]> => {
				const helpers = read(workspaceRoot, 'packages/core/src/utils/helpers.ts');
				const cn = read(workspaceRoot, 'packages/core/src/utils/cn.ts');

				return [
					{
						source: '__virtual__/button/core.ts',
						content: buildVueCore(workspaceRoot),
					},
					{
						source: '__virtual__/input/core.ts',
						content: buildVueCore(workspaceRoot),
					},
					{
						source: '__virtual__/textarea/core.ts',
						content: buildVueCore(workspaceRoot),
					},
					{
						source: '__virtual__/label/core.ts',
						content: buildVueCore(workspaceRoot),
					},
					{
						source: '__virtual__/card/core.ts',
						content: buildVueCore(workspaceRoot),
					},
					{
						source: '__virtual__/shared/utils.ts',
						content: `${cn}\n${helpers}`,
					},
				];
			},
		},
		validate: {
			forbidWorkspaceImports: ['@tile-ui/core', '@tile-ui/styles'],
		},
	};
}
