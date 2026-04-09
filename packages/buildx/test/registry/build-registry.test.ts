import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { beforeEach, afterEach, expect } from 'vitest';

import { buildRegistry } from '../../src/registry/build-registry';
import { createReactRegistryConfig } from '../../src/registry/presets/react';
import { createVueRegistryConfig } from '../../src/registry/presets/vue';
import { reactRegistryManifest } from '../../../react/src/registry/manifest';
import { vueRegistryManifest } from '../../../vue/src/registry/manifest';

let tempDir = '';

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tile-ui-buildx-'));
});

afterEach(async () => {
  if (tempDir) {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});

describe('buildRegistry', () => {
  it('builds react button registry output', async () => {
    const outDir = path.join(tempDir, 'react');
    await buildRegistry({
      manifest: reactRegistryManifest,
      ...createReactRegistryConfig({
        workspaceRoot: path.resolve(__dirname, '../../../..'),
        outDir,
      }),
    });

    const content = await fs.readFile(path.join(outDir, 'button.json'), 'utf-8');
    expect(content).toContain('"name": "button"');
    expect(content).not.toContain('@tile-ui/core');
    expect(content).not.toContain('@tile-ui/styles');
  });

  it('builds expanded react registry items', async () => {
    const outDir = path.join(tempDir, 'react-expanded');
    await buildRegistry({
      manifest: reactRegistryManifest,
      ...createReactRegistryConfig({
        workspaceRoot: path.resolve(__dirname, '../../../..'),
        outDir,
      }),
    });

    const registry = await fs.readFile(path.join(outDir, 'registry.json'), 'utf-8');
    expect(registry).toContain('"name": "input"');
    expect(registry).toContain('"name": "textarea"');
    expect(registry).toContain('"name": "label"');
    expect(registry).toContain('"name": "card"');
    expect(registry).toContain('"name": "core"');
    expect(registry).toContain('"name": "styles"');
    expect(registry).toContain('"name": "use-copy-to-clipboard"');
    expect(registry).toContain('"name": "use-media-query"');
    expect(registry).toContain('"name": "use-local-storage"');
  });

  it('builds vue button registry output', async () => {
    const outDir = path.join(tempDir, 'vue');
    await buildRegistry({
      manifest: vueRegistryManifest,
      ...createVueRegistryConfig({
        workspaceRoot: path.resolve(__dirname, '../../../..'),
        outDir,
      }),
    });

    const content = await fs.readFile(path.join(outDir, 'button.json'), 'utf-8');
    expect(content).toContain('"name": "button"');
    expect(content).not.toContain('@tile-ui/core');
    expect(content).not.toContain('@tile-ui/styles');
  });

  it('builds expanded vue registry items', async () => {
    const outDir = path.join(tempDir, 'vue-expanded');
    await buildRegistry({
      manifest: vueRegistryManifest,
      ...createVueRegistryConfig({
        workspaceRoot: path.resolve(__dirname, '../../../..'),
        outDir,
      }),
    });

    const registry = await fs.readFile(path.join(outDir, 'registry.json'), 'utf-8');
    expect(registry).toContain('"name": "input"');
    expect(registry).toContain('"name": "textarea"');
    expect(registry).toContain('"name": "label"');
    expect(registry).toContain('"name": "card"');
    expect(registry).toContain('"name": "core"');
    expect(registry).toContain('"name": "styles"');
    expect(registry).toContain('"name": "use-copy-to-clipboard"');
    expect(registry).toContain('"name": "use-media-query"');
    expect(registry).toContain('"name": "use-local-storage"');
  });
});
