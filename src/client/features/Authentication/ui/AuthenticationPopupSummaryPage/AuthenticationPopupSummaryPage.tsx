import { useEffect, useState } from 'react';

import { useAppDispatch } from 'shared/lib/redux';

import { setContactsDataFromActualUserThunk } from '../../lib/setContactsDataFromActualUserThunk';
import { shouldShowAuthPopupOnSummaryThunk } from '../../lib/shouldShowAuthPopupOnSummaryThunk';
import { AuthenticationFormPopup } from '../AuthenticationFormPopup/AuthenticationFormPopup';

import { AuthenticationPopupSummaryPageTexts } from './AuthenticationPopupSummaryPage.texts';

interface AuthenticationPopupSummaryPage {
  wasDataRestoredAndFull: boolean;
}

export const AuthenticationPopupSummaryPage: FC<AuthenticationPopupSummaryPage> = ({ wasDataRestoredAndFull }) => {
  const dispatch = useAppDispatch();

  const [shouldShowAuthPopup, setShouldShowAuthPopup] = useState(false);

  useEffect(() => {
    if (!wasDataRestoredAndFull) return;
    (async () => {
      const shouldShowPopup = await dispatch(shouldShowAuthPopupOnSummaryThunk());

      setShouldShowAuthPopup(shouldShowPopup);
    })();
  }, [dispatch, wasDataRestoredAndFull]);

  if (!shouldShowAuthPopup) {
    return null;
  }

  const onSuccessCallback = () => {
    setShouldShowAuthPopup(false);
    dispatch(setContactsDataFromActualUserThunk());
  };

  return (
    <AuthenticationFormPopup
      isVisible={shouldShowAuthPopup}
      title={AuthenticationPopupSummaryPageTexts.title}
      subtitle={AuthenticationPopupSummaryPageTexts.subtitle}
      onAuthenticated={onSuccessCallback}
    />
  );
};
