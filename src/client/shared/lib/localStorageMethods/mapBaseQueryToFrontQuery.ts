import type { TFrontQuery, TFrontQueryDrivers, TFrontQueryUser } from 'commonTypes/TFrontQuery';
import { getFlatAndAddressFromFullAddress } from 'commonUtils/formatters/getFlatAndAddressFromFullAddress';

import { capitalizeFirstLetter } from 'shared/lib/formatters';

import type { TBaseQuery } from '../../types/TCollectQuery';
import { getPersonFullName } from '../getPersonFullName/getPersonFullName';

const mapDrivers = (drivers: TBaseQuery['driversInfo']['drivers']): TFrontQueryDrivers[] =>
  drivers?.map((driver) => {
    const { firstName, lastName, middleName, birthDate } = driver || {};

    const license = 'license' in driver ? driver.license : undefined;
    const previousLicense = 'previousInfo' in driver ? driver.previousInfo : undefined;

    const previousInfo: TFrontQueryDrivers['previousInfo'] = previousLicense
      ? {
          lastName: previousLicense?.lastName,
          firstName: previousLicense?.firstName || firstName,
          middleName: previousLicense?.middleName || middleName,
          fullName: getPersonFullName({
            firstName: previousLicense?.firstName || firstName,
            lastName: previousLicense?.lastName,
            middleName: previousLicense?.middleName || middleName,
          }),
          license: {
            number: previousLicense?.license?.number,
            series: previousLicense?.license?.series,
          },
        }
      : undefined;

    const { date, number, series } = license || {};

    return {
      firstName,
      lastName,
      middleName,
      birthDate,
      fullName: getPersonFullName(driver),

      license: {
        date,
        number,
        series: series || undefined,
      },
      previousInfo,
    };
  });

const mapCarDocument = (carDocument: TBaseQuery['carDocument']): TFrontQuery['carDocument'] => {
  const { date, documentType, number, series } = carDocument || {};

  return {
    date,
    documentType,
    number,
    series: series || undefined,
  };
};

const mapDriversInfo = (driversInfo: TBaseQuery['driversInfo']): TFrontQuery['driversInfo'] => {
  const { driverAmount, drivers } = driversInfo || {};

  return {
    driverAmount,
    drivers: mapDrivers(drivers),
  };
};

export const mapUser = (insurerOwner: TBaseQuery['insurer'] | TBaseQuery['owner']): TFrontQueryUser => {
  const { firstName, lastName, formattedFiasLevel, middleName, birthDate, passport, registrationAddress } =
    insurerOwner || {};

  const { issueDate, number, series } = passport || {};

  const { address: formattedAddress, flat: flatNumber } = getFlatAndAddressFromFullAddress(registrationAddress);

  return {
    firstName,
    lastName,
    middleName,
    birthDate,
    fullName: getPersonFullName(insurerOwner),
    passport: {
      issueDate,
      number,
      series: series || undefined,
    },

    address: {
      data: {
        flatNumber,
      },
      formattedAddress,
      formattedFiasLevel: formattedFiasLevel ? String(formattedFiasLevel) : '',
    },
  };
};

export const mapBaseQueryToFrontQuery = (query: Partial<TBaseQuery>): TFrontQuery => {
  const {
    driversInfo,
    modelId,
    year,
    bodyNumber,
    policyStartDate,
    enginePower,
    carNumber,
    chassisNumber,
    brandId,
    carDocument,
    vin,
    insurer,
    owner,
    modification,
    userId,
    vehicleCategory,
  } = query || {};

  return {
    driversInfo: driversInfo && mapDriversInfo(driversInfo),
    modelId,
    year,
    bodyNumber,
    policyStartDate,
    enginePower,
    vehicleCategory: vehicleCategory ? capitalizeFirstLetter(vehicleCategory) : 'B',
    carNumber,
    chassisNumber,
    modification,
    brandId,
    carDocument: carDocument && mapCarDocument(carDocument),
    vin,
    userId,
    insurer: insurer && {
      ...mapUser(insurer),
      phone: insurer?.phone,
      email: insurer?.email,
    },
    owner: owner && mapUser(owner),
  };
};
