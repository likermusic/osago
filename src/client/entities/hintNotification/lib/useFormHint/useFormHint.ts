import { useCallback } from 'react';

import { useAppDispatch } from 'shared/lib/redux';

import { clearNotification, setNotification } from '../../model/hintNotifications.slice';
import { getNotificationPosition } from '../getNotificatonPosition/getNotificationPosition';

const isHtmlElement = (element: unknown): element is HTMLElement => element instanceof HTMLElement;

export function useFormHint(notification: string, title?: string) {
  const dispatch = useAppDispatch();

  const showHint = useCallback(
    (e: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
      const element = e.target;
      dispatch(
        setNotification({
          message: notification,
          position: getNotificationPosition(isHtmlElement(element) ? element.getBoundingClientRect()?.top : 0),
          title,
          type: 'info',
        }),
      );
    },
    [dispatch, notification, title],
  );

  const hideHint = () => dispatch(clearNotification());

  return {
    showHint,
    hideHint,
  };
}
