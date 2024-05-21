import type { SliceStateFromReducer } from 'shared/types';

import type { ownerSlice } from './owner.slice';

type TOwnerState = SliceStateFromReducer<typeof ownerSlice>;

export const selectOwner = (state: TOwnerState) => state.owner;
export const selectOwnerDataOrDefaults = (state: TOwnerState) => {
  if (!state.owner.data) {
    return state.owner.defaults;
  }

  return state.owner.data;
};

export const selectOwnerPolicyHolderDataOrDefaults = (state: TOwnerState) => {
  if (!state.owner.data) {
    return state.owner.defaults.policyHolder;
  }

  return state.owner.data.policyHolder;
};

export const selectOwnerData = (state: TOwnerState) => state.owner.data;
export const selectIsOwnerFilledByEsia = (state: TOwnerState) => state.owner.isFilledByEsiaStatus;

export const selectPrevHolder = (state: TOwnerState) => state.owner.prevPolicyHolder;
