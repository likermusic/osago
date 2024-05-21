import { useEffect } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { isUserLoggedInSelector } from 'entities/user';

import { useLazyGetPoliciesForRaffle } from '../model/RaffleRegistration.query';
import { lotteryNameSelector } from '../model/RaffleRegistration.selectors';

export const useGetPoliciesForRaffle = () => {
  const isAuthed = useAppSelector(isUserLoggedInSelector);
  const lotteryName = useAppSelector(lotteryNameSelector);
  const [getPoliciesForRaffle, { isLoading, isError }] = useLazyGetPoliciesForRaffle();

  useEffect(() => {
    if (isAuthed && lotteryName) getPoliciesForRaffle(lotteryName);
  }, [getPoliciesForRaffle, isAuthed, lotteryName]);

  return { isLoading, isError };
};
