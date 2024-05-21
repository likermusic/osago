import { Icon, Typography } from '@sravni/react-design-system';
import { Cross } from '@sravni/react-icons';
import { useSafeLayoutEffect } from '@sravni/react-utils';
import cn from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useAppDispatch } from 'shared/lib/redux';

import { clearNotification } from '../../model/hintNotifications.slice';

import styles from './Notification.module.scss';

const STATIC_NOTIFICATION_OFFSET = 30; // some magic number from browser;

export interface NotificationProps {
  yPosition?: number;
  isStatic?: boolean;
  caption?: string;
  message: string;
  type: 'info';
}

export const Notification: FC<NotificationProps> = ({ className, ...props }) => {
  const { yPosition = 0, isStatic, caption, type, message } = props;
  const dispatch = useAppDispatch();
  const notificationRef = useRef<HTMLInputElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  const onDismissNotification = useCallback(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  useSafeLayoutEffect(() => {
    if (type === 'info' && yPosition) {
      const notificationPosition =
        (Number(notificationRef.current?.getBoundingClientRect?.()?.top) ?? 0) +
        (Number(document?.scrollingElement?.scrollTop) ?? 0);

      setTopOffset(notificationPosition - yPosition + STATIC_NOTIFICATION_OFFSET);
    }
  }, [type]);

  if (typeof window === 'undefined') {
    // Чтоб не падал при серверном рендеринге
    return null;
  }

  return createPortal(
    <div
      ref={notificationRef}
      className={cn(styles.hint, className, {
        [styles.isDesktop]: !isStatic,
        [styles.isGlobal]: !yPosition,
      })}
      style={yPosition && !isStatic ? { top: `${yPosition - topOffset}px` } : undefined}
      onClick={onDismissNotification}
    >
      <Icon
        className={styles.hintCloseButton}
        icon={<Cross />}
        strong
      />

      {!!caption && (
        <Typography.Text
          strong
          className="h-pb-8"
        >
          {caption}
        </Typography.Text>
      )}

      <Typography.Text strong>{message}</Typography.Text>
    </div>,
    document.body,
  );
};
