import type { Raffle } from 'commonTypes/api/raffle';

import { formatExistValue, isValueExist } from 'shared/lib';

import type { TGetPoliciesForRaffleResponse } from '../types';

import { sortRafflePolicies } from './sortRafflePolicies';

const POLICY_LABEL_RECORD = {
  Osago: 'ОСАГО',
  Kasko: 'КАСКО',
  TravelInsurance: 'Путешествия',
  PropertyInsurance: 'Имущество',
  MortgageInsurance: 'Ипотека',
  AccidentInsurance: 'Несчастный случай',
};

export const mapGetPoliciesForRaffle = (
  data: Raffle.GetPoliciesForRaffleResponse | undefined,
): TGetPoliciesForRaffleResponse => ({
  policies: isValueExist(
    sortRafflePolicies(data?.policies)?.map((policy) => {
      const productType = formatExistValue(
        policy.productType,
        (value) => POLICY_LABEL_RECORD[value as keyof typeof POLICY_LABEL_RECORD],
        'Неизвестно',
      );
      const policyNumber = isValueExist(policy.policyNumber, 'неизвестно');
      const isRegistered = isValueExist(policy.isRegistered, false);

      return {
        label: [isValueExist(productType, 'Неизвестно'), policyNumber].join(' – ').trim(),
        value: policyNumber,
        description: isRegistered ? 'полис уже участвует в акции' : '',
        disabled: productType && policy.policyNumber ? isRegistered : true,
        orderId: policy.orderId,
        productType: policy.productType,
      };
    }),
    [],
  ),
  isMaxTicketsRegistred: isValueExist(data?.isMaxCountOfTicketsRegistered, false),
});
