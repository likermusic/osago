import type { SliceStateFromReducer } from 'shared/types';

import type { purchasedPolicySlice } from './purchasedPolicy.slice';

type TPurchasedPolicyState = SliceStateFromReducer<typeof purchasedPolicySlice>;

export const purchasedPolicyInfoSelector = (state: TPurchasedPolicyState) => state.purchasedPolicy.info;
export const policyLinkSelector = (state: TPurchasedPolicyState) => state.purchasedPolicy.policyLink;
