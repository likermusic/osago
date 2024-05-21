import { useCallback, useRef } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { formReadyForSendingSelector } from '../../model/AnketaWidget.selectors';

export const useDataChanged = (onDataChanged: () => void) => {
  /**
   * Пишем в ref так как колбэк не обновляется по зависимостям в дочернем компоненте и
   * флаг там всегда будет false.
   * */
  const isFormReady = useRef(false);
  isFormReady.current = useAppSelector(formReadyForSendingSelector);

  return useCallback(() => {
    if (isFormReady.current) {
      onDataChanged();
    }
  }, [onDataChanged]);
};
