import React from 'react';
import { Provider } from 'react-redux';

import type { AppStore } from '../../model'; // eslint-disable-line boundaries/element-types

interface IProps extends React.ComponentProps<any> {
  store: AppStore;
}

export function StoreProvider({ store, children }: IProps) {
  return <Provider store={store}>{children}</Provider>;
}
