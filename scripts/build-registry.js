#!/usr/bin/env node

/**
 * build-registry.js
 *
 * 从 packages/ 同步源文件到 registry/tile-ui/，
 * 然后由 shadcn build 生成 public/r/*.json。
 *
 * 用法：
 *   node scripts/build-registry.js        # 仅同步 registry 源文件
 *   pnpm registry:build                   # 同步 + shadcn build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ──────────────────────────────────────────────────────
// 1. 同步 SCSS 文件（直接复制，无需转换）
// ──────────────────────────────────────────────────────
const scssCopyMap = {
  // 组件样式
  'packages/styles/scss/components/button.module.scss': 'registry/tile-ui/button/button.module.scss',
  'packages/styles/scss/components/input.module.scss': 'registry/tile-ui/input/input.module.scss',
  'packages/styles/scss/components/textarea.module.scss': 'registry/tile-ui/textarea/textarea.module.scss',
  'packages/styles/scss/components/label.module.scss': 'registry/tile-ui/label/label.module.scss',
  'packages/styles/scss/components/card.module.scss': 'registry/tile-ui/card/card.module.scss',
  // 全局样式
  'packages/styles/scss/globals.scss': 'registry/tile-ui/styles/globals.scss',
  'packages/styles/scss/variables/_colors.scss': 'registry/tile-ui/styles/variables/_colors.scss',
  'packages/styles/scss/mixins/_utils.scss': 'registry/tile-ui/styles/mixins/_utils.scss',
};

// ──────────────────────────────────────────────────────
// 2. 同步 Hooks（直接复制，无 @tile-ui/* 导入）
// ──────────────────────────────────────────────────────
const hooksCopyMap = {
  'packages/react/src/hooks/use-event.ts': 'registry/tile-ui/hooks/use-copy-to-clipboard.ts',
  'packages/react/src/hooks/use-media.ts': 'registry/tile-ui/hooks/use-media-query.ts',
  'packages/react/src/hooks/use-local-storage.ts': 'registry/tile-ui/hooks/use-local-storage.ts',
};

// ──────────────────────────────────────────────────────
// 执行同步
// ──────────────────────────────────────────────────────
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  const srcPath = path.resolve(ROOT, src);
  const destPath = path.resolve(ROOT, dest);
  ensureDir(destPath);
  fs.copyFileSync(srcPath, destPath);
}

console.log('Syncing registry files...\n');

// 复制 SCSS
console.log('  SCSS:');
for (const [src, dest] of Object.entries(scssCopyMap)) {
  copyFile(src, dest);
  console.log(`    ${src} -> ${dest}`);
}

// 复制 Hooks
console.log('\n  Hooks:');
for (const [src, dest] of Object.entries(hooksCopyMap)) {
  copyFile(src, dest);
  console.log(`    ${src} -> ${dest}`);
}

// ──────────────────────────────────────────────────────
// 3. 同步 lib/utils.ts（合并 cn.ts + helpers.ts）
// ──────────────────────────────────────────────────────
console.log('\n  Lib:');
const cnContent = fs.readFileSync(path.resolve(ROOT, 'packages/core/src/utils/cn.ts'), 'utf-8');
const helpersContent = fs.readFileSync(path.resolve(ROOT, 'packages/core/src/utils/helpers.ts'), 'utf-8');

const utilsPath = path.resolve(ROOT, 'registry/tile-ui/lib/utils.ts');
ensureDir(utilsPath);
fs.writeFileSync(utilsPath, `${cnContent}\n${helpersContent}`);
console.log('    packages/core/src/utils/{cn,helpers}.ts -> registry/tile-ui/lib/utils.ts');

// ──────────────────────────────────────────────────────
// 4. 提示：组件 TSX 文件需要手动维护
//    （因为它们需要 inline core 逻辑，自动转换过于复杂）
// ──────────────────────────────────────────────────────
console.log('\n  Components (TSX):');
const components = ['button', 'input', 'textarea', 'label', 'card'];
for (const comp of components) {
  const registryFile = `registry/tile-ui/${comp}/${comp}.tsx`;
  if (fs.existsSync(path.resolve(ROOT, registryFile))) {
    console.log(`    ${registryFile} (self-contained, up to date)`);
  } else {
    console.warn(`    WARNING: ${registryFile} not found!`);
  }
}

console.log('\nSync complete.');
console.log('Run "pnpm dlx shadcn@latest build" to generate public/r/*.json files.');
