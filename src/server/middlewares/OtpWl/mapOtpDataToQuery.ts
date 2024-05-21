import { joinFullName } from '@sravni/cosago-react-library/lib/utils';
import {
  ADDRESS_FIAS_LEVEL_HOUSE,
  ADDRESS_FIAS_LEVEL_LAND_HOUSE,
} from '@sravni/cosago-react-library/lib/validationSchemes';

import type { OTP } from 'commonTypes/api/OTPData';
import type { Query } from 'commonTypes/api/query';
import type { TFrontQuery } from 'commonTypes/TFrontQuery';

import { getFlatAndAddressFromFullAddress, getSeriesAndNumberFromFullNumber } from '../../../commonUtils';
import { PASSPORT_NUMBER_LENGTH, PASSPORT_SERIES_LENGTH } from '../../../constants/documentsLength';

const GENDER_MAP: Record<
  OTP.OtpUserData['personalData']['gender'],
  Required<Query.TRestoreCalculationQueryResponse>['owner']['gender']
> = {
  f: 'female',
  m: 'male',
};

export const mapOtpDataToQuery = (data: OTP.OtpUserData): Nullable<TFrontQuery> => {
  const { personalData } = data || {};
  if (!personalData) return null;

  const {
    firstName,
    lastName,
    middleName,
    // series + number
    passportNumber,
    // ISO 8601 (YYYY-MM-DD)
    passportIssueDate,
    // ISO 8601 (YYYY-MM-DD)
    birthDate,
    gender,
    email,
    phone,
    registrationAddress,
  } = personalData;

  const { number, series } = getSeriesAndNumberFromFullNumber(
    passportNumber,
    PASSPORT_NUMBER_LENGTH,
    PASSPORT_SERIES_LENGTH,
  );

  const { address: formattedAddress, flat: flatNumber } = getFlatAndAddressFromFullAddress(registrationAddress);

  // ОТП не передает данные по fiasLevel, так как человек смог там прописаться значит все ок с уровнем
  //  ставим значение 8 если есть квартира, если нет значит это дом и ставим 75
  const fiasLevel =
    formattedAddress && (flatNumber ? ADDRESS_FIAS_LEVEL_HOUSE.toString() : ADDRESS_FIAS_LEVEL_LAND_HOUSE.toString());

  const userCommonData = {
    lastName,
    middleName,
    firstName,
    fullName: joinFullName(lastName, firstName, middleName),
    birthDate,
  };

  const userWithPassportData = {
    ...userCommonData,
    passport: {
      number,
      series,
      issueDate: passportIssueDate,
    },
    gender: GENDER_MAP[gender],
    phone,
    email,
    address: {
      data: {
        fiasLevel,
        normalizedAddress: formattedAddress,
        flatNumber,
      },
      formattedAddress,
      formattedFiasLevel: fiasLevel,
    },
  };

  const driver = {
    ...userCommonData,
    license: {
      series: '',
      number: '',
      date: '',
    },
    previousInfo: undefined,
  };

  return {
    owner: userWithPassportData,
    insurer: userWithPassportData,
    driversInfo: {
      driverAmount: 'limited',
      drivers: [driver],
    },

    modelId: undefined,
    modification: undefined,
    year: undefined,
    bodyNumber: undefined,
    policyStartDate: undefined,
    enginePower: undefined,
    vehicleCategory: undefined,
    carNumber: undefined,
    chassisNumber: undefined,
    brandId: undefined,
    carDocument: undefined,
    vin: undefined,
  };
};
