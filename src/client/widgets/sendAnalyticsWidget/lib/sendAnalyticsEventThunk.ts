import { localStorageKeys } from 'shared/config/localStorageKeys';
import { customSessionStorage } from 'shared/lib/customStorage';
import type { TEventNames } from 'shared/types/TEventNames';

import { isUserLoggedInSelector } from 'entities/user';

import { collectOrderQuery } from 'features/CollectQuery';

import { sendAnalyticsEvent } from './sendAnalyticsEvent';

// customSessionStorage используется для сохранения предыдущего шага при переходе со старого проекта
// TODO: выпилить после преезда на новый проект https://sravni-corp.atlassian.net/browse/OS-7438
let prevEventName = customSessionStorage.get(localStorageKeys.previousStepName) as TEventNames | null;

export const sendAnalyticsEventThunk =
  (eventName: TEventNames): ThunkResult<void> =>
  async (dispatch, getState) => {
    if (eventName) {
      const isLoggedIn = isUserLoggedInSelector(getState());
      const query = await dispatch(collectOrderQuery());

      sendAnalyticsEvent({
        eventName,
        authorType: isLoggedIn ? 'auth' : 'noAuth',
        previousStepName: prevEventName,
        query,
      });

      prevEventName = eventName;
    }
  };
