import { transformReactFile } from '../../../src/registry/transforms/react';

describe('transformReactFile', () => {
  it('rewrites core and style imports for button', async () => {
    const output = await transformReactFile({
      framework: 'react',
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
        transform: 'react-component',
      },
      content:
        "import { getButtonStyleKeys, isButtonDisabled } from '@tile-ui/core';\nimport type { ButtonBaseProps } from '@tile-ui/core';\nimport styles from '@tile-ui/styles/scss/components/button.module.scss';\n",
    });

    expect(output.content).toContain("from '../lib/core'");
    expect(output.content).toContain("from './button.module.scss'");
    expect(output.content).not.toContain('@tile-ui/core');
  });

  it('rewrites non-button component imports generically', async () => {
    const output = await transformReactFile({
      framework: 'react',
      workspaceRoot: '/workspace',
      item: {
        name: 'input',
        type: 'registry:ui',
        title: 'Input',
        description: 'Input',
        files: [],
      },
      file: {
        source: 'input.tsx',
        type: 'registry:ui',
        transform: 'react-component',
      },
      content:
        "import { getInputIds, getInputAriaProps } from '@tile-ui/core';\nimport type { InputBaseProps } from '@tile-ui/core';\nimport styles from '@tile-ui/styles/scss/components/input.module.scss';\n",
    });

    expect(output.content).toContain("from '../lib/core'");
    expect(output.content).toContain("from './input.module.scss'");
    expect(output.content).not.toContain('@tile-ui/styles');
  });
});
