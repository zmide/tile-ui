import type { PackageRegistryManifest } from '../types';

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
			if (!manifest.items.some((candidate) => candidate.name === dependency)) {
				throw new Error(`Registry item '${item.name}' references unknown registry dependency '${dependency}'.`);
			}
		}
	}
}
