import { AbTestingSdk } from '@sravni/ab-testing-sdk/lib/node';
import { checkBot } from '@sravni/koa-utils/lib/utils';
import { getUserDataForAbTesting } from '@sravni/koa-utils/lib/utils/abTesting';
import type { AxiosError } from 'axios';
import type { Next } from 'koa';

import { AB_TEST_TOKEN } from '../constants/abTest';
import { logMessage } from '../utils/logMessage';

export const loadAbTestingSdkMiddleware = async (ctx: App.ExtendedContext, next: Next): Promise<void> => {
  const isBot = checkBot(ctx.req);
  // Если запрос пришел от бота мы не должны выдавать ему эксперименты.
  if (ctx.req?.__AB_TESTING__ || isBot) {
    return next();
  }

  try {
    const abTestingSdk = new AbTestingSdk({
      token: AB_TEST_TOKEN,
      timeout: 1000,
      userData: getUserDataForAbTesting(ctx),
    });

    const [abTestingInfo, analyticsStatistics] = await Promise.all([
      abTestingSdk.getInfo(),
      abTestingSdk.getAnalyticsStatistics(),
    ]);

    ctx.req.__AB_TESTING__ = {
      abTestingInfo,
      analyticsStatistics,
    };
  } catch (e) {
    logMessage('Cant load abTestingSdk', {
      name: (e as AxiosError).name,
      message: (e as AxiosError).message,
    });
  }

  return next();
};
