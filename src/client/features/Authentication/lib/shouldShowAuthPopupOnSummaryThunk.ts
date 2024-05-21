import { isPrimitiveValuesStrictTheSame } from 'shared/lib/isPrimitiveValuesStrictTheSame';

import { accountPhoneSelector, isUserLoggedInSelector, restoredAccountSelector, userIdSelector } from 'entities/user';

export const shouldShowAuthPopupOnSummaryThunk = (): ThunkResult<boolean> => (_, getState) => {
  const isUserLoggedIn = isUserLoggedInSelector(getState());
  const userIdFromStore = userIdSelector(getState());
  const phoneFromStore = accountPhoneSelector(getState());

  const restoredAccount = restoredAccountSelector(getState());

  const { sub: userIdFromQuery, phone_number: phoneFromQuery } = restoredAccount || {};

  let shouldShowPopup = false;

  if (isUserLoggedIn) {
    if (!restoredAccount) {
      shouldShowPopup = false;
    } else if (userIdFromQuery) {
      shouldShowPopup = !isPrimitiveValuesStrictTheSame(userIdFromStore, userIdFromQuery);
    } else {
      shouldShowPopup = !isPrimitiveValuesStrictTheSame(phoneFromStore, phoneFromQuery);
    }
  } else {
    shouldShowPopup = !userIdFromQuery;
  }

  return shouldShowPopup;
};
