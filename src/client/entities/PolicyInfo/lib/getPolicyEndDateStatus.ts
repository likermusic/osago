import dayjs from 'dayjs';

import { formatDate } from 'commonUtils/formatters';

import { PolicyEndDateStatus } from './policyEndDateStatuses';

export const getPolicyEndDateStatus = (endDate?: string | null): PolicyEndDateStatus => {
  if (!endDate) return PolicyEndDateStatus.LastPolicyEndDayUnavailable;

  const endDateObject = formatDate.toObjectFromServer(endDate);
  if (endDateObject.isValid()) {
    const daysToEnd = endDateObject.diff(dayjs().startOf('date'), 'day');

    if (daysToEnd >= 60) {
      return PolicyEndDateStatus.LastPolicyEndDayMoreThan60Days;
    }

    if (daysToEnd < 60 && daysToEnd > 0) {
      return PolicyEndDateStatus.LastPolicyEndDayLessThan60Days;
    }

    if (daysToEnd === 0) {
      return PolicyEndDateStatus.LastPolicyEndDayIsToday;
    }

    if (daysToEnd >= -12 && daysToEnd < 0) {
      return PolicyEndDateStatus.LastPolicyEndDayWas;
    }

    if (daysToEnd < -12) {
      return PolicyEndDateStatus.LastPolicyEndDayMoreThan12DaysAgo;
    }
  }

  return PolicyEndDateStatus.LastPolicyEndDayUnavailable;
};
