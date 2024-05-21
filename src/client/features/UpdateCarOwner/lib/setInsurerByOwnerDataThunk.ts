import { removeKeyFromObject } from 'shared/lib/removeKeyFromObject';

import { selectDriverData } from 'entities/drivers';
import { insurerSlice, mapInsurerData } from 'entities/insurer';
import type { OwnerCommonFields } from 'entities/owner';
import { PolicyHolderType } from 'entities/owner';
import { selectPersonByFullNameAndBirthday } from 'entities/people';

type TInsurerByOwnerData = {
  /* страхователь до применения нового собственника */
  currentPolicyHolder: string;
  /* новые данные собственника */
  newOwnerData: OwnerCommonFields;
};

export const setInsurerByOwnerDataThunk =
  ({ currentPolicyHolder, newOwnerData }: TInsurerByOwnerData): ThunkResult<void> =>
  async (dispatch, getState) => {
    const { policyHolder } = newOwnerData;

    if (policyHolder === PolicyHolderType.Owner) {
      dispatch(
        insurerSlice.actions.setInsurerData({
          isActive: false,
          values: removeKeyFromObject(newOwnerData, 'policyHolder'),
        }),
      );
    } else if (policyHolder === PolicyHolderType.Other && currentPolicyHolder !== PolicyHolderType.Other) {
      dispatch(insurerSlice.actions.resetInsurer());
    } else if (policyHolder && currentPolicyHolder !== policyHolder) {
      const driver = selectDriverData(policyHolder)(getState());

      if (driver) {
        const personByDriver = selectPersonByFullNameAndBirthday(driver.fullName, driver.birthday)(getState());

        dispatch(
          mapInsurerData({
            ...personByDriver,
            ...driver,
          }),
        );
      }
    }
  };
