import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';
import type { UserCommonFields } from 'shared/types';

import { selectDrivers } from 'entities/drivers';
import { setInsurerData } from 'entities/insurer';
import type { TPolicyHolder } from 'entities/owner';
import { PolicyHolderType, selectOwnerDataOrDefaults, updatePolicyHolder } from 'entities/owner';
import { updatePeopleData } from 'entities/people';

export const submitInsurerForm =
  (actualData: UserCommonFields): ThunkResult<void> =>
  (dispatch, getState) => {
    const drivers = selectDrivers(getState());
    const owner = selectOwnerDataOrDefaults(getState());
    const isInsurerOwner = comparePeopleWithFullNameAsObject(owner, actualData);
    dispatch(setInsurerData({ isActive: !isInsurerOwner, values: actualData }));

    dispatch(
      updatePeopleData({
        ...actualData,
        fullName: typeof actualData.fullName?.value === 'string' ? actualData.fullName?.value : '',
      }),
    );

    let policyHolderType: TPolicyHolder = PolicyHolderType.Other;
    if (isInsurerOwner) {
      policyHolderType = PolicyHolderType.Owner;
    } else {
      const driverId = Object.entries(drivers.multipleFormsData).find(
        ([_key, value]) => value.data && comparePeopleWithFullNameAsObject(value.data, actualData),
      )?.[0];
      if (driverId) {
        policyHolderType = driverId;
      }
    }
    dispatch(updatePolicyHolder(policyHolderType));
  };
