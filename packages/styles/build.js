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
const CSS_DIR = process.env.TILE_STYLES_OUT_DIR ? path.resolve(process.env.TILE_STYLES_OUT_DIR) : path.resolve(__dirname, 'css');

// 编译全局样式
function compileFile(inputPath, outputPath) {
	const result = sass.compile(inputPath, {
		loadPaths: [path.resolve(SCSS_DIR)],
		style: 'compressed',
	});
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, result.css);
	console.log(`  ${path.relative(__dirname, outputPath)}`);
}

console.log('Compiling SCSS -> CSS...');

// 编译公开入口
for (const entry of ['tokens', 'theme', 'reset', 'globals']) {
	compileFile(path.resolve(SCSS_DIR, `${entry}.scss`), path.resolve(CSS_DIR, `${entry}.css`));
}

// 编译主题和组件入口；跳过 Sass partial，保持确定性顺序。
for (const directory of ['themes', 'components']) {
	const inputDirectory = path.resolve(SCSS_DIR, directory);
	if (!fs.existsSync(inputDirectory)) continue;
	const files = fs
		.readdirSync(inputDirectory)
		.filter((file) => file.endsWith('.scss') && !file.startsWith('_'))
		.sort();
	for (const file of files) {
		const name = file.replace('.module.scss', '.css').replace('.scss', '.css');
		compileFile(path.resolve(inputDirectory, file), path.resolve(CSS_DIR, directory, name));
	}
}

console.log('Done!');
