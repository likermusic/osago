import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type React from 'react';

import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';
import { useAppSelector } from 'shared/lib/redux';

import type { DriversCommonFields } from 'entities/drivers';
import { selectDrivers } from 'entities/drivers';
import { UpdateDriversTexts } from 'entities/drivers/config/updateDriversTexts';

type TOnSubmit = (e?: React.BaseSyntheticEvent) => void;

export const useSubmitDrivers = (driverId: Nullable<string> | undefined, onSubmit: TOnSubmit) => {
  const drivers = useAppSelector(selectDrivers);
  const { setError, watch } = useFormContext<DriversCommonFields>();
  const driverFio = watch('fullName');
  const driverBirthday = watch('birthday');
  const driverLicenseNumber = watch('licenceNumber');
  return (e?: React.FormEvent) => {
    e?.preventDefault();
    const storeDriversExceptCurrent = Object.entries(drivers.multipleFormsData)
      .filter(([key]) => key !== driverId)
      .map((driverKeyValue) => driverKeyValue[1]);
    const sameDriverInStoreByFioAndDate =
      driverFio && driverBirthday
        ? storeDriversExceptCurrent.find(
            (driver) =>
              !!driver.data &&
              comparePeopleWithFullNameAsObject(driver.data, { fullName: driverFio, birthday: driverBirthday }),
          )
        : undefined;
    const sameDriverByLicense = driverLicenseNumber
      ? storeDriversExceptCurrent.find((driver) => driver.data?.licenceNumber === driverLicenseNumber)
      : undefined;
    if (sameDriverInStoreByFioAndDate) {
      setError('birthday', { message: UpdateDriversTexts.validationErrors.fioAndBirthdayTheSame });
    }
    if (sameDriverByLicense) {
      setError('licenceNumber', { message: UpdateDriversTexts.validationErrors.licenseTheSame(driverFio?.label) });
    }
    if (!sameDriverInStoreByFioAndDate && !sameDriverByLicense) {
      onSubmit(e);
    }
  };
};
