import type { SliceStateFromReducer } from 'shared/types';

import type { policiesSlice } from './policies.slice';

type TPoliciesState = SliceStateFromReducer<typeof policiesSlice>;

export const policiesResultSelector = (state: TPoliciesState) => state.policies.result;
export const hasProlongationPoliciesSelector = (state: TPoliciesState) => !!state.policies.result.length;
