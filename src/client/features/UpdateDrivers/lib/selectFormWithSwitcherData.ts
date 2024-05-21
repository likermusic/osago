import { createSelector } from 'reselect';

import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';
import type { UserCommonFields } from 'shared/types';

import { selectDriverData } from 'entities/drivers';
import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';
import { selectInsurerDataOrDefaults } from 'entities/insurer';
import type { OwnerCommonFields } from 'entities/owner';
import { selectOwnerDataOrDefaults } from 'entities/owner';
import { selectPersonByFullNameAndBirthday } from 'entities/people';

const getAdditionalData = (
  isDriverOwner: boolean,
  isDriverInsurer: boolean,
  ownerData: OwnerCommonFields,
  insurerData: UserCommonFields,
) => {
  if (isDriverOwner) {
    return ownerData;
  }

  if (isDriverInsurer) {
    return insurerData;
  }

  return undefined;
};

export const selectFormWithSwitcherData = createSelector(
  [
    (state, driverId: Nullable<string>) => selectDriverData(driverId)(state),
    selectOwnerDataOrDefaults,
    selectInsurerDataOrDefaults,
    (state, driverId: Nullable<string>) => {
      const driver = selectDriverData(driverId)(state);
      if (!driver) {
        return null;
      }
      return selectPersonByFullNameAndBirthday(driver.fullName, driver.birthday)(state);
    },
  ],
  (driverData, ownerData, insurerData, profileServicePerson): UpdateDriversWithSwitchersForm => {
    const isDriverOwner =
      comparePeopleWithFullNameAsObject(driverData, ownerData) && !!driverData.fullName?.value?.toString().length;
    const isDriverInsurer =
      comparePeopleWithFullNameAsObject(driverData, insurerData) && !!driverData.fullName?.value?.toString().length;
    const additionalData = getAdditionalData(isDriverOwner, isDriverInsurer, ownerData, insurerData);

    const { registrationAddress, registrationAddressFlat, passportNumber, passportIssueDate } =
      profileServicePerson || {};

    return {
      ...driverData,
      isDriverOwner,
      isDriverInsurer,
      passportNumber: additionalData?.passportNumber ?? passportNumber,
      passportIssueDate: additionalData?.passportIssueDate ?? passportIssueDate,
      registrationAddress: additionalData?.registrationAddress ?? registrationAddress,
      registrationAddressFlat: additionalData?.registrationAddressFlat ?? registrationAddressFlat,
    };
  },
);
