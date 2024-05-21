import { Documents } from '@sravni/cosago-react-library/lib/constants';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { mapCarInfoToQuery } from 'entities/carInfo/lib/mapCarInfoToQuery';

describe('WHEN "mapCarInfoToQuery" is called', () => {
  const BASIC_CAR: CarInfoCommonFields = {
    bodyNumber: '',
    carBrand: {
      data: {
        alias: 'bmw',
        isPrefilled: true,
      },
      label: 'BMW',
      value: 43,
    },
    carModel: {
      data: {
        isPrefilled: true,
      },
      label: 'X6',
      value: 640,
    },
    carManufactureYear: {
      data: {
        isPrefilled: true,
      },
      value: 2021,
      label: '2021',
    },
    carModification: {
      data: {
        shortName: 'M Competition',
      },
      label: '4.4 M Competition AT',
      value: 'M Competition',
    },
    carNumber: 'К185ЕК797',
    carVinNumber: 'X4XCY69470Y805657',
    chassisNumber: '',
    documentIssueDate: '18.09.2021',
    documentNumber: '9937553150',
    documentType: Documents.ECarDocumentType.STS,
    enginePower: {
      data: {
        isPrefilled: true,
      },
      label: '340 л.с. / 250,07 кВт',
      value: 340,
    },
    identifyType: Documents.CarIdentifyType.VIN,
  };

  const BASIC_CAR_MAPPED = {
    brandId: 43,
    carDocument: {
      date: '2021-09-18',
      documentType: 'sts',
      number: '553150',
      series: '9937',
    },
    carNumber: 'К185ЕК797',
    enginePower: 340,
    modelId: 640,
    modification: 'M Competition',
    vin: 'X4XCY69470Y805657',
    year: 2021,
  };

  it('MUST normalize correctly', () => {
    expect(mapCarInfoToQuery(BASIC_CAR)).toEqual(BASIC_CAR_MAPPED);
  });

  it('AND values are string MUST convert to numeric', () => {
    expect(
      mapCarInfoToQuery({
        ...BASIC_CAR,
        carBrand: {
          ...BASIC_CAR.carBrand,
          value: '43',
        },
        carModel: {
          ...BASIC_CAR.carModel,
          value: '640',
        },
        carManufactureYear: {
          ...BASIC_CAR.carManufactureYear,
          value: '2021',
        },
      }),
    ).toEqual(BASIC_CAR_MAPPED);
  });

  it('AND bodyNumber is provided MUST normalize with vin', () => {
    expect(
      mapCarInfoToQuery({
        ...BASIC_CAR,
        chassisNumber: '123',
        bodyNumber: '123',
        identifyType: Documents.CarIdentifyType.BodyNumber,
      }),
    ).toEqual(BASIC_CAR_MAPPED);
  });

  it('AND no date MUST normalize without invalid date', () => {
    expect(
      mapCarInfoToQuery({
        ...BASIC_CAR,
        documentIssueDate: '',
      }),
    ).toEqual({ ...BASIC_CAR_MAPPED, carDocument: { ...BASIC_CAR_MAPPED.carDocument, date: undefined } });
  });
});
