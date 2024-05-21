import dayjs from 'dayjs';

import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';
import { formatDate } from 'commonUtils/formatters';

import { policyPeriods, policyPeriodsInDays } from 'shared/config/policyPeriod';

import type { TPolicyDate } from '../types';

export const preparePolicyDate = (
  serverPolicyEndDate: NonNullable<PreviousCalculation.GetProlongationPolicies['result']>[number]['policyEndDate'],
): Nullable<TPolicyDate> => {
  if (!serverPolicyEndDate) {
    return null;
  }

  const policyEndDateObj = formatDate.toObjectFromServer(serverPolicyEndDate);
  const policyEndDate = formatDate.toClientFromServer(serverPolicyEndDate);

  if (!policyEndDate || policyEndDate === 'Invalid Date' || !policyEndDateObj) {
    return null;
  }

  const today = dayjs().startOf('date');

  const remainingDays = policyEndDateObj.diff(today, 'day');
  const diffPolicyRemaining = today.diff(policyEndDateObj, 'day');

  if (today.diff(policyEndDateObj, 'day') > policyPeriodsInDays.min) {
    return {
      description: `${policyPeriods.archive}`,
      endDate: policyEndDate,
      remainingDays,
      status: 'negative',
    };
  }

  if (diffPolicyRemaining <= policyPeriodsInDays.min && diffPolicyRemaining > policyPeriodsInDays.today) {
    return {
      description: `${policyPeriods.ended} ${policyEndDate}`,
      endDate: policyEndDate,
      remainingDays,
      status: 'negative',
    };
  }

  if (remainingDays >= policyPeriodsInDays.today && remainingDays < policyPeriodsInDays.min) {
    return {
      description: `${policyPeriods.willEndSoon} ${policyEndDate}`,
      endDate: policyEndDate,
      remainingDays,
      status: 'negative',
    };
  }

  const policyStartDateObj = policyEndDateObj.subtract(1, 'year').add(1, 'day');
  const policyStartDate = formatDate.toClientFromObject(policyStartDateObj);

  if (policyStartDateObj.diff(today) >= 0) {
    return {
      description: `${policyPeriods.willStart} ${policyStartDate}`,
      endDate: policyEndDate,
      remainingDays,
      status: 'positive',
    };
  }

  return {
    description: `${policyPeriods.active} ${policyEndDate}`,
    endDate: policyEndDate,
    remainingDays,
    status: 'positive',
  };
};
