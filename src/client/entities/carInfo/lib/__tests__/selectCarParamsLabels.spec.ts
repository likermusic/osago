import { Documents } from '@sravni/cosago-react-library/lib/constants';

import type { CarInfoCommonFields } from '../../types';
import { selectCarParamsLabels } from '../selectCarParamsLabels';

describe('WHEN "selectCarParamsLabels" is called', () => {
  it('AND info is provided MUST return labels', () => {
    const state = {
      carInfo: {
        dictionaries: {
          models: {
            64: [{ label: 'C30', value: 628 }],
          },
          brands: [{ label: 'Volvo', value: 64, data: { alias: 'volvo' } }],
          years: {
            628: [{ value: 2012, label: '2012' }],
          },
          powers: {
            '64:628:2012': [{ value: 146, label: '146 л.с. / 107,38 кВт' }],
          },
        },
      },
    } as unknown as Store;

    const data: CarInfoCommonFields = {
      carNumber: 'В494ВЕ54',
      carVinNumber: 'YV1MK434BD2300048____',
      carModel: {
        value: 628,
      },
      carBrand: {
        value: 64,
      },
      bodyNumber: '',
      chassisNumber: '',
      documentNumber: '54_21_428848',
      documentType: Documents.ECarDocumentType.EPTS,
      carManufactureYear: {
        value: 2012,
      },
      documentIssueDate: '07.06.2014',
      enginePower: {
        value: 146,
      },
      identifyType: Documents.CarIdentifyType.VIN,
    };

    expect(selectCarParamsLabels(state, data)).toStrictEqual({
      brand: 'Volvo',
      carNumber: 'В 494 ВЕ 54',
      documentIssueDate: '07.06.2014',
      documentNumber: '54 21 428848',
      documentType: 'ЭПТС',
      logo: 'http://f.sravni.tech/logotypes/car-brands/volvo.png',
      model: 'C30',
      power: '146 л.с. / 107,38 кВт',
      vin: 'YV1MK434BD2300048',
      year: '2012',
    });
  });
});
