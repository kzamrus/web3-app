import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: packageJson.homepage,
  define: {
    'import.meta.env.VITE_NAME': JSON.stringify(packageJson.name),
    'import.meta.env.VITE_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    createSvgSpritePlugin({
      symbolId: 'icon-[name]-[hash]',
    }),
    ViteEjsPlugin(viteConfig => ({
      // viteConfig is the current Vite resolved config
      env: viteConfig.env,
    })),
  ],
  build: {
    outDir: packageJson.buildFolderName,
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@binance-chain/bsc-connector': resolve(
        __dirname,
        '../../node_modules/@binance-chain/bsc-connector/dist/bsc-connector.esm.js',
      ),
    },
  },
}));
