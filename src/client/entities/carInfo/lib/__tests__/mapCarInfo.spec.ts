import type { Auto } from 'commonTypes/api/auto';

import { CAR_INFO_PREFILLED_MOCK } from '../../../../../__mocks__';
import { mapCarInfo } from '../mapAutoInfo';

describe('WHEN "mapCarInfo" is called', () => {
  it('AND data was provided, MUST map provided data to form fields', () => {
    expect(mapCarInfo(CAR_INFO_PREFILLED_MOCK)).toEqual({
      bodyNumber: '',
      carBrand: {
        data: {
          alias: 'alias',
          isPrefilled: true,
        },
        label: 'name',
        value: 1,
      },
      carManufactureYear: {
        data: {
          isPrefilled: true,
        },
        label: '2020',
        value: 2020,
      },
      carModel: {
        data: {
          isPrefilled: true,
        },
        categories: ['B'],
        label: 'name',
        value: 2,
      },
      carVinNumber: '',
      category: {
        label: 'B',
        value: 'B',
      },
      chassisNumber: '',
      documentIssueDate: '',
      documentNumber: '',
      documentType: 'sts',
      enginePower: {
        data: {
          isPrefilled: true,
        },
        label: '122 л.с. / 89,73 кВт',
        value: 122,
      },
      identifyType: 'carVinNumber',
    });
  });

  it('AND data was not provided, MUST return null', () => {
    expect(mapCarInfo(null as unknown as Auto.GetAutoInfo)).toBeNull();
  });
});
