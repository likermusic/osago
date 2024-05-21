import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { hintNotificationSelector } from '../../model/hintNotifications.selectors';
import { Notification } from '../Notification/Notification';

type NotificationWidgetProps = {
  isDesktopOnly?: boolean;
};
export const HintNotification = (props: NotificationWidgetProps) => {
  const { isDesktopOnly = false } = props;
  const isMobile = useIsMobile();
  const notification = useAppSelector(hintNotificationSelector);
  if (!notification?.message || (isMobile && isDesktopOnly)) {
    return null;
  }

  return (
    <Notification
      type={notification.type}
      caption={notification.title}
      yPosition={notification.position}
      message={notification?.message}
    />
  );
};
