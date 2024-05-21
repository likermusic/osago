import type { TInsurerState } from './insurer.slice';

export const selectInsurer = (state: TInsurerState) => state.insurer;
export const selectInsurerDataOrDefaults = (state: TInsurerState) => {
  if (!state.insurer.data) {
    return state.insurer.defaults;
  }

  return state.insurer.data;
};

export const selectIsInsurerFulfilled = (state: TInsurerState) => state.insurer.isFullFilled;
export const selectIsInsurerFilledByEsia = (state: TInsurerState) => state.insurer.isFilledByEsiaStatus;
