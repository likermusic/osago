import { createSelector } from 'reselect';

import { PARTNERS_IDS } from 'constants/partners';

import type { SliceStateFromReducer } from 'shared/types';

import type { whiteLabelSlice } from './whiteLabels.model';

type TWhiteLabelsStore = SliceStateFromReducer<typeof whiteLabelSlice>;

// Selectors
export const isNonPartnerWlSelector = (state: TWhiteLabelsStore) => state.whiteLabel.nonPartnerWl;

export const whiteLabelAffIdSelector = (state: TWhiteLabelsStore) => state.whiteLabel.wl?.affId;
export const whiteLabelSelector = (state: TWhiteLabelsStore) => state.whiteLabel.wl;
export const whiteLabelThemeSelector = (state: TWhiteLabelsStore) => state.whiteLabel.wl.themePalette || '';
export const isWhiteLabelFullFlowSelector = (state: TWhiteLabelsStore) => state.whiteLabel.wl.isFullLanding;
export const isQuestionnaireOnWLLandingSelector = (state: TWhiteLabelsStore) =>
  state.whiteLabel.wl.isQuestionnaireOnLanding;

export const isWLSelector = (state: TWhiteLabelsStore) => !!state.whiteLabel.wl?.affId;

export const isWLExcludeOtpSelector = createSelector(
  whiteLabelAffIdSelector,
  (affId) => !!affId && affId !== PARTNERS_IDS.otp,
);
export const isWLOtpSelector = createSelector(whiteLabelAffIdSelector, (affId) => affId === PARTNERS_IDS.otp);
