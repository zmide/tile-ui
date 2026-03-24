#!/usr/bin/env node

/**
 * 构建脚本：将 registry.json 转换为 apps/react-demo/public/r/registry.json
 * 用于 shadcn CLI 分发组件库
 */

import fs from 'fs';
import path from 'path';

const REGISTRY_PATH = path.resolve('registry.json');
const OUTPUT_PATH = path.resolve('apps/react-demo/public/r/registry.json');

// 读取 registry.json
const registryData = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));

// 转换为对外发布的格式
const publicRegistry = {
  name: registryData.name,
  description: registryData.description || '基于 SCSS + CSS Module 的轻量级 React + Vue 双架构组件库',
  homepage: registryData.homepage || '/',
  style: registryData.style || 'new-york',
  rsc: registryData.rsc ?? true,
  tsx: registryData.tsx ?? true,
  tailwind: false,
  cssVariables: false,
  registryDependencies: registryData.registryDependencies || [],
  registry: registryData.registry.map(item => ({
    name: item.name,
    type: item.type,
    description: getDescription(item.type),
    dependencies: getDependencies(item),
    devDependencies: ['sass'],
    files: item.files.map(f => `/${f}`)
  }))
};

// 获取组件描述
function getDescription(type) {
  const descriptions = {
    'components:ui': 'UI 组件',
    'hooks': '自定义 React Hooks',
    'lib:utils': '工具函数',
    'styles': 'SCSS 样式变量和混入'
  };
  return descriptions[type] || '';
}

// 获取依赖
function getDependencies(item) {
  if (item.type === 'components:ui') {
    if (item.registryDependencies?.includes('slot')) {
      return ['@radix-ui/react-slot'];
    }
    if (item.registryDependencies?.includes('label')) {
      return ['@radix-ui/react-label'];
    }
  }
  return [];
}

// 确保输出目录存在
const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 写入文件
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(publicRegistry, null, 2));

console.log(`Generated: ${OUTPUT_PATH}`);
console.log(`  Contains ${publicRegistry.registry.length} components/modules`);
