import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, expect, vi } from 'vitest';

import { watchRegistry } from '../../src/registry/watch-registry';
let tempDir = '';

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tile-ui-watch-'));
});

afterEach(async () => {
  vi.restoreAllMocks();
  if (tempDir) {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});

describe('watchRegistry', () => {
  it('runs initial build and rebuilds on watched changes', async () => {
    const watchedFile = path.join(tempDir, 'source.ts');
    await fs.writeFile(watchedFile, 'export const value = 1;\n', 'utf-8');

    const run = vi.fn<() => void>();

    await watchRegistry({
      run,
      watchPaths: [tempDir],
      debounceMs: 25,
    });

    expect(run).toHaveBeenCalledTimes(1);

    await fs.writeFile(watchedFile, 'export const value = 2;\n', 'utf-8');
    await new Promise(resolve => setTimeout(resolve, 250));

    expect(run.mock.calls.length).toBeGreaterThan(1);
  });
});
