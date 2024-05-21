import type { Raffle } from 'commonTypes/api/raffle';

import { mapGetPoliciesForRaffle } from '../mapGetPoliciesForRaffle';

const NORMAL_MOCK = {
  policies: [
    {
      productType: 'Osago',
      policyNumber: 'xxx4233244324',
      orderId: '12343214431',
      isRegistered: false,
    },
    {
      productType: 'PropertyInsurance',
      policyNumber: 'xxx4233244324',
      orderId: '12343214431',
      isRegistered: false,
    },
    {
      productType: 'MortgageInsurance',
      policyNumber: 'xxx4233244324',
      orderId: '12343214431',
      isRegistered: false,
    },
    {
      productType: 'AccidentInsurance',
      policyNumber: 'xxx4233244324',
      orderId: '12343214431',
      isRegistered: false,
    },
    {
      productType: 'Kasko',
      policyNumber: 'xxx4233244324',
      orderId: '12343214431',
      isRegistered: true,
    },
    {
      productType: 'TravelInsurance',
      policyNumber: 'xxx4233244324',
      orderId: '12343214431',
      isRegistered: true,
    },
    {
      productType: '3232',
      policyNumber: null,
      orderId: null,
      isRegistered: null,
    },
  ],
  isMaxCountOfTicketsRegistered: false,
};

const NORMAL_RESULT = {
  policies: [
    {
      label: 'ОСАГО – xxx4233244324',
      value: 'xxx4233244324',
      description: '',
      disabled: false,
      orderId: '12343214431',
      productType: 'Osago',
    },
    {
      label: 'Имущество – xxx4233244324',
      value: 'xxx4233244324',
      description: '',
      disabled: false,
      orderId: '12343214431',
      productType: 'PropertyInsurance',
    },
    {
      label: 'Ипотека – xxx4233244324',
      value: 'xxx4233244324',
      description: '',
      disabled: false,
      orderId: '12343214431',
      productType: 'MortgageInsurance',
    },
    {
      label: 'Несчастный случай – xxx4233244324',
      value: 'xxx4233244324',
      description: '',
      disabled: false,
      orderId: '12343214431',
      productType: 'AccidentInsurance',
    },
    {
      label: 'Неизвестно – неизвестно',
      value: 'неизвестно',
      description: '',
      disabled: true,
      orderId: null,
      productType: '3232',
    },
    {
      label: 'КАСКО – xxx4233244324',
      value: 'xxx4233244324',
      description: 'полис уже участвует в акции',
      disabled: true,
      orderId: '12343214431',
      productType: 'Kasko',
    },
    {
      label: 'Путешествия – xxx4233244324',
      value: 'xxx4233244324',
      description: 'полис уже участвует в акции',
      disabled: true,
      orderId: '12343214431',
      productType: 'TravelInsurance',
    },
  ],
  isMaxTicketsRegistred: false,
};

describe('WHEN mapGetPoliciesForRaffle is called', () => {
  it('AND data not nullable, MUST map correctly', () => {
    expect(mapGetPoliciesForRaffle(NORMAL_MOCK)).toEqual(NORMAL_RESULT);
  });

  it.each([null, undefined, {}, [], ''])('AND data is not correct, MUST return empty object', (data) => {
    expect(mapGetPoliciesForRaffle(data as Raffle.GetPoliciesForRaffleResponse)).toEqual({
      policies: [],
      isMaxTicketsRegistred: false,
    });
  });
});
