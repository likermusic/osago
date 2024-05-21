import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';

import { selectCarInfo } from 'entities/carInfo';
import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';
import { updateDriver } from 'entities/drivers';
import { resetInsurer, selectInsurerDataOrDefaults, setInsurerData } from 'entities/insurer';
import type { TPolicyHolder } from 'entities/owner';
import {
  PolicyHolderType,
  resetOwner,
  selectOwnerDataOrDefaults,
  setOwnerData,
  updatePolicyHolder,
} from 'entities/owner';
import type { IPolicyInfoRequest } from 'entities/PolicyInfo';

import { updatePeopleDataByDriverThunk } from './updatePeopleDataByDriverThunk';

const calculatePolicyHolder = (
  isDriverInsurer: boolean,
  previousPolicyHolder: TPolicyHolder,
  driverId: Nullable<string>,
) => {
  if (isDriverInsurer) {
    return PolicyHolderType.Owner;
  }

  if (previousPolicyHolder === driverId) {
    return PolicyHolderType.Other;
  }

  return previousPolicyHolder;
};

export const submitFormWithSwitcher =
  (
    formData: UpdateDriversWithSwitchersForm,
    driverId: Nullable<string>,
    isMultiDrive: boolean,
    getPolicyInfo: (arg: IPolicyInfoRequest) => unknown,
  ): ThunkResult<void> =>
  async (dispatch, getState) => {
    const {
      isDriverOwner,
      isDriverInsurer = false,
      passportNumber,
      passportIssueDate,
      registrationAddress,
      registrationAddressFlat,
      ...commonFormData
    } = formData;

    if (isMultiDrive) {
      dispatch(updateDriver({ driverId, data: commonFormData, isMultiDrive }));
      return;
    }

    const owner = selectOwnerDataOrDefaults(getState());
    const insurer = selectInsurerDataOrDefaults(getState());

    if (isDriverOwner && passportNumber && passportIssueDate && registrationAddress) {
      dispatch(
        setOwnerData({
          data: {
            fullName: commonFormData.fullName,
            birthday: commonFormData.birthday,
            passportNumber,
            passportIssueDate,
            registrationAddress,
            registrationAddressFlat: registrationAddressFlat ?? '',
            policyHolder: calculatePolicyHolder(isDriverInsurer, owner.policyHolder, driverId),
          },
          isFullFilled: true,
        }),
      );

      if (!isDriverInsurer) dispatch(setInsurerData({ isActive: true, values: insurer }));

      // Дергаем ручку для получения рекомендованной даты, только если текущий водитель является собственником
      const carInfo = selectCarInfo(getState());
      await getPolicyInfo({
        carNumber: carInfo.data?.carNumber,
        vin: carInfo.data?.carVinNumber,
        bodyNumber: carInfo.data?.bodyNumber,
        ownerBirthDate: commonFormData.birthday,
        ownerFio: commonFormData.fullName,
      });
    } else if (comparePeopleWithFullNameAsObject(commonFormData, owner)) {
      dispatch(resetOwner());
    }

    if (isDriverInsurer && passportNumber && passportIssueDate && registrationAddress) {
      dispatch(
        setInsurerData({
          isActive: !(isDriverOwner && isDriverInsurer),
          values: {
            fullName: commonFormData.fullName,
            birthday: commonFormData.birthday,
            passportNumber,
            passportIssueDate,
            registrationAddress,
            registrationAddressFlat: registrationAddressFlat ?? '',
          },
        }),
      );

      if (driverId && !isDriverOwner) {
        // обновляем отображение в блоке держателя полиса у собственника
        dispatch(updatePolicyHolder(driverId));
      }
    } else if (comparePeopleWithFullNameAsObject(commonFormData, insurer)) {
      dispatch(resetInsurer());
    }

    dispatch(updatePeopleDataByDriverThunk(formData));

    // обновляем форму драйвера в последнюю очередь чтобы не заставлять getNextActiveStep несколько раз считаться
    // сначала с пустыми значениями owner и insurer, а потом с обновленными уже
    dispatch(
      updateDriver({
        driverId,
        data: commonFormData,
        isMultiDrive,
      }),
    );
  };
