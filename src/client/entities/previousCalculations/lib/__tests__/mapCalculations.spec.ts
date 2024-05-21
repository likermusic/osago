import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';

import type { previousCalculationsState } from '../../types';
import { mapCalculations } from '../mapPreviousCalculation';

const FULLY_DATA: PreviousCalculation.GetCalculations = {
  total: 4,
  result: [
    {
      hash: 'Cd1bvd23VIb3Oevd0V4rEg',
      brandName: 'Hyundai',
      modelName: 'Matrix',
      searchDate: '2024-04-03T13:24:01.017',
      minPrice: 18701.84,
      regNumber: '1234АА11',
      vin: 'NLHPM81CP9Z058938',
      vehicleCategory: 'b',
      drivers: [
        {
          fio: 'КАЗАКОВА ТАТЬЯНА',
          kbm: 1.17,
        },
      ],
    },
    {
      hash: '3vRz_2-GPDultTCnVvjiGg',
      brandName: 'Acura',
      modelName: 'EL',
      searchDate: '2024-04-01T14:42:08.717',
      minPrice: 17807.34,
      regNumber: 'Н221НН11',
      vin: 'CVCMDFEW231221121',
      vehicleCategory: 'b',
      drivers: [
        {
          fio: 'ОВАО АВОВАО',
          kbm: null,
        },
      ],
    },
    {
      hash: '_3sW_dSn_LaJdFoBmduifg',
      brandName: 'Abarth',
      modelName: '500',
      searchDate: '2024-04-01T14:40:47.67',
      minPrice: 5662.86,
      regNumber: 'А345АА345',
      vin: 'XXX34234523456346',
      vehicleCategory: 'c',
      drivers: [
        {
          fio: 'ГРИГОРЬЕВ КОНСТАНТИН',
          kbm: 0.46,
        },
      ],
    },
    {
      hash: 'EyKMtyhYW5WGbvI04Cvn0w',
      brandName: 'UAZ',
      modelName: '3303',
      searchDate: '2024-04-01T14:40:36.72',
      minPrice: 5902.08,
      regNumber: 'Н564НН56',
      vin: 'XTT330360V0024172',
      vehicleCategory: 'a',
      drivers: [
        {
          fio: 'КАТЫШЕВА НАДЕЖДА',
          kbm: 0.46,
        },
      ],
    },
  ],
  error: null,
  hasError: false,
};

const MAPPED_FULLY_DATA: previousCalculationsState = {
  result: [
    {
      auto: 'Hyundai Matrix',
      calculationHash: 'calculation-Cd1bvd23VIb3Oevd0V4rEg',
      minPrice: 18701.84,
      regNumber: '1234АА11',
      vehicleType: 'car',
    },
    {
      auto: 'Acura EL',
      calculationHash: 'calculation-3vRz_2-GPDultTCnVvjiGg',
      minPrice: 17807.34,
      regNumber: 'Н221НН11',
      vehicleType: 'car',
    },
    {
      auto: 'Abarth 500',
      calculationHash: 'calculation-_3sW_dSn_LaJdFoBmduifg',
      minPrice: 5662.86,
      regNumber: 'А345АА345',
      vehicleType: 'car',
    },
    {
      auto: 'UAZ 3303',
      calculationHash: 'calculation-EyKMtyhYW5WGbvI04Cvn0w',
      minPrice: 5902.08,
      regNumber: 'Н564НН56',
      vehicleType: 'motorcycle',
    },
  ],
};

describe('WHEN "mapCalculations" is called', () => {
  it.each([[null], [undefined], [], null, undefined])(
    'AND data was provided nullable MUST return empty array',
    (data) => {
      expect(mapCalculations(data as PreviousCalculation.GetCalculations)).toEqual({ result: [] });
    },
  );

  it('AND data was fully provided MUST map correctly', () => {
    expect(mapCalculations(FULLY_DATA)).toEqual(MAPPED_FULLY_DATA);
  });
});
