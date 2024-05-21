import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';
import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

import { isUserLoggedInSelector } from 'entities/user';

import type { TStep } from '../types';

import type { raffleRegistrationSlice } from './RaffleRegistration.slice';

type TRaffleRegistrationState = SliceStateFromReducer<typeof raffleRegistrationSlice>;

export const lotteryNameSelector = (state: TRaffleRegistrationState) => state.raffleRegistration.lotteryName;

export const isMaxTicketsRegistredSelector = (state: TRaffleRegistrationState) =>
  state.raffleRegistration.isMaxTicketsRegistred;

export const startStepSelector = createSelector(
  isMaxTicketsRegistredSelector,
  isUserLoggedInSelector,
  (isMaxTicketsRegistred, isAuthed): TStep => {
    if (!isAuthed) return 'Auth';
    if (isMaxTicketsRegistred === null) return 'Loading';
    if (isMaxTicketsRegistred) return 'MaxPoliciesRegistered';

    return 'ChoosePolicy';
  },
);

export const rafflePoliciesSelector = (state: TRaffleRegistrationState): ICustomSelectOption[] =>
  state.raffleRegistration.policies;

export const registratedPolicyNumbersSelector = (state: TRaffleRegistrationState) =>
  state.raffleRegistration.policies.filter((policy) => policy.disabled).map((policy) => policy.value.toString());

export const registratedIdSelector = (state: TRaffleRegistrationState) =>
  state.raffleRegistration.registratedId?.toString() || '';
