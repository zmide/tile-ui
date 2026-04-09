import path from 'node:path';

import { buildItemJson, buildRegistryIndex } from './pipeline/build-item-json';
import { cleanupOutput } from './pipeline/cleanup-output';
import { resolveItemFiles } from './pipeline/resolve-item-files';
import { validateManifest } from './pipeline/validate-manifest';
import { writeJsonFile } from './pipeline/write-output';
import type { BuiltRegistryFile } from './pipeline/build-item-json';
import type { RegistryBuildOptions } from './types';

export async function buildRegistry(options: RegistryBuildOptions) {
  validateManifest(options.manifest);

  const virtualFiles =
    (await options.transforms.buildVirtualFiles?.({
      workspaceRoot: options.workspaceRoot,
      manifest: options.manifest,
    })) ?? [];

  const expectedFileNames = ['registry.json'];

  for (const item of options.manifest.items) {
    const resolvedFiles = await resolveItemFiles(options.workspaceRoot, item, virtualFiles);

    const files: BuiltRegistryFile[] = [];
    for (const resolved of resolvedFiles) {
      const transformed = await options.transforms.file({
        framework: options.framework,
        item,
        file: resolved.file,
        content: resolved.content,
        workspaceRoot: options.workspaceRoot,
      });

      for (const forbiddenImport of options.validate?.forbidWorkspaceImports ?? []) {
        if (transformed.content.includes(forbiddenImport)) {
          throw new Error(
            `Transformed file for '${item.name}' still contains forbidden import '${forbiddenImport}'.`
          );
        }
      }

      files.push({
        path: resolved.file.source,
        type: resolved.file.type,
        target: transformed.target,
        content: transformed.content,
      });
    }

    const itemJson = buildItemJson(item, files);
    const itemFileName = `${item.name}.json`;
    expectedFileNames.push(itemFileName);
    await writeJsonFile(path.join(options.outDir, itemFileName), itemJson);
  }

  await writeJsonFile(path.join(options.outDir, 'registry.json'), buildRegistryIndex(options));
  await cleanupOutput(options.outDir, expectedFileNames);
}
