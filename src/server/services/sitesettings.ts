import logger from '@sravni/server-utils/lib/logger';
import withMemoryCache from '@sravni/server-utils/lib/utils/withMemoryCache';
import type { ISiteSettings } from '@sravni/types/lib/sitesettings';

import { requestWithoutTokenGet } from '../utils/api/api';

export const find = async (): Promise<ISiteSettings> => {
  const url = `${process.env.GATEWAY}/v2/sitesettings/`;

  const { data } = await requestWithoutTokenGet<ISiteSettings>(url);

  return data;
};

export const findWithCache = withMemoryCache(
  async () => {
    try {
      return find();
    } catch (error) {
      logger.error({
        message: 'Failed to load site settings',
        exception: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  },
  { fnKey: 'site-settings' },
);
