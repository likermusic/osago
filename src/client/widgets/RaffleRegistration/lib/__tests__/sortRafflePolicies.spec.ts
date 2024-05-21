import { sortRafflePolicies } from '../sortRafflePolicies';

const POLICIES_MOCK = [
  {
    productType: 'Osago22',
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
    productType: 'Osago',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: false,
  },
  {
    productType: 'Osago',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: true,
  },
  {
    productType: 'Kasko',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: false,
  },
];

const POLICIES_RES_MOCK = [
  {
    productType: 'Osago',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: false,
  },
  {
    productType: 'Osago22',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: false,
  },
  {
    productType: 'Kasko',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: false,
  },
  {
    productType: 'Osago',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: true,
  },
  {
    productType: 'Kasko',
    policyNumber: 'xxx4233244324',
    orderId: '12343214431',
    isRegistered: true,
  },
];

describe('WHEN sortRafflePolicies is called', () => {
  it('MUST set registred "policies" in over of array AND Osago policies in start', () => {
    expect(sortRafflePolicies(POLICIES_MOCK)).toEqual(POLICIES_RES_MOCK);
  });
});
