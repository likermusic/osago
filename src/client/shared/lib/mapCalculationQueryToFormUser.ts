import { formatDateString } from '@sravni/cosago-react-library/lib/utils';

import { getPersonFullName } from 'shared/lib/index';

import type { TUserForMapping } from '../types/TQuerySupportedForMapping';
import type { UserCommonFields } from '../types/UserCommonFields';

export const mapCalculationQueryToFormUser = (user: TUserForMapping | null): UserCommonFields => {
  const { passport, birthDate, address, registrationAddress, registrationAddressFlat = '' } = user || {};
  const insurerName = getPersonFullName(user);
  const currentAddress = address?.formattedAddress ?? registrationAddress;

  return {
    /**
     * Если восстанавливаем по квере из стора, то номер квартиры должен быть,
     * если же из квери с бэка, то адрес объединен с квартирой.
     * Нет смысла его парсить, так как потом все равно сшивать для отправки
     * */
    registrationAddressFlat: address?.data?.flatNumber ?? registrationAddressFlat,
    passportNumber: [passport?.series, passport?.number].join(''),
    birthday: birthDate ? formatDateString(birthDate) : '',
    registrationAddress: currentAddress
      ? {
          value: currentAddress,
          label: currentAddress,
          data: {
            fias_level: registrationAddressFlat || registrationAddress ? '8' : address?.formattedFiasLevel ?? '',
          },
        }
      : null,
    fullName: insurerName ? { value: insurerName, label: insurerName } : null,
    passportIssueDate: passport?.issueDate ? formatDateString(passport.issueDate) : '',
  };
};
