#!/usr/bin/env node
/**
 * 发布编排脚本：主包入口，支持两种发布模式。
 *
 * 模式一：全部包（主包发布）
 *   无参数或首参为 bump（patch/minor/major/版本号）时，发布所有可发布包。
 *   各包版本更新后统一只产生一个 commit + 各自的 git tag，提示手动 push。
 *   用法：
 *     node scripts/release.mjs                # 全部包 patch
 *     node scripts/release.mjs minor          # 全部包 minor
 *     node scripts/release.mjs --dry-run      # 演练
 *
 * 模式二：单包（按包自己的流程走）
 *   首参为包名时，直接调用该包的 release script（release-it 完整流程：
 *   独立 commit + tag + push，配置见各包 .release-it.json）。
 *   用法：
 *     node scripts/release.mjs core           # 仅 core，patch（含 commit/tag/push）
 *     node scripts/release.mjs vue minor      # 仅 vue，minor
 *     node scripts/release.mjs react 1.2.3    # 仅 react，指定版本
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// 顺序即发布顺序：core 必须先于各 adapter（adapter 的 prepack 依赖 core 构建产物）
const PUBLISHABLE = ['core', 'styles', 'theme-kumo', 'react', 'vue', 'solid'];
const BUMP_DEFAULT = 'patch';

function fail(message) {
	console.error(`\x1b[31m错误：${message}\x1b[0m`);
	process.exit(1);
}

function main() {
	const args = process.argv.slice(2);
	const dryRun = args.includes('--dry-run');
	const rest = args.filter((arg) => arg !== '--dry-run');

	// 模式二：单包发布，直接走该包自己的 release script（release-it 完整 git 流程）
	if (rest.length > 0 && PUBLISHABLE.includes(rest[0])) {
		const name = rest[0];
		const bump = rest[1] || BUMP_DEFAULT;
		console.log(`\x1b[36m单包发布 @tile-ui/${name}（${bump}）\x1b[0m`);
		execSync(`pnpm --filter @tile-ui/${name} release ${bump}${dryRun ? ' --dry-run' : ''}`, { stdio: 'inherit' });
		return;
	}

	// 模式一：全部包发布
	const bump = rest.length > 0 ? rest[0] : BUMP_DEFAULT;

	const released = [];
	for (const name of PUBLISHABLE) {
		const pkgDir = path.join(root, 'packages', name === 'theme-kumo' ? 'themes/kumo' : name);
		console.log(`\n\x1b[36m发布 @tile-ui/${name}（${bump}）\x1b[0m`);
		execSync(`pnpm exec release-it ${bump} --no-git${dryRun ? ' --dry-run' : ''}`, { cwd: pkgDir, stdio: 'inherit' });
		const version = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8')).version;
		released.push({ name, version });
	}

	const message = `chore: release ${released.map((r) => `${r.name} v${r.version}`).join(', ')}`;

	if (dryRun) {
		console.log(`\n\x1b[33m[dry-run] 将提交：${message}\x1b[0m`);
		console.log(`\x1b[33m[dry-run] 将打 tag：${released.map((r) => `${r.name}/v${r.version}`).join('、')}\x1b[0m`);
		return;
	}

	for (const { name, version } of released) {
		const tag = `${name}/v${version}`;
		try {
			execSync(`git rev-parse --verify "${tag}"`, { stdio: 'ignore' });
			fail(`git tag "${tag}" 已存在`);
		} catch {
			// tag 不存在，继续
		}
	}

	execSync(`git add ${released.map((r) => path.join('packages', r.name === 'theme-kumo' ? 'themes/kumo' : r.name, 'package.json')).join(' ')}`, { stdio: 'inherit' });
	execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
	for (const { name, version } of released) {
		execSync(`git tag "${name}/v${version}"`, { stdio: 'inherit' });
	}

	console.log(`\n\x1b[32m✓ 已提交：${message}\x1b[0m`);
	console.log(`\x1b[32m✓ 已打 tag：${released.map((r) => `${r.name}/v${r.version}`).join('、')}\x1b[0m`);
	// GitHub 限制：一次 push 超过 3 个 tag 不产生 push 事件（CI 不触发），必须分批
	const tags = released.map((r) => `${r.name}/v${r.version}`);
	const batches = [];
	for (let i = 0; i < tags.length; i += 3) batches.push(tags.slice(i, i + 3));
	console.log('\n下一步（GitHub 限制一次最多推 3 个 tag，需分批 push 触发 CI）：');
	console.log('  git push origin master');
	for (const batch of batches) console.log(`  git push origin ${batch.join(' ')}`);
}

main();
