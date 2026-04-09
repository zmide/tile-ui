import fs from 'node:fs/promises';
import path from 'node:path';

export async function writeJsonFile(outputPath: string, data: unknown) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}
