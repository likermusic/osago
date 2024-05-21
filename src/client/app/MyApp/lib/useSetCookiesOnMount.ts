import type { ToolkitStore } from '@reduxjs/toolkit/src/configureStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { collectOrderAnalytics, setAnalyticsBase } from 'entities/appConfig';

import type { GlobalState } from '../model';

const getCookie = Cookies.get;

/*
 * При первом заходе инициализируем куки чтобы потом каждый раз их не запрашивать
 */
export const useSetCookiesOnMount = (reduxStore: ToolkitStore<GlobalState>) => {
  const { dispatch, getState } = reduxStore || {};
  const { appConfig, whiteLabel } = getState() || {};

  const originalUrl = appConfig?.config?.originalUrl;
  const isWl = !!whiteLabel.wl?.affId;

  useEffect(() => {
    (async () => {
      const base = await collectOrderAnalytics(getCookie, originalUrl, isWl);

      if (base) {
        dispatch(setAnalyticsBase(base));
      }
    })();
  }, [dispatch, isWl, originalUrl]);
};
