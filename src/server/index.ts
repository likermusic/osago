// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';

import baseMetrics from '@sravni/koa-utils/lib/middlewares/baseMetrics';
import device from '@sravni/koa-utils/lib/middlewares/device';
import imageVersion from '@sravni/koa-utils/lib/middlewares/imageVersion';
import isAjax from '@sravni/koa-utils/lib/middlewares/isAjax';
import requestLog from '@sravni/koa-utils/lib/middlewares/requestLog';
import authRoutes from '@sravni/koa-utils/lib/routes/auth';
import healthRoutes from '@sravni/koa-utils/lib/routes/health';
import metricsRoutes from '@sravni/koa-utils/lib/routes/metrics';
import assignHandlers from '@sravni/nextjs-utils/lib/middlewares/assignHandlers';
import type { IDataProtectorOptions } from '@sravni/server-utils/lib/dataProtector';
import { DataProtector } from '@sravni/server-utils/lib/dataProtector';
import logger from '@sravni/server-utils/lib/logger';
import type { DefaultState } from 'koa';
import Koa from 'koa';
import body from 'koa-body';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import next from 'next';

import { config } from './constants/config';
import apiRoutes from './routes/api';
import nextRoutes from './routes/next';
import webRoutes from './routes/web';
import { identityOpenid } from './utils/openid';

const port = parseInt(config.PORT as string, 10) || 9001;
const isDev = config.NODE_ENV !== 'production';
const imageVersionString = config.IMAGE_VERSION;
const webPath = config.WEB_PATH;
const apiPrefix = config.API_PATH;

const dataProtectorKeys: IDataProtectorOptions['keys'] =
  typeof process.env.ENCRYPTION_KEYS === 'string' ? JSON.parse(process.env.ENCRYPTION_KEYS) : undefined;
const dataProtector = new DataProtector({ keys: dataProtectorKeys });

const app = next({ dev: isDev });

// eslint-disable-next-line promise/catch-or-return
app.prepare().then(() => {
  const server = new Koa<DefaultState, App.ExtendedContext>();

  server.proxy = true;

  server.use(assignHandlers(app));

  server.use(requestLog);
  // server.use(tracing);

  server.use(baseMetrics);
  server.use(imageVersion(imageVersionString));
  server.use(isAjax);
  server.use(conditional());
  server.use(etag());
  server.use(body());
  server.use(device);

  // common routes
  server.use(healthRoutes);
  server.use(metricsRoutes);
  server.use(authRoutes({ webPath, openid: identityOpenid, dataProtector }));

  // app routes
  server.use(apiRoutes({ prefix: apiPrefix, openid: identityOpenid, dataProtector }));
  server.use(webRoutes({ openid: identityOpenid, dataProtector }));

  server.use(nextRoutes({}));

  server.listen(port, () => {
    logger.info({ message: `Ready on http://localhost:${port}` });
  });
});
