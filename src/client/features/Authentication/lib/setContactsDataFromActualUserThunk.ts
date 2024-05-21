import { updateContactsIfNewValueTruthy } from 'entities/contacts';
import { accountSelector } from 'entities/user';

export const setContactsDataFromActualUserThunk = (): ThunkResult<void> => (dispatch, getState) => {
  const { phone_number, email } = accountSelector(getState()) || {};

  dispatch(
    updateContactsIfNewValueTruthy({
      data: {
        mobilePhone: phone_number,
        email,
      },
    }),
  );
};
