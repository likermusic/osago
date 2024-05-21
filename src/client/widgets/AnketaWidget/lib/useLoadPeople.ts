import { useEffect } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { useLazyPostPeople } from 'entities/people';
import { isUserLoggedInSelector, userHasEsiaSelector } from 'entities/user';

export const useLoadPeople = (onPeopleLoaded?: () => void) => {
  const isUserLoggedIn = useAppSelector(isUserLoggedInSelector);
  const isUserHasEsia = useAppSelector(userHasEsiaSelector);
  const [loadPeople] = useLazyPostPeople();

  useEffect(() => {
    if (isUserLoggedIn) {
      (async () => {
        await loadPeople();

        onPeopleLoaded?.();
      })();
    }
    /**
     * если пользователь зарегистрировался, но у него нет ESIA,
     * то нам надо будет еще раз дернуть loadPeople, когда он привяжет ESIA
     * */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn, isUserHasEsia]);
};
