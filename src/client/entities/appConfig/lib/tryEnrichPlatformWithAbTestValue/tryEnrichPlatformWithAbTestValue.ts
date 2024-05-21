import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';

import { AB_TEST_EXPERIMENTS } from '../../config';
import { PLATFORM_TYPES } from '../../constants';
import type { TABTestValue, TAppConfig } from '../../types';

import { getABTestOsago } from './getABTestOsago';

export const tryEnrichPlatformWithAbTestValue = (appType: TAppConfig['appType'], abTestValue: TABTestValue) => {
  const platformName = PLATFORM_TYPES[appType];
  if (appType === 'sravni.ru' && abTestValue?.statistics) {
    const stringWithTests = Object.keys(AB_TEST_EXPERIMENTS).reduce((result: string, key: string) => {
      const enabledExperiment = getABTestOsago(abTestValue.statistics, key);

      if (enabledExperiment) {
        const experimentKey = concatWithPrefix(platformName, enabledExperiment, '_');
        return concatWithPrefix(result, experimentKey, ',');
      }

      return result;
    }, '');
    return stringWithTests || platformName;
  }

  return platformName;
};
