import dayjs from 'dayjs';

import type { PolicyInfo } from 'commonTypes/api/policyInfo';
import { formatDate } from 'commonUtils/formatters';

import type { IPolicyInfo } from '../types';

import { getPolicyEndDateStatus } from './getPolicyEndDateStatus';

export const mapPolicyInfo = (data?: PolicyInfo.GetRecommendedStartDateRes | null): IPolicyInfo => {
  if (!data) {
    const recommendedStartDate = formatDate.toClientFromObject(dayjs().add(4, 'day'));
    return {
      lastPolicy: {},
      currentPolicy: {
        recommendedStartDate,
        currentStartDate: recommendedStartDate,
      },
    };
  }

  const recommendedStartDate = data.startDate
    ? formatDate.toClientFromServer(data.startDate)
    : formatDate.toClientFromObject(dayjs().add(4, 'day'));

  return {
    lastPolicy: {
      insCompanyName: data.insCompanyName ?? undefined,
      endDate: data.lastPolicyEndDate ? formatDate.toClientFromServer(data.lastPolicyEndDate) : undefined,
      endDateStatus: getPolicyEndDateStatus(data.lastPolicyEndDate),
    },
    currentPolicy: {
      recommendedStartDate,
      currentStartDate: recommendedStartDate,
    },
  };
};
