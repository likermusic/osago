import type {
  TFrontQueryDrivers,
  TFrontQuery,
  TFrontQueryUser,
  TFrontQueryDocumentType,
} from 'commonTypes/TFrontQuery';
import { getSeriesAndNumberFromFullNumber, formatDate } from 'commonUtils/formatters';
import {
  DRIVER_LICENSE_NUMBER_LENGTH,
  DRIVER_LICENSE_SERIES_LENGTH,
  PASSPORT_NUMBER_LENGTH,
  PASSPORT_SERIES_LENGTH,
} from 'constants/documentsLength';

import { formatExistValue } from 'shared/lib';
import type { IClientDataState, IClientDataUser } from 'shared/lib/localStorageMethods/types';

import { getPersonFullName } from '../getPersonFullName/getPersonFullName';

const mapDrivers = (drivers: IClientDataState['drivers']): TFrontQueryDrivers[] =>
  drivers?.map((driver) => {
    const {
      firstName,
      lastName,
      middleName,
      birthDate,
      drivingLicense,
      experienceStartDate,
      oldDrivingLicense,
      oldLastName,
    } = driver || {};

    const { series, number } = getSeriesAndNumberFromFullNumber(
      drivingLicense,
      DRIVER_LICENSE_NUMBER_LENGTH,
      DRIVER_LICENSE_SERIES_LENGTH,
    );

    return {
      firstName,
      lastName,
      middleName,
      birthDate: birthDate && formatDate.toServerFromClient(birthDate),
      license: {
        series,
        number,
        date: experienceStartDate && formatDate.toServerFromClient(experienceStartDate),
      },

      fullName: getPersonFullName(driver),
      previousInfo: {
        lastName: oldLastName,
        middleName,
        firstName,
        fullName: getPersonFullName({ firstName, lastName: oldLastName || lastName, middleName }),
        license: {
          ...getSeriesAndNumberFromFullNumber(
            oldDrivingLicense,
            DRIVER_LICENSE_NUMBER_LENGTH,
            DRIVER_LICENSE_SERIES_LENGTH,
          ),
        },
      },
    };
  });

const mapUserFromClientData = (user: IClientDataUser): TFrontQueryUser => {
  const { firstName, addressFlat, lastName, middleName, birthDate, passportNumber, passportObtainingDate, address } =
    user || {};

  const { series, number } = getSeriesAndNumberFromFullNumber(
    passportNumber,
    PASSPORT_NUMBER_LENGTH,
    PASSPORT_SERIES_LENGTH,
  );

  return {
    fullName: getPersonFullName(user),
    firstName,
    lastName,
    middleName,
    birthDate: birthDate && formatDate.toServerFromClient(birthDate),
    passport: {
      series,
      number,
      issueDate: passportObtainingDate && formatDate.toServerFromClient(passportObtainingDate),
    },
    address: {
      data: {
        flatNumber: addressFlat,
      },
      formattedAddress: address?.value,
      formattedFiasLevel: address?.source?.data?.fias_level ?? '',
    },
  };
};

const mapInsurerOwner = (
  insurerOwner: IClientDataState['insurerOwner'],
): { insurer: TFrontQueryUser; owner: TFrontQueryUser } => {
  const mappedInsurer = mapUserFromClientData(
    insurerOwner?.insurerIsOwner ? insurerOwner?.user : insurerOwner?.insurer,
  );
  const mappedOwner = mapUserFromClientData(insurerOwner?.insurerIsOwner ? insurerOwner?.user : insurerOwner?.owner);

  return {
    insurer: mappedInsurer,
    owner: mappedOwner,
  };
};

const mapDocumentType = (documentType: IClientDataState['auto']['document']): TFrontQueryDocumentType =>
  documentType === 'epts' ? 'ePts' : documentType;

/** @deprecated
 * используем пока не съедем со старого формата локал стораджа это можно после полного переезда со старого проекта в т.ч. с ВЛ!!!
 * вычищаем у пользователей через src/client/shared/lib/localStorageMappers/fixAndMapOldClientData.ts
 * */
export const mapOldLocalStorageToQuery = (oldLocalStorageData: IClientDataState): TFrontQuery => {
  const {
    vin,
    brandId,
    policyStartDate,
    power,
    modelId,
    year,
    auto,
    drivers,
    bodyNumber,
    chassisNumber,
    insurerOwner,
    contacts,
    modification,
  } = oldLocalStorageData || {};

  const { vehicleNumber, document, documentObtainingDate, pts, sts, epts } = auto || {};

  const { series, number } = getSeriesAndNumberFromFullNumber(pts || sts || epts);

  // если в квере всего один водитель и у него нет прав, значит это мультидрайв со старого проекта
  const driversQuantity = drivers?.length;
  const isUnlimited = driversQuantity === 0 || (driversQuantity === 1 && !drivers[0]?.drivingLicense);

  const { insurer, owner } = mapInsurerOwner(insurerOwner);

  return {
    policyStartDate,
    carDocument: {
      date: documentObtainingDate,
      series,
      number,
      documentType: mapDocumentType(document),
    },
    vin,
    brandId,
    enginePower: parseInt(power, 10),
    modelId,
    year: parseInt(year, 10),
    carNumber: vehicleNumber,
    bodyNumber,
    chassisNumber,
    vehicleCategory: 'B',
    modification: modification?.fullName || modification?.shortName,

    driversInfo: {
      driverAmount: isUnlimited ? 'unlimited' : 'limited',
      drivers: formatExistValue(drivers, mapDrivers, []),
    },

    insurer: {
      ...insurer,

      phone: contacts?.phone,
      email: contacts?.email,
    },
    owner,
  };
};
