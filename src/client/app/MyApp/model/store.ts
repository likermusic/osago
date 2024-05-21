import type { ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { ActionFromReducersMapObject, CombinedState, Reducer, StateFromReducersMapObject } from 'redux';

import { baseRTKApi } from 'shared/api/baseApi';

import { reducers } from './combineReducer';

export type AppStore = ReturnType<typeof initializeStore>;
export type AppDispatch = AppStore['dispatch'];
export type GlobalState = ReturnType<
  Reducer<CombinedState<StateFromReducersMapObject<typeof reducers>>, ActionFromReducersMapObject<typeof reducers>>
>;
export type ThunkResult<R> = ThunkAction<R, GlobalState, undefined, ActionFromReducersMapObject<typeof reducers>>;

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

export const initializeStore = (initialState?: GlobalState) =>
  configureStore({
    devTools: true,
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseRTKApi.middleware),
    ...(initialState && { preloadedState: initialState }),
  });

export const getOrCreateStore = (initialState?: GlobalState): AppStore => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return initializeStore(initialState);
  }

  // TODO: OS-6732 выпилить any
  const anyWindow = window as any;

  if (!anyWindow[__NEXT_REDUX_STORE__]) {
    anyWindow[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return anyWindow[__NEXT_REDUX_STORE__];
};
