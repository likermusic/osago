import dayjs from 'dayjs';

import { formatDate } from 'commonUtils/formatters';

import { getPolicyEndDateStatus } from '../getPolicyEndDateStatus';
import { PolicyEndDateStatus } from '../policyEndDateStatuses';

describe('WHEN getPolicyEndDateStatus is called', () => {
  const today = dayjs().startOf('date');

  it('AND "end date" is today MUST return LastPolicyEndDayIsToday', () => {
    expect(getPolicyEndDateStatus(formatDate.toServerFromObject(today))).toBe(
      PolicyEndDateStatus.LastPolicyEndDayIsToday,
    );
  });

  it('AND "end date" is more than 14 days ago before today MUST return LastPolicyEndDayMoreThan12DaysAgo', () => {
    expect(getPolicyEndDateStatus(formatDate.toServerFromObject(today.add(-15, 'day')))).toBe(
      PolicyEndDateStatus.LastPolicyEndDayMoreThan12DaysAgo,
    );
  });

  it('AND "end date" is more than 10 days ago before today MUST return LastPolicyEndDayWas', () => {
    expect(getPolicyEndDateStatus(formatDate.toServerFromObject(today.add(-10, 'day')))).toBe(
      PolicyEndDateStatus.LastPolicyEndDayWas,
    );
  });

  it.each([[59], [1], [34]])(
    'AND "end date" is in range 60 days and it is equal %p after today MUST return LastPolicyEndDayLessThan60Days',
    (endDate) => {
      expect(getPolicyEndDateStatus(formatDate.toServerFromObject(today.add(endDate, 'day')))).toBe(
        PolicyEndDateStatus.LastPolicyEndDayLessThan60Days,
      );
    },
  );

  it('AND "end date" is more than 60 days after today MUST return LastPolicyEndDayMoreThan60Days', () => {
    expect(getPolicyEndDateStatus(formatDate.toServerFromObject(today.add(60, 'day')))).toBe(
      PolicyEndDateStatus.LastPolicyEndDayMoreThan60Days,
    );
  });

  it('AND "end date" is not provided return LastPolicyEndDayUnavailable', () => {
    expect(getPolicyEndDateStatus(null)).toBe(PolicyEndDateStatus.LastPolicyEndDayUnavailable);
  });

  it('AND "end date" is not date MUST return LastPolicyEndDayUnavailable', () => {
    expect(getPolicyEndDateStatus('some invalid string')).toBe(PolicyEndDateStatus.LastPolicyEndDayUnavailable);
  });
});
