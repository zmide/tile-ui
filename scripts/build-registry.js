#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const REACT_LEGACY_SOURCE = path.join(ROOT, 'registry', 'tile-ui');
const REACT_REGISTRY_DIR = path.join(ROOT, 'registry', 'react', 'tile-ui');
const VUE_REGISTRY_DIR = path.join(ROOT, 'registry', 'vue', 'tile-ui');

const STYLE_FILES = {
  'packages/styles/scss/components/button.module.scss': 'button/button.module.scss',
  'packages/styles/scss/components/input.module.scss': 'input/input.module.scss',
  'packages/styles/scss/components/textarea.module.scss': 'textarea/textarea.module.scss',
  'packages/styles/scss/components/label.module.scss': 'label/label.module.scss',
  'packages/styles/scss/components/card.module.scss': 'card/card.module.scss',
  'packages/styles/scss/globals.scss': 'styles/globals.scss',
  'packages/styles/scss/variables/_colors.scss': 'styles/variables/_colors.scss',
  'packages/styles/scss/mixins/_utils.scss': 'styles/mixins/_utils.scss',
};

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(relativePath, content) {
  const filePath = path.join(ROOT, relativePath);
  ensureDir(filePath);
  fs.writeFileSync(filePath, content);
}

function copyFile(sourceRelativePath, targetRelativePath) {
  const sourcePath = path.join(ROOT, sourceRelativePath);
  const targetPath = path.join(ROOT, targetRelativePath);
  ensureDir(targetPath);
  fs.copyFileSync(sourcePath, targetPath);
}

function emptyDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf-8');
}

function syncReactRegistry() {
  emptyDir(REACT_REGISTRY_DIR);
  fs.cpSync(REACT_LEGACY_SOURCE, REACT_REGISTRY_DIR, { recursive: true });
}

function syncStyleFiles(targetRoot) {
  for (const [source, target] of Object.entries(STYLE_FILES)) {
    copyFile(source, path.join(targetRoot, target));
  }
}

function buildVueCoreFile() {
  const buttonTypes = read('packages/core/src/components/button/button.types.ts');
  const buttonLogic = read('packages/core/src/components/button/button.logic.ts')
    .replace("import type { ButtonVariant, ButtonSize } from './button.types';\n", '')
    .replace("import { capitalize } from '../../utils/helpers';\n", '');
  const inputLogic = read('packages/core/src/components/input/input.logic.ts');
  const textareaLogic = read('packages/core/src/components/textarea/textarea.logic.ts');
  const labelLogic = read('packages/core/src/components/label/label.logic.ts');
  const cardTypes = read('packages/core/src/components/card/card.types.ts');
  const cardLogic = read('packages/core/src/components/card/card.logic.ts');
  const capitalize = read('packages/core/src/utils/helpers.ts')
    .match(/export function capitalize\(str: string\): string \{[\s\S]*?\n\}/)?.[0] ?? '';

  return [
    buttonTypes.trim(),
    '',
    cardTypes.trim(),
    '',
    capitalize.trim(),
    '',
    buttonLogic.trim(),
    '',
    inputLogic.trim(),
    '',
    textareaLogic.trim(),
    '',
    labelLogic.trim(),
    '',
    cardLogic.trim(),
    '',
  ].join('\n');
}

function transformVueComponent(sourceRelativePath, replacements) {
  let content = read(sourceRelativePath);
  for (const [from, to] of replacements) {
    content = content.replace(from, to);
  }
  return content;
}

function syncVueRegistry() {
  emptyDir(VUE_REGISTRY_DIR);
  syncStyleFiles('registry/vue/tile-ui');

  writeFile('registry/vue/tile-ui/lib/core.ts', buildVueCoreFile());
  writeFile(
    'registry/vue/tile-ui/lib/utils.ts',
    `${read('packages/core/src/utils/cn.ts')}\n${read('packages/core/src/utils/helpers.ts')}`
  );

  writeFile(
    'registry/vue/tile-ui/button/button.tsx',
    transformVueComponent('packages/vue/src/components/button/button.tsx', [
      ["import { getButtonStyleKeys, isButtonDisabled } from '@tile-ui/core';", "import { getButtonStyleKeys, isButtonDisabled } from '../lib/core';"],
      ["import type { ButtonVariant, ButtonSize } from '@tile-ui/core';", "import type { ButtonVariant, ButtonSize } from '../lib/core';"],
      ["import styles from '@tile-ui/styles/scss/components/button.module.scss';", "import styles from './button.module.scss';"],
    ])
  );

  writeFile(
    'registry/vue/tile-ui/input/input.tsx',
    transformVueComponent('packages/vue/src/components/input/input.tsx', [
      ["import { getInputIds, getInputAriaProps } from '@tile-ui/core';", "import { getInputIds, getInputAriaProps } from '../lib/core';"],
      ["import styles from '@tile-ui/styles/scss/components/input.module.scss';", "import styles from './input.module.scss';"],
    ])
  );

  writeFile(
    'registry/vue/tile-ui/textarea/textarea.tsx',
    transformVueComponent('packages/vue/src/components/textarea/textarea.tsx', [
      ["import { getTextareaIds, getTextareaAriaProps } from '@tile-ui/core';", "import { getTextareaIds, getTextareaAriaProps } from '../lib/core';"],
      ["import styles from '@tile-ui/styles/scss/components/textarea.module.scss';", "import styles from './textarea.module.scss';"],
    ])
  );

  writeFile(
    'registry/vue/tile-ui/label/label.tsx',
    transformVueComponent('packages/vue/src/components/label/label.tsx', [
      ["import { getLabelClassKeys } from '@tile-ui/core';", "import { getLabelClassKeys } from '../lib/core';"],
      ["import styles from '@tile-ui/styles/scss/components/label.module.scss';", "import styles from './label.module.scss';"],
    ])
  );

  writeFile(
    'registry/vue/tile-ui/card/card.tsx',
    transformVueComponent('packages/vue/src/components/card/card.tsx', [
      ["import { cardStyleKeys } from '@tile-ui/core';", "import { cardStyleKeys } from '../lib/core';"],
      ["import type { CardElement } from '@tile-ui/core';", "import type { CardElement } from '../lib/core';"],
      ["import styles from '@tile-ui/styles/scss/components/card.module.scss';", "import styles from './card.module.scss';"],
    ])
  );

  copyFile(
    'packages/vue/src/composables/use-event.ts',
    'registry/vue/tile-ui/composables/use-copy-to-clipboard.ts'
  );
  copyFile(
    'packages/vue/src/composables/use-media.ts',
    'registry/vue/tile-ui/composables/use-media-query.ts'
  );
  copyFile(
    'packages/vue/src/composables/use-local-storage.ts',
    'registry/vue/tile-ui/composables/use-local-storage.ts'
  );
}

console.log('Syncing React registry source...');
syncReactRegistry();

console.log('Syncing Vue registry source...');
syncVueRegistry();

console.log('Registry sync complete.');
console.log('Build outputs with:');
console.log('  pnpm registry:build:react');
console.log('  pnpm registry:build:vue');
