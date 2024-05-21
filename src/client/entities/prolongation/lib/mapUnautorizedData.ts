import { beautifyPhoneNumber } from '@sravni/cosago-react-library/lib/utils';

import type { TMapPolicyDataMapper } from '../types';

import { normalizeAuto } from './normalizeAuto';
import { normalizeDrivers } from './normalizeDrivers';
import { normalizeDriversCount } from './normalizeDriversCount';

const NUMBER_SUBTITLE = 'Если у вас сменился номер, заполните все данные вручную';

export const mapUnauthorizedData: TMapPolicyDataMapper = (params) => {
  const { brandName, modelName, vehicleYear, maskedPhone, drivers, userName } = params || {};

  return {
    sravniProlongation: [
      { title: userName ?? '', icon: 'userName' },
      { title: beautifyPhoneNumber(maskedPhone ?? ''), subtitle: NUMBER_SUBTITLE, icon: 'maskedPhone' },
      {
        title: normalizeAuto(brandName, modelName, vehicleYear),
        icon: 'auto',
      },
    ],
    lastSearch: [
      { title: normalizeDriversCount(drivers?.length), subtitle: normalizeDrivers(drivers), icon: 'drivers' },
      { title: beautifyPhoneNumber(maskedPhone ?? ''), subtitle: NUMBER_SUBTITLE, icon: 'maskedPhone' },
      {
        title: normalizeAuto(brandName, modelName, vehicleYear),
        icon: 'auto',
      },
    ],
    newShortProlongation: [],
    shortProlongation: [],
  };
};
