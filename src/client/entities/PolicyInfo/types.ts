import type { SliceStateFromReducer } from 'shared/types';

import type { PolicyEndDateStatus } from './lib/policyEndDateStatuses';
import type { policyInfoSlice } from './model/policyInfo.slice';

export interface ILastPolicy {
  endDateStatus?: PolicyEndDateStatus;
  insCompanyName?: string;
  endDate?: string;
}

export interface CurrentPolicy {
  recommendedStartDate: string;
  currentStartDate: string;
}

export interface IPolicyInfo {
  lastPolicy: ILastPolicy;
  currentPolicy: CurrentPolicy;
}

export type TPolicyInfoState = SliceStateFromReducer<typeof policyInfoSlice>;
