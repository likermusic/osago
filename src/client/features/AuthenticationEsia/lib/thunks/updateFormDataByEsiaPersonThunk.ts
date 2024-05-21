import { B_VARIANT_VALUE, TEST_ANKETA_CONTACT_NUMBER } from 'shared/config/anketaContactAb';
import { FormStepId } from 'shared/config/formStepId';
import { getIsNeededABVariant } from 'shared/lib/getIsNeededABVariant';
import { sendEventEsiaFieldsValueChange, sendEventEsiaPersonValueChange } from 'shared/lib/sendGAEvents';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import { analyticsABTestStatisticsSelector } from 'entities/appConfig';
import { selectCarInfoData } from 'entities/carInfo';
import { selectContactsData, setContactsData } from 'entities/contacts';
import { updateDriverByEsia } from 'entities/drivers';
import { setInsurerData } from 'entities/insurer';
import { PolicyHolderType, selectOwnerDataOrDefaults, setOwnerData, updatePolicyHolder } from 'entities/owner';
import { selectEsiaPerson, selectPeople } from 'entities/people';
import { accountSelector, userEsiaStartStepSelector, userHasEsiaSelector } from 'entities/user';

import { isUserHasDataInLocalStorage, shouldUpdateEsiaSelector } from '../../model/AuthenticationEsia.selectors';

import { clearEsiaStepFlugThunk } from './clearEsiaStepFlugThunk';

// TODO: OS-8410: унести в общую фичу восстановления

// Должен быть false, чтобы пользователь руками прокликал все блоки
const IS_NOT_FULLFILLED = false;
// eslint-disable-next-line max-statements
export const updateFormDataByEsiaPersonThunk = (): ThunkResult<void> => async (dispatch, getState) => {
  const esiaUser = selectEsiaPerson(getState());
  const carInfo = selectCarInfoData(getState());
  const isUserHasPersonalData = isUserHasDataInLocalStorage(getState());
  const shouldUpdateState = shouldUpdateEsiaSelector(getState());
  const formBlockId = userEsiaStartStepSelector(getState()) || FormStepId.Drivers;

  if (!esiaUser || isUserHasPersonalData) {
    dispatch(clearEsiaStepFlugThunk());
    // у пользователя нет данных из есиа - просто выходим

    if (userHasEsiaSelector(getState()) && !esiaUser) {
      /**
       * Если аккаунт пользователя вернул флаг, что есиа у пользователя есть,
       * а данных в профиле нет, то логируем ошибку
       * */
      const people = selectPeople(getState());
      const user = accountSelector(getState());
      sendSentryClientErrorOnce('ESIA_ERROR', 'Профиль сервис не вернул данные по есиа', {
        placement: 'updateFormDataByEsiaPersonThunk',
        esiaUser,
        people: JSON.stringify(people),
        user,
      });
    }

    return;
  }

  const isBVariant = getIsNeededABVariant(
    TEST_ANKETA_CONTACT_NUMBER,
    B_VARIANT_VALUE,
    analyticsABTestStatisticsSelector(getState()),
  );

  if (
    (formBlockId === FormStepId.Drivers && shouldUpdateState[FormStepId.Drivers]) ||
    (isBVariant && formBlockId === FormStepId.Contacts && shouldUpdateState[FormStepId.Contacts])
  ) {
    /**
     * Если пользователь на блоке водителя или контактов, обновляем:
     * - Водителя
     * - Собственника
     * - Страхователя
     * */
    dispatch(updateDriverByEsia(esiaUser));
    sendEventEsiaPersonValueChange(esiaUser, 'Заполнение данных о водителе');

    const ownerData = {
      ...esiaUser,
      policyHolder: PolicyHolderType.Owner,
    };

    dispatch(
      setOwnerData({
        data: ownerData,
        carDocumentIssueDate: carInfo.documentIssueDate,
        carDocumentType: carInfo.documentType,
        isFilledByEsiaStatus: true,
        isFullFilled: IS_NOT_FULLFILLED,
      }),
    );
    sendEventEsiaPersonValueChange(ownerData, 'Заполнение данных о собственнике');

    dispatch(
      setInsurerData({
        values: esiaUser,
        isActive: false,
        isFilledByEsiaStatus: true,
        isFullFilled: IS_NOT_FULLFILLED,
      }),
    );
    sendEventEsiaPersonValueChange(esiaUser, 'Заполнение данных о страхователе');
  } else if (formBlockId === FormStepId.CarOwner && shouldUpdateState[FormStepId.CarOwner]) {
    /**
     * Если пользователь на блоке собственника, обновляем только:
     * - Собственника
     * - Страхователя - только если он не заполнен вручную на шаге водителя
     * */
    const owner = selectOwnerDataOrDefaults(getState()) || { policyHolder: PolicyHolderType.Owner };
    const isInsurerShouldBeUpdated = shouldUpdateState[FormStepId.PolicyHolder];

    const ownerData = {
      ...esiaUser,
      policyHolder: isInsurerShouldBeUpdated ? PolicyHolderType.Owner : owner?.policyHolder,
    };
    dispatch(
      setOwnerData({
        data: ownerData,
        carDocumentIssueDate: carInfo.documentIssueDate,
        carDocumentType: carInfo.documentType,
        isFilledByEsiaStatus: true,
        isFullFilled: IS_NOT_FULLFILLED,
      }),
    );
    sendEventEsiaPersonValueChange(ownerData, 'Заполнение данных о собственнике');

    if (isInsurerShouldBeUpdated) {
      dispatch(
        setInsurerData({
          values: esiaUser,
          isActive: false,
          isFilledByEsiaStatus: true,
          isFullFilled: IS_NOT_FULLFILLED,
        }),
      );
      sendEventEsiaPersonValueChange(esiaUser, 'Заполнение данных о страхователе');
    }
  } else if (formBlockId === FormStepId.PolicyHolder) {
    /**
     * Если пользователь на блоке страхователя, обновляем только страхователя
     * В собственнике держатель полиса становится другой человек
     * */
    dispatch(updatePolicyHolder(PolicyHolderType.Other));
    sendEventEsiaFieldsValueChange({ policyHolder: PolicyHolderType.Other }, 'Заполнение данных о собственнике');

    dispatch(
      setInsurerData({
        values: esiaUser,
        isActive: true,
        isFilledByEsiaStatus: true,
        isFullFilled: IS_NOT_FULLFILLED,
      }),
    );
    sendEventEsiaPersonValueChange(esiaUser, 'Заполнение данных о страхователе');
  }

  const contacts = selectContactsData(getState()) || {};
  if (esiaUser.email && (!contacts.email || !contacts.mobilePhone)) {
    dispatch(
      setContactsData({
        data: {
          ...contacts,
          email: contacts.email || esiaUser.email,
        },
        isFilledByEsiaStatus: !esiaUser.email && !contacts.email,
        isFullFilled: IS_NOT_FULLFILLED,
      }),
    );
    // Заполняем только почту, телефон всегда равен телефону из профиля
    sendEventEsiaFieldsValueChange({ 'Email для получения полиса': esiaUser.email }, 'Заполнение контактных данных');
  }
};
