import type { TFrontQuery } from 'commonTypes/TFrontQuery';

import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';

import { mapCalculationQueryToFormContacts, selectContactsData, setContactsData } from 'entities/contacts';
import { mapCalculationQueryToFormDrivers, setDrivers } from 'entities/drivers';
import { mapCalculationQueryToFormUser, setInsurerData } from 'entities/insurer';
import { mapCalculationQueryToFormOwner, setOwnerData } from 'entities/owner';

// Должен быть false, чтобы пользователь руками прокликал все блоки
const IS_NOT_FULLFILLED = false;

export const updateFormStoreThunkWithoutCar =
  (data: TFrontQuery): ThunkResult<void> =>
  (dispatch, getState) => {
    const owner = mapCalculationQueryToFormOwner(data);
    const insurer = mapCalculationQueryToFormUser(data.insurer || {});
    const contactsData = selectContactsData(getState());

    owner && dispatch(setOwnerData({ data: owner, isFullFilled: IS_NOT_FULLFILLED }));
    insurer &&
      dispatch(
        setInsurerData({
          isActive: !comparePeopleWithFullNameAsObject(insurer, owner),
          values: insurer,
          isFullFilled: IS_NOT_FULLFILLED,
        }),
      );
    contactsData &&
      dispatch(
        setContactsData({
          data: mapCalculationQueryToFormContacts(data, contactsData),
          isFullFilled: IS_NOT_FULLFILLED,
        }),
      );
    data?.driversInfo && dispatch(setDrivers(mapCalculationQueryToFormDrivers(data, IS_NOT_FULLFILLED)));
  };
