import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, '../../packages/styles/scss'),
    ],
  },
  transpilePackages: ['@tile-ui/react', '@tile-ui/core', '@tile-ui/styles'],
};

export default nextConfig;
