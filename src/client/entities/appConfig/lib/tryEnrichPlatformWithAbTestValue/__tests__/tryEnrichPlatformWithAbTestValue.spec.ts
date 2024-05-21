import { PLATFORM_TYPES } from '../../../constants';
import type { TAppConfig } from '../../../types';
import { tryEnrichPlatformWithAbTestValue } from '../tryEnrichPlatformWithAbTestValue';

describe('WHEN "tryEnrichPlatformWithAbTestValue" is called', () => {
  const CURRENT_EXPERIMENTS = `d40f200b-6c08-4f2d.1|TEST_MOCK_VARIANT_ID.1`;

  it.each([
    ['wl', CURRENT_EXPERIMENTS, PLATFORM_TYPES.wl],
    [
      'sravni.ru',
      CURRENT_EXPERIMENTS,
      `${PLATFORM_TYPES['sravni.ru']}_TEST_MOCK_VARIANT_ID.1,${PLATFORM_TYPES['sravni.ru']}_d40f200b-6c08-4f2d.1`,
    ],
    ['sravni.ru', 'RANDOM_ID', PLATFORM_TYPES['sravni.ru']],
  ])('AND "appType" is %p AND "currentExperiments" is %p, MUST return %p', (appType, currentExperiments, result) => {
    expect(
      tryEnrichPlatformWithAbTestValue(appType as TAppConfig['appType'], {
        statistics: currentExperiments,
        userId: '',
      }),
    ).toEqual(result);
  });
});
