import dayjs from 'dayjs';

import { formatDate } from 'commonUtils/formatters';

import type { ILastPolicy } from 'entities/PolicyInfo';
import { PolicyEndDateStatus } from 'entities/PolicyInfo';

import { getMessages, policyStartDateNonRecommendedMessage } from '../policyEndDateStatusMessage/constants';
import { getPolicyEndDateStatusMessage } from '../policyEndDateStatusMessage/policyEndDateStatusMessage';

// MOCKS for testing
const recommendedPolicyStartDateMock = new Date();
const currentOfferDate = new Date();
const getLastPolicyInfo = (endDateStatus: PolicyEndDateStatus): ILastPolicy => ({
  insCompanyName: 'test1',
  endDate: formatDate.toClientFromObject(dayjs()),
  endDateStatus,
});

// MOCKS for result
const getLastPolicyEndDayUnavailableMessageMock = `test`;

jest.mock('../policyEndDateStatusMessage/constants.ts', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PolicyEndDateStatus: PolicyEndDateStatusForMock } = require('entities/PolicyInfo');

  return {
    getLastPolicyEndDayUnavailableMessage: (recommendedPolicyStartDate: string) =>
      `${getLastPolicyEndDayUnavailableMessageMock} ${recommendedPolicyStartDate}`,
    getMessages: () => ({
      [PolicyEndDateStatusForMock.LastPolicyEndDayWas]: `test1`,
      [PolicyEndDateStatusForMock.LastPolicyEndDayMoreThan12DaysAgo]: `test2`,
      [PolicyEndDateStatusForMock.LastPolicyEndDayIsToday]: `test3`,
      [PolicyEndDateStatusForMock.LastPolicyEndDayLessThan60Days]: `test4`,
      [PolicyEndDateStatusForMock.LastPolicyEndDayMoreThan60Days]: `test5`,
      [PolicyEndDateStatusForMock.LastPolicyEndDayUnavailable]: `test6`,
    }),
  };
});

describe('WHEN getPolicyEndDateStatusMessage is called', () => {
  it('AND "policyInfo" is not provided MUST return result of getLastPolicyEndDayUnavailableMessage', () => {
    const result = `${getLastPolicyEndDayUnavailableMessageMock} ${formatDate.toLocalizedClientFromClient(
      formatDate.toClientFromDate(recommendedPolicyStartDateMock),
    )}`;

    expect(getPolicyEndDateStatusMessage(recommendedPolicyStartDateMock, currentOfferDate)).toBe(result);
  });

  it(`AND "currentOfferDate" is not equal to "recommendedPolicyStartDate" must return ${policyStartDateNonRecommendedMessage}`, () => {
    const policyInfo = getLastPolicyInfo(PolicyEndDateStatus.LastPolicyEndDayIsToday);
    expect(
      getPolicyEndDateStatusMessage(
        recommendedPolicyStartDateMock,
        new Date(currentOfferDate.getDate() + 1),
        policyInfo,
      ),
    ).toBe(policyStartDateNonRecommendedMessage);
  });

  const messages = getMessages('', '', '', '');

  it.each([Object.entries(messages)])(
    `AND "policyInfo.endDateStatus" is equal to %p "recommendedPolicyStartDate" must return message for each "endDateStatus"`,
    ([key, result]) => {
      const policyInfo = getLastPolicyInfo(key as PolicyEndDateStatus);
      expect(getPolicyEndDateStatusMessage(recommendedPolicyStartDateMock, currentOfferDate, policyInfo)).toBe(result);
    },
  );
});
