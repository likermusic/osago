import { createSelector } from 'reselect';

import { FormStepId } from 'shared/config/formStepId';

import { selectCarInfo } from 'entities/carInfo';
import { selectContacts } from 'entities/contacts';
import { selectDrivers } from 'entities/drivers';
import { selectInsurer } from 'entities/insurer';
import { selectOwner } from 'entities/owner';

// Для страниц "анкета" и "выдача"
export const defaultStepperConfigSelector = createSelector(
  selectCarInfo,
  selectContacts,
  selectDrivers,
  selectOwner,
  selectInsurer,
  (carInfoForm, contactsForm, driversForm, ownerForm, insurerForm) => ({
    [FormStepId.CarInfo]: carInfoForm,
    [FormStepId.Contacts]: contactsForm,
    [FormStepId.Drivers]: driversForm,
    [FormStepId.CarOwner]: ownerForm,
    [FormStepId.PolicyHolder]: insurerForm,
  }),
);

// Для страниц "саммари" и "заказ"
export const stepperConfigWithDateSelector = createSelector(defaultStepperConfigSelector, (defaultConfig) => ({
  ...defaultConfig,
  [FormStepId.PolicyInfo]: { isFullFilled: true, isActive: true },
}));

export const formReadyForSendingSelector = createSelector(
  defaultStepperConfigSelector,
  (steps) =>
    // если хотя бы один блок не готов к отправке - вернуть false;
    !Object.values(steps).some((value) => {
      if ('multipleFormsData' in value) {
        // если это мультиформа - проверяем заполнение для каждой вложенной формы;
        return Object.values(value.multipleFormsData).some((multiFormValue) => !multiFormValue.isFullFilled);
      }

      return !value.isFullFilled;
    }),
);

export const runAfterCheckFormReadyThunk =
  (callback: (isReady: boolean) => void): ThunkResult<void> =>
  (_, getState) => {
    callback(formReadyForSendingSelector(getState()));
  };
