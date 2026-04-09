#!/usr/bin/env node

/**
 * 将 SCSS 源文件编译为 CSS
 * 输出到 css/ 目录
 */

import * as sass from 'sass';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCSS_DIR = path.resolve(__dirname, 'scss');
const CSS_DIR = path.resolve(__dirname, 'css');
const COMPONENTS_DIR = path.resolve(CSS_DIR, 'components');

// 确保输出目录存在
if (!fs.existsSync(CSS_DIR)) fs.mkdirSync(CSS_DIR, { recursive: true });
if (!fs.existsSync(COMPONENTS_DIR)) fs.mkdirSync(COMPONENTS_DIR, { recursive: true });

// 编译全局样式
function compileFile(inputPath, outputPath) {
	try {
		const result = sass.compile(inputPath, {
			loadPaths: [path.resolve(SCSS_DIR)],
			style: 'compressed',
		});
		fs.writeFileSync(outputPath, result.css);
		console.log(`  ${path.relative(__dirname, outputPath)}`);
	} catch (err) {
		console.error(`  Failed: ${path.relative(__dirname, inputPath)} - ${err.message}`);
	}
}

console.log('Compiling SCSS -> CSS...');

// 编译 globals.scss
compileFile(path.resolve(SCSS_DIR, 'globals.scss'), path.resolve(CSS_DIR, 'globals.css'));

// 编译组件样式 (CSS Modules 仅用于参考，实际 module 化需框架支持)
const componentsDir = path.resolve(SCSS_DIR, 'components');
if (fs.existsSync(componentsDir)) {
	const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.scss'));
	for (const file of files) {
		const name = file.replace('.module.scss', '.css').replace('.scss', '.css');
		compileFile(path.resolve(componentsDir, file), path.resolve(COMPONENTS_DIR, name));
	}
}

console.log('Done!');
