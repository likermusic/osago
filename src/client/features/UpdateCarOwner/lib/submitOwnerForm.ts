import { B_VARIANT_VALUE, TEST_ANKETA_CONTACT_NUMBER } from 'shared/config/anketaContactAb';
import { getIsNeededABVariant } from 'shared/lib/getIsNeededABVariant';
import { sendEventSubmitOwnerForm } from 'shared/lib/sendGAEvents';

import { analyticsABTestStatisticsSelector } from 'entities/appConfig';
import { selectCarInfo } from 'entities/carInfo';
import { selectIsInsurerFulfilled } from 'entities/insurer';
import type { OwnerCommonFields } from 'entities/owner';
import { selectOwnerPolicyHolderDataOrDefaults } from 'entities/owner';
import type { IPolicyInfoRequest } from 'entities/PolicyInfo';

import { setInsurerByOwnerDataThunk } from './setInsurerByOwnerDataThunk';

export const submitOwnerForm =
  (
    actualData: OwnerCommonFields,
    getPolicyInfo: (arg: IPolicyInfoRequest) => unknown,
    isDialog: boolean,
  ): ThunkResult<void> =>
  async (dispatch, getState) => {
    const currentPolicyHolder = selectOwnerPolicyHolderDataOrDefaults(getState());

    await dispatch(setInsurerByOwnerDataThunk({ newOwnerData: actualData, currentPolicyHolder }));

    const isInsurerFulfilled = selectIsInsurerFulfilled(getState());
    if (!isDialog) {
      const isBVariant = getIsNeededABVariant(
        TEST_ANKETA_CONTACT_NUMBER,
        B_VARIANT_VALUE,
        analyticsABTestStatisticsSelector(getState()),
      );
      if (isBVariant) {
        sendEventSubmitOwnerForm(isInsurerFulfilled ? 'Выдача' : 'Страхователь');
      } else {
        sendEventSubmitOwnerForm(isInsurerFulfilled ? 'Ваши контакты' : 'Страхователь');
      }
    }

    const carInfo = selectCarInfo(getState());
    await getPolicyInfo({
      carNumber: carInfo.data?.carNumber,
      vin: carInfo.data?.carVinNumber,
      bodyNumber: carInfo.data?.bodyNumber,
      ownerBirthDate: actualData.birthday,
      ownerFio: actualData.fullName,
    });
  };
