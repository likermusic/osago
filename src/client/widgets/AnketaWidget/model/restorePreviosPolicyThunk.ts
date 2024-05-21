import { selectOwnerDataOrDefaults, selectPrevHolder, updatePolicyHolder } from 'entities/owner';

import { setInsurerByOwnerDataThunk } from 'features/UpdateCarOwner';

export const restorePreviousPolicyThunk = (): ThunkResult<void> => async (dispatch, getState) => {
  if (!getState().insurer.isFullFilled) {
    await dispatch(updatePolicyHolder(getState().owner.prevPolicyHolder));
    const newOwnerData = selectOwnerDataOrDefaults(getState());
    // поскольку выше обновили данные то prevPolicyHolder после обновления данных = currentPolicyHolder до обновления
    const prevPolicyHolder = selectPrevHolder(getState());

    dispatch(setInsurerByOwnerDataThunk({ currentPolicyHolder: prevPolicyHolder, newOwnerData }));
  }
};
