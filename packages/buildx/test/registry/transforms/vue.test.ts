import { transformVueFile } from '../../../src/registry/transforms/vue';

describe('transformVueFile', () => {
	it('rewrites core and style imports for button', async () => {
		const output = await transformVueFile({
			framework: 'vue',
			workspaceRoot: '/workspace',
			item: {
				name: 'button',
				type: 'registry:ui',
				title: 'Button',
				description: 'Button',
				files: [],
			},
			file: {
				source: 'button.tsx',
				type: 'registry:ui',
				transform: 'vue-component',
			},
			content:
				"import { getButtonStyleKeys, isButtonDisabled } from '@tile-ui/core';\nimport type { ButtonVariant, ButtonSize } from '@tile-ui/core';\nimport styles from '@tile-ui/styles/scss/components/button.module.scss';\n",
		});

		expect(output.content).toContain("from '../lib/core'");
		expect(output.content).toContain("from './button.module.scss'");
		expect(output.content).not.toContain('@tile-ui/core');
	});

	it('rewrites non-button component imports generically', async () => {
		const output = await transformVueFile({
			framework: 'vue',
			workspaceRoot: '/workspace',
			item: {
				name: 'label',
				type: 'registry:ui',
				title: 'Label',
				description: 'Label',
				files: [],
			},
			file: {
				source: 'label.tsx',
				type: 'registry:ui',
				transform: 'vue-component',
			},
			content: "import { getLabelClassKeys } from '@tile-ui/core';\nimport styles from '@tile-ui/styles/scss/components/label.module.scss';\n",
		});

		expect(output.content).toContain("from '../lib/core'");
		expect(output.content).toContain("from './label.module.scss'");
		expect(output.content).not.toContain('@tile-ui/styles');
	});

	it('rewrites style @use paths relative to the output target', async () => {
		const output = await transformVueFile({
			framework: 'vue',
			workspaceRoot: '/workspace',
			item: {
				name: 'button',
				type: 'registry:ui',
				title: 'Button',
				description: 'Button',
				files: [],
			},
			file: {
				source: 'button.module.scss',
				type: 'registry:file',
				transform: 'style',
				target: 'components/ui/button/button.module.scss',
			},
			content: "@use 'variables/colors' as *;\n@use 'mixins/utils' as *;\n",
		});

		expect(output.content).toContain("@use '../../../styles/variables/colors' as *;");
		expect(output.content).toContain("@use '../../../styles/mixins/utils' as *;");
	});
});
