import type { SliceStateFromReducer } from 'shared/types';

import type { policyDraftSlice } from './policyDraft.slice';

type TPolicyDraftState = SliceStateFromReducer<typeof policyDraftSlice>;

export const policiesDraftsUrlsSelector = (state: TPolicyDraftState) => state.policyDraft;
