import type { PackageRegistryManifest } from '../types';

function resolveDependencyName(dependency: string) {
	if (/^https?:\/\//.test(dependency)) {
		return null;
	}

	if (dependency.startsWith('@')) {
		const slashIndex = dependency.indexOf('/');
		return slashIndex === -1 ? dependency : dependency.slice(slashIndex + 1);
	}

	return dependency;
}

export function validateManifest(manifest: PackageRegistryManifest) {
	const itemNames = new Set<string>();

	for (const item of manifest.items) {
		if (itemNames.has(item.name)) {
			throw new Error(`Duplicate registry item name: ${item.name}`);
		}
		itemNames.add(item.name);

		if (!item.files.length) {
			throw new Error(`Registry item '${item.name}' must include at least one file.`);
		}

		for (const dependency of item.registryDependencies ?? []) {
			const resolvedDependency = resolveDependencyName(dependency);
			if (!resolvedDependency) {
				continue;
			}

			if (!manifest.items.some((candidate) => candidate.name === resolvedDependency)) {
				throw new Error(`Registry item '${item.name}' references unknown registry dependency '${dependency}'.`);
			}
		}
	}
}
