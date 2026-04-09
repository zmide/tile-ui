import { validateManifest } from '../../src/registry/pipeline/validate-manifest';
import type { PackageRegistryManifest } from '../../src/registry/types';

const manifest: PackageRegistryManifest = {
  name: 'test',
  homepage: 'https://example.com',
  items: [
    {
      name: 'button',
      type: 'registry:ui',
      title: 'Button',
      description: 'Button',
      files: [{ source: 'button.tsx', type: 'registry:ui', transform: 'react-component' }],
    },
  ],
};

describe('validateManifest', () => {
  it('accepts a valid manifest', () => {
    expect(() => validateManifest(manifest)).not.toThrow();
  });

  it('rejects duplicate item names', () => {
    expect(() =>
      validateManifest({
        ...manifest,
        items: [...manifest.items, manifest.items[0]],
      })
    ).toThrow(/Duplicate registry item name/);
  });
});
