import { isWL } from '../setWl/isWl';

import { paymentResultPaths } from './config';
import type { IAppConfig } from './types';

export const getAppType = (path: string, partnerId?: string | number): IAppConfig['appType'] => {
  if (isWL(path) || (paymentResultPaths.some((url) => path.startsWith(`/osago${url}`)) && partnerId)) {
    return 'wl';
  }

  return 'sravni.ru';
};
