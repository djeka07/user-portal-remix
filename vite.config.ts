import { vitePlugin as remix } from '@remix-run/dev';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import svgr from 'vite-plugin-svgr';

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  ssr: {
    noExternal: ['@djeka07/ui', /\.css$/],
  },
  plugins: [
    svgr({ include: '**/*.svg' }),
    remix({
      appDirectory: 'src',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    vanillaExtractPlugin(),
    tsconfigPaths(),
  ],
});
