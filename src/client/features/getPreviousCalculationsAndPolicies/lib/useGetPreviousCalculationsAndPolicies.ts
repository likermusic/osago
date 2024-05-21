import { useEffect } from 'react';

import { isPromiseSettledFulfilled } from 'commonUtils/PromiseAllSettledHelpers';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventShowAuthCard } from 'shared/lib/sendGAEvents';

import { useLazyGetPolicies } from 'entities/policies';
import { useLazyGetPreviousCalculations } from 'entities/previousCalculations';
import { isUserLoggedInSelector } from 'entities/user';

export const useGetPreviousCalculationsAndPolicies = () => {
  const [getPreviousCalculations, { isLoading: isPreviousCalculationsLoading }] = useLazyGetPreviousCalculations();
  const [getPreviousPolicies, { isLoading: isFetchingPreviousPolicies }] = useLazyGetPolicies();

  const isLoggedUser = useAppSelector(isUserLoggedInSelector);

  useEffect(() => {
    (async () => {
      if (isLoggedUser) {
        const [previousCalculationsData, shortProlongationData] = await Promise.allSettled([
          getPreviousCalculations(),
          getPreviousPolicies(),
        ]);

        const previousCalculations = isPromiseSettledFulfilled(previousCalculationsData)
          ? previousCalculationsData.value.data
          : undefined;
        const shortProlongation = isPromiseSettledFulfilled(shortProlongationData)
          ? shortProlongationData.value.data
          : undefined;

        !!previousCalculations?.result?.length && sendEventShowAuthCard('Быстрый расчет');
        !!shortProlongation?.result?.length && sendEventShowAuthCard('Быстрое продление');
      }
    })();
  }, [getPreviousCalculations, getPreviousPolicies, isLoggedUser]);

  return { isPreviousCalculationsLoading, isFetchingPreviousPolicies };
};
