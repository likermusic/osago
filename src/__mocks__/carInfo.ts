import type { Auto } from 'commonTypes/api/auto';

import { AUTO_INFO_SERVICE_BRAND } from './brand';
import { AUTO_INFO_SERVICE_MODEL } from './model';

export const CAR_INFO_PREFILLED_MOCK: Auto.AutoInfo = {
  brand: AUTO_INFO_SERVICE_BRAND,
  model: AUTO_INFO_SERVICE_MODEL,
  carDocument: { date: '', documentType: 'sts', number: '', series: '' },
  vin: '',
  bodyNumber: '',
  chassisNumber: '',
  carNumber: '',
  year: 2020,
  power: 122,
  years: [2020],
  models: [AUTO_INFO_SERVICE_MODEL],
  powers: [122],
  stsReceive: '',
  modifications: [],
};
