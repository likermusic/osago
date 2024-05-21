import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';

import type { StatePolicies } from 'entities/policies';
import { preparePolicyDate } from 'entities/policies/lib';

import { mapPolicies } from '../mapPolicies';

const FULL_DATA: PreviousCalculation.GetProlongationPolicies = {
  result: [
    {
      hash: 'hash1',
      companyId: 1234,
      companyName: 'company1',
      policyLink: 'https/policyLink1',
      brandName: 'audi',
      modelName: 'Q5',
      policyEndDate: new Date().toISOString(),
      isProlongation: true,
      regNumber: 'А197МВ197',
      vin: 'WV2ZZZ7HZJH145217',
      vehicleCategory: 'b',
      drivers: [
        {
          fio: 'Григорий Григорьев Григорьевич',
          kbm: 0.46,
        },
      ],
    },
    {
      hash: 'hash2',
      companyId: 5678,
      companyName: 'company2',
      policyLink: 'https/policyLink2',
      brandName: 'BMW',
      modelName: 'X3',
      policyEndDate: new Date().toISOString(),
      isProlongation: false,
      regNumber: 'A777AA77',
      vin: 'XTH32213220242753',
      vehicleCategory: 'a',
      drivers: [
        {
          fio: 'Хасан Хасанов Хасанович',
          kbm: 666,
        },
        {
          fio: 'Очень Акуратьев Водилович',
          kbm: 0.46,
        },
      ],
    },
  ],
};

const FULL_DATA_MAPPED: StatePolicies = {
  result: [
    {
      AvatarIcon: '//f.sravni.ru/logotypes/ic/40x40/logo_1234.svg',
      badges: [
        {
          color: 'red',
          text: preparePolicyDate(FULL_DATA.result![0].policyEndDate)?.description,
          variant: 'primary',
        },
        {
          color: 'white',
          text: '1 водитель',
          variant: 'primary',
        },
      ],
      orderHash: 'prolongation-hash1',
      regNumber: 'А197МВ197',
      subtitle: 'audi Q5',
      title: 'company1',
      vehicleType: 'car',
    },
    {
      AvatarIcon: '//f.sravni.ru/logotypes/ic/40x40/logo_5678.svg',
      badges: [
        {
          color: 'red',
          text: preparePolicyDate(FULL_DATA.result![1].policyEndDate)?.description,
          variant: 'primary',
        },
        {
          color: 'white',
          text: '2 водителя',
          variant: 'primary',
        },
      ],
      orderHash: 'prolongation-hash2',
      regNumber: 'A777AA77',
      subtitle: 'BMW X3',
      title: 'company2',
      vehicleType: 'motorcycle',
    },
  ],
};

describe('WHEN "mapPolicies" is called', () => {
  it.each([null, undefined, { result: [] }, { result: null }, { result: undefined }])(
    'AND result was provided as falsy value MUST return in result empty array',
    (policies) => {
      // @ts-ignore
      expect(mapPolicies(policies)).toEqual({ result: [] });
    },
  );

  it('AND result was fully provided MUST map correctly', () => {
    expect(mapPolicies(FULL_DATA)).toEqual(FULL_DATA_MAPPED);
  });
});
