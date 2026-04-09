import fs from 'node:fs/promises';
import path from 'node:path';

import type {
  PackageRegistryItem,
  VirtualRegistryFile,
} from '../types';

export interface ResolvedRegistryFile {
  file: PackageRegistryItem['files'][number];
  content: string;
}

export async function resolveItemFiles(
  workspaceRoot: string,
  item: PackageRegistryItem,
  virtualFiles: VirtualRegistryFile[]
): Promise<ResolvedRegistryFile[]> {
  const virtualMap = new Map(virtualFiles.map(file => [file.source, file.content]));

  return Promise.all(
    item.files.map(async file => {
      const virtualContent = virtualMap.get(file.source);
      if (virtualContent !== undefined) {
        return { file, content: virtualContent };
      }

      const absolutePath = path.resolve(workspaceRoot, file.source);
      const content = await fs.readFile(absolutePath, 'utf-8');
      return { file, content };
    })
  );
}
