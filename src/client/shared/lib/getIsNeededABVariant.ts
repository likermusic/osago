import type { IAbTestingStatistics } from '@sravni/ab-testing-sdk/lib/browser';

export const getIsNeededABVariant = (
  experimentName: string,
  variant: string,
  statistics: IAbTestingStatistics['statistics'] | undefined | null,
) => {
  const [_, currentABVariant] =
    statistics
      ?.split('|')
      ?.find((statistic) => statistic.includes(experimentName))
      ?.split('.') ?? [];

  return currentABVariant === variant;
};
