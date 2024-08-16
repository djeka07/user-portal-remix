/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import compression from 'compression';

import dotenv from 'dotenv';
import { ServerBuild } from '@remix-run/node';

dotenv.config();

const port = process.env.PORT || 4000;
const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? null
    : await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      );

const app = express();
app.use(compression());
app.use(viteDevServer ? viteDevServer.middlewares : express.static('build/client'));

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
  : await import('./build/server/index.js');
app.all('*', createRequestHandler({ build: build as unknown as ServerBuild }));

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
