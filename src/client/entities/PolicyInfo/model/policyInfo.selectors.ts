import { createSelector } from '@reduxjs/toolkit';

import { formatDate } from 'commonUtils/formatters';

import type { TPolicyInfoState } from '../types';

// Рекомендованная дата и инфа о полисе
export const currentPolicySelector = (state: TPolicyInfoState) => state.policyInfo.currentPolicy;
export const currentPolicyStartDateSelector = (state: TPolicyInfoState) =>
  state.policyInfo.currentPolicy?.currentStartDate;

// Селектор нужен, тк в сторе храним дату в формате строки(redux стор не поддерживает Date и тд),
// а на UI нужна дата в формате Date
export const currentPolicyAsDatesSelector = createSelector(currentPolicySelector, (currentPolicy) => ({
  currentStartDate: formatDate.toDateFromClient(currentPolicy.currentStartDate),
  recommendedStartDate:
    currentPolicy.recommendedStartDate && formatDate.toDateFromClient(currentPolicy.recommendedStartDate),
}));
export const lastPolicySelector = (state: TPolicyInfoState) => state.policyInfo.lastPolicy;
