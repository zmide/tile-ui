import fs from 'node:fs';
import path from 'node:path';

import type { RegistryWatchOptions } from './types';

export async function watchRegistry(options: RegistryWatchOptions) {
	const debounceMs = options.debounceMs ?? 100;
	const watchers = new Map<string, fs.FSWatcher>();
	let timer: ReturnType<typeof setTimeout> | null = null;
	let isBuilding = false;
	let rebuildQueued = false;

	const scheduleBuild = () => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			void runBuild();
		}, debounceMs);
	};

	const runBuild = async () => {
		if (isBuilding) {
			rebuildQueued = true;
			return;
		}

		isBuilding = true;
		try {
			await options.run();
		} finally {
			isBuilding = false;
			if (rebuildQueued) {
				rebuildQueued = false;
				scheduleBuild();
			}
		}
	};

	const ensureWatcher = (targetPath: string) => {
		if (watchers.has(targetPath)) {
			return;
		}

		try {
			const watcher = fs.watch(targetPath, { recursive: true }, () => {
				scheduleBuild();
			});
			watchers.set(targetPath, watcher);
		} catch {
			// Ignore missing paths so callers can provide broad watch lists.
		}
	};

	for (const watchPath of options.watchPaths) {
		ensureWatcher(path.resolve(watchPath));
	}

	await runBuild();

	const cleanup = () => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		for (const watcher of watchers.values()) {
			watcher.close();
		}
		watchers.clear();
	};

	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);
}
