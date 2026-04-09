import fs from 'node:fs/promises';
import path from 'node:path';

export async function cleanupOutput(outDir: string, expectedFileNames: string[]) {
  try {
    const entries = await fs.readdir(outDir);
    const expected = new Set(expectedFileNames);

    await Promise.all(
      entries
        .filter(entry => entry.endsWith('.json') && !expected.has(entry))
        .map(entry => fs.rm(path.join(outDir, entry), { force: true }))
    );
  } catch {
    // Ignore missing directories during the first build.
  }
}
