import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { useDeeplink } from 'shared/lib/useDeeplink';

import { selectUserId } from 'entities/authSms';
import { purchasedPolicyInfoSelector } from 'entities/purchasedPolicy';
import { useAssignUserId } from 'entities/user';

import { AuthenticationFormPopup } from '../AuthenticationFormPopup/AuthenticationFormPopup';

import { AuthenticationPopupSuccessPageTexts } from './AuthenticationPopupSuccessPage.texts';

export const AuthenticationPopupSuccessPage: FC = () => {
  const policyInfo = useAppSelector(purchasedPolicyInfoSelector);
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();

  const [assignUserId] = useAssignUserId();

  const [shouldShowAuthPopup, setShouldShowAuthPopup] = useState(false);

  useEffect(() => {
    if (policyInfo && !policyInfo.userId) {
      setShouldShowAuthPopup(true);
    }
  }, [dispatch, policyInfo, policyInfo?.userId]);

  const { orderHash } = useDeeplink().params;

  if (!shouldShowAuthPopup) {
    return null;
  }

  const onSuccessCallback = () => {
    setShouldShowAuthPopup(false);

    assignUserId({
      orderHash,
      userId: Number(userId),
    });
  };

  return (
    <AuthenticationFormPopup
      isVisible={shouldShowAuthPopup}
      title={AuthenticationPopupSuccessPageTexts.title}
      subtitle={AuthenticationPopupSuccessPageTexts.subtitle}
      onAuthenticated={onSuccessCallback}
    />
  );
};
