import { NotificationManager } from '@sravni/react-design-system';
import { useBoolean } from '@sravni/react-utils';

import { BASE_NOTIFICATION_TIMEOUT } from 'constants/notification';

import { useAppSelector } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { isUserLoggedInSelector } from 'entities/user';

import { AuthenticationFormPopup } from 'features/Authentication';
import { ProblemBanner } from 'features/ProblemBanner';

import { sendNotificationBannerTexts } from './SendNotificationBunner.texts';

export const SendNotificationBanner: FC = () => {
  const [isVisiblePopup, setIsVisiblePopup] = useBoolean(false);

  const sendAnalyticsEvent = useGetSendAnalytics();

  const isLoggedIn = useAppSelector(isUserLoggedInSelector);

  const handleClickShowNotification = () => {
    NotificationManager.show(
      sendNotificationBannerTexts.notificationText,
      '',
      '',
      BASE_NOTIFICATION_TIMEOUT,
      'success',
    );
  };

  const handleClickBannerButton = () => {
    if (!isLoggedIn) {
      setIsVisiblePopup.on();
      return;
    }
    sendAnalyticsEvent('osago_wants_return_sms');
    handleClickShowNotification();
  };

  const handleAuthenticated = () => {
    sendAnalyticsEvent('osago_wants_return_sms');
    setIsVisiblePopup.off();
    handleClickShowNotification();
  };

  return (
    <>
      <ProblemBanner onButtonClick={handleClickBannerButton} />
      <AuthenticationFormPopup
        title={sendNotificationBannerTexts.authenticationPopupTitle}
        subtitle={sendNotificationBannerTexts.authenticationPopupSubtitle}
        isVisible={isVisiblePopup}
        onAuthenticated={handleAuthenticated}
        onClose={setIsVisiblePopup.off}
      />
    </>
  );
};
