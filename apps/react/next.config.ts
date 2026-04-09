import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';
import { createMDX } from 'fumadocs-mdx/next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, '../../packages/styles/scss'),
      path.join(__dirname, '../common/styles'),
    ],
  },
  transpilePackages: ['@tile-ui/react', '@tile-ui/core', '@tile-ui/styles'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
