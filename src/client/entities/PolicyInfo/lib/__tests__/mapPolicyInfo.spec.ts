import dayjs from 'dayjs';

import { formatDate } from 'commonUtils/formatters';

import { getPolicyEndDateStatus } from '../getPolicyEndDateStatus';
import { mapPolicyInfo } from '../mapPolicyInfo';
import { PolicyEndDateStatus } from '../policyEndDateStatuses';

const MockData = {
  startDate: '2023-09-02',
  isByPolicy: false,
  isByEarlyOrder: false,
  insCompanyName: 'Росгосстрах',
  lastPolicyEndDate: '2024-04-27T00:00:00',
  insCompanyId: 8105,
  lastPolicyPrice: 3829.25,
};

const NullishMockData = {};

describe('WHEN "mapPolicyInfo" is called', () => {
  it('AND "data" is not provided, MUST return object with currentDate +4 from current day', () => {
    const recommendedStartDate = formatDate.toClientFromObject(dayjs().add(4, 'day'));
    expect(mapPolicyInfo(undefined)).toEqual({
      lastPolicy: {},
      currentPolicy: {
        recommendedStartDate,
        currentStartDate: recommendedStartDate,
      },
    });
  });

  it('AND "data" is provided, MUST return result', () => {
    const recommendedStartDate = formatDate.toClientFromServer(MockData.startDate);
    expect(mapPolicyInfo(MockData)).toEqual({
      lastPolicy: {
        insCompanyName: MockData.insCompanyName,
        endDate: formatDate.toClientFromServer(MockData.lastPolicyEndDate),
        endDateStatus: getPolicyEndDateStatus(MockData.lastPolicyEndDate),
      },
      currentPolicy: {
        recommendedStartDate,
        currentStartDate: recommendedStartDate,
      },
    });
  });

  it('AND "info" is provided, but one or more field is equal null or undefined, MUST return result without that field', () => {
    const FourDaysDateAfterToDay = formatDate.toClientFromObject(dayjs().add(4, 'day'));
    expect(mapPolicyInfo(NullishMockData)).toEqual({
      lastPolicy: {
        endDateStatus: PolicyEndDateStatus.LastPolicyEndDayUnavailable,
      },
      currentPolicy: {
        currentStartDate: FourDaysDateAfterToDay,
        recommendedStartDate: FourDaysDateAfterToDay,
      },
    });
  });
});
