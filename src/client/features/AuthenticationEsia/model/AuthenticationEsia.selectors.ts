import { createSelector } from 'reselect';

import { FormStepId } from 'shared/config/formStepId';
import { checkMemoryHasClientDataByNumber } from 'shared/lib';

import { selectCurrentCarNumber } from 'entities/carInfo';
import { selectContacts } from 'entities/contacts';
import { selectFirstDriver } from 'entities/drivers';
import { selectInsurer } from 'entities/insurer';
import { selectOwner } from 'entities/owner';
import {
  userEsiaIsErrorSelector,
  userHasEsiaSelector,
  isUserLoggedInSelector,
  userEsiaStartStepSelector,
} from 'entities/user';

export const isUserHasDataInLocalStorage = createSelector(selectCurrentCarNumber, (carNumberNumber) => {
  if (!carNumberNumber) {
    return false;
  }

  const { owner, driversInfo, insurer } = checkMemoryHasClientDataByNumber(carNumberNumber) || {};
  return !!driversInfo?.drivers.length || !!owner?.fullName || !!insurer?.fullName;
});

export const showLoginByEsiaSelector = createSelector(
  isUserLoggedInSelector,
  userHasEsiaSelector,
  userEsiaIsErrorSelector,
  isUserHasDataInLocalStorage,
  (isLogged, isHasEsia, isEsiaError, isUserHasPersonData) =>
    (!isLogged || !isHasEsia) && !isEsiaError && !isUserHasPersonData,
);

export const showShowEsiaErrorSelector = (step: string) =>
  createSelector(
    userEsiaIsErrorSelector,
    userEsiaStartStepSelector,
    (isEsiaError, activatedStep) => isEsiaError && activatedStep === step,
  );

export const shouldUpdateEsiaSelector = createSelector(
  selectOwner,
  selectInsurer,
  selectFirstDriver,
  selectContacts,
  // eslint-disable-next-line max-params
  (owner, insurer, driver, contacts): Record<string, boolean> => ({
    [FormStepId.Contacts]: !(contacts.data?.email && contacts.data?.mobilePhone),
    [FormStepId.CarOwner]: !owner.data?.fullName,
    [FormStepId.PolicyHolder]: !insurer.data?.fullName,
    [FormStepId.Drivers]: !driver.data?.fullName,
  }),
);
