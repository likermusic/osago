import { setupPluralize } from '@sravni/utils/lib/pluralize';

import { PluralizeTexts } from './constants';

export const pluralizeAge = setupPluralize(PluralizeTexts.age);
export const pluralizeDrivers = setupPluralize(PluralizeTexts.drivers);
export const pluralizeDriversGenitive = setupPluralize(PluralizeTexts.driversGenitive);
export const pluralizePresents = setupPluralize(PluralizeTexts.presents);
export const pluralizeOffices = setupPluralize(PluralizeTexts.offices);
export const pluralizePayments = setupPluralize(PluralizeTexts.payments);
