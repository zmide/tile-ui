import type { PackageRegistryItem, PackageRegistryManifest, RegistryBuildOptions, RegistryItemType } from '../types';

export interface BuiltRegistryFile {
	path: string;
	type: RegistryItemType;
	target?: string;
	content: string;
}

export function buildItemJson(manifest: PackageRegistryManifest, item: PackageRegistryItem, files: BuiltRegistryFile[]) {
	return {
		$schema: 'https://ui.shadcn.com/schema/registry-item.json',
		name: item.name,
		type: item.type,
		title: item.title,
		description: item.description,
		dependencies: item.dependencies,
		devDependencies: item.devDependencies,
		registryDependencies: item.registryDependencies,
		meta: item.meta,
		files,
	};
}

export function buildRegistryIndex(options: RegistryBuildOptions) {
	return {
		name: options.manifest.name,
		homepage: options.manifest.homepage,
		items: options.manifest.items.map((item) => ({
			name: item.name,
			type: item.type,
			title: item.title,
			description: item.description,
			dependencies: item.dependencies,
			devDependencies: item.devDependencies,
			registryDependencies: item.registryDependencies,
			files: item.files.map((file) => ({
				path: file.source,
				type: file.type,
				target: file.target,
			})),
		})),
	};
}
