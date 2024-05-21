import { formatDateString } from '@sravni/cosago-react-library/lib/utils';

export const FULL_QUERY = {
  carDocument: {
    documentType: 'sts',
    date: new Date().toISOString(),
    number: '123456',
    series: '1234',
  } as const,
  carNumber: 'c000ee22',
  bodyNumber: '543634563456',
  chassisNumber: '123412341234',
  brandId: 22,
  enginePower: 51,
  vin: '12345678901234',
  year: 2022,
  modification: '320d',
  modelId: 55,
};

export const MAPPED_QUERY_EMPTY = {
  bodyNumber: '',
  carBrand: null,
  carManufactureYear: null,
  carModel: null,
  carNumber: '',
  carVinNumber: '',
  chassisNumber: '',
  documentIssueDate: '',
  documentNumber: '',
  enginePower: null,
  identifyType: 'carVinNumber',
  documentType: undefined,
  category: undefined,
  carModification: undefined,
};

export const FULL_MAPPED_QUERY = {
  bodyNumber: FULL_QUERY.bodyNumber,
  carBrand: {
    value: FULL_QUERY.brandId,
  },
  carManufactureYear: {
    value: FULL_QUERY.year,
  },
  carModel: {
    value: FULL_QUERY.modelId,
  },
  category: undefined,
  carModification: {
    value: FULL_QUERY.modification,
  },
  carNumber: FULL_QUERY.carNumber,
  carVinNumber: FULL_QUERY.vin,
  chassisNumber: FULL_QUERY.chassisNumber,
  documentIssueDate: formatDateString(FULL_QUERY?.carDocument?.date || ''),
  documentNumber: '1234123456',
  documentType: FULL_QUERY?.carDocument?.documentType,
  enginePower: {
    value: FULL_QUERY.enginePower,
  },
  identifyType: 'carVinNumber',
};

export const QUERY_WITHOUT_CAR_DOCUMENT = {
  ...FULL_QUERY,
  carDocument: undefined,
};

export const MAPPED_QUERY_WITHOUT_CAR_DOCUMENT = {
  ...FULL_MAPPED_QUERY,
  documentIssueDate: '',
  documentNumber: '',
  documentType: undefined,
};

export const QUERY_WITHOUT_MODEL = {
  ...FULL_QUERY,
  modelId: undefined,
};

export const MAPPED_QUERY_WITHOUT_MODEL = {
  ...FULL_MAPPED_QUERY,
  modelId: undefined,
  carModel: null,
};
