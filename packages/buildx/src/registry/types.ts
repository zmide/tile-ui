export type RegistryItemType = 'registry:ui' | 'registry:hook' | 'registry:lib' | 'registry:file';

export type RegistryTransformKind = 'copy' | 'style' | 'react-component' | 'vue-component' | 'react-hook' | 'vue-composable' | 'build-utils' | 'build-vue-core' | 'build-react-lib';

export interface PackageRegistryFileSource {
	source: string;
	type: RegistryItemType;
	target?: string;
	transform: RegistryTransformKind;
}

export interface PackageRegistryItem {
	name: string;
	type: RegistryItemType;
	title: string;
	description: string;
	dependencies?: string[];
	devDependencies?: string[];
	registryDependencies?: string[];
	files: PackageRegistryFileSource[];
	meta?: Record<string, unknown>;
}

export interface PackageRegistryManifest {
	name: string;
	homepage: string;
	items: PackageRegistryItem[];
}

export interface VirtualRegistryFile {
	source: string;
	content: string;
}

export interface TransformFileInput {
	framework: 'react' | 'vue';
	item: PackageRegistryItem;
	file: PackageRegistryFileSource;
	content: string;
	workspaceRoot: string;
}

export interface TransformFileOutput {
	content: string;
	target?: string;
}

export interface BuildVirtualFilesContext {
	workspaceRoot: string;
	manifest: PackageRegistryManifest;
}

export interface RegistryBuildOptions {
	framework: 'react' | 'vue';
	workspaceRoot: string;
	outDir: string;
	manifest: PackageRegistryManifest;
	transforms: {
		file: (input: TransformFileInput) => Promise<TransformFileOutput>;
		buildVirtualFiles?: (context: BuildVirtualFilesContext) => Promise<VirtualRegistryFile[]>;
	};
	validate?: {
		forbidWorkspaceImports?: string[];
	};
}

export interface RegistryWatchOptions {
	run: () => Promise<void> | void;
	watchPaths: string[];
	debounceMs?: number;
}
