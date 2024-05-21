import { useCallback, useRef } from 'react';

import { useAppDispatch } from 'shared/lib/redux';

import { clearNotification, setNotification } from '../../model/hintNotifications.slice';
import { getNotificationPosition } from '../getNotificatonPosition/getNotificationPosition';

export const HIDE_CARD_DELAY = 1500;

export const useAutoHideNotification = () => {
  const timer = useRef(0);
  const dispatch = useAppDispatch();

  return useCallback(
    (message: string, newSelectedCardYPosition = 0) => {
      clearTimeout(timer.current);

      if (!message) {
        dispatch(clearNotification());
        return;
      }

      dispatch(
        setNotification({
          position: getNotificationPosition(newSelectedCardYPosition),
          message,
          type: 'info',
        }),
      );

      timer.current = window.setTimeout(() => {
        dispatch(clearNotification());
      }, HIDE_CARD_DELAY);
    },
    [dispatch],
  );
};
