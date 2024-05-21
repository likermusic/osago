import { useEffect, useMemo, useRef } from 'react';

import { APP_ROUTES } from 'constants/routes';

import type { GlobalState } from 'app/MyApp';

import { initUserContactsDefaults } from './initUserContactsDefaults';
import { PersistedStore } from './PersistedStore';

export const usePersistedStore = (initialReduxState: GlobalState) => {
  const persistedStore = useMemo(
    () =>
      new PersistedStore(initialReduxState, [
        APP_ROUTES.anketa,
        APP_ROUTES.order,
        APP_ROUTES.propositions,
        APP_ROUTES.summary,
      ]),
    [initialReduxState],
  );
  const save = useRef(persistedStore.save.bind(persistedStore));

  useEffect(() => {
    initUserContactsDefaults(persistedStore);
  }, [persistedStore]);

  useEffect(() => {
    const doSave = save.current;
    window.addEventListener('beforeunload', doSave);

    return () => window.removeEventListener('beforeunload', doSave);
  }, []);

  return persistedStore.getStore();
};
