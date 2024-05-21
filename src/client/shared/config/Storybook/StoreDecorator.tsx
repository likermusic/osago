import type { StoryFn } from '@storybook/react';
import type { DeepPartial } from 'redux';

// пока хз как это разрулить потому что все эти компоненты в себе используют reducers
// а он в себе используют фичи и сущности поэтому не получается вынести стор в shared/config
// TODO: https://sravni-corp.atlassian.net/browse/OS-6490
// eslint-disable-next-line boundaries/element-types,import/no-internal-modules
import { StoreProvider, initializeStore } from 'app/MyApp';
// eslint-disable-next-line boundaries/element-types
import type { GlobalState } from 'app/MyApp';

export const StoreDecorator = (state: DeepPartial<GlobalState>) => (StoryComponent: StoryFn) => {
  // ts - падает потому что getOrCreateStore ждет GlobalState а мы передаем туда DeepPartial<GlobalState>
  // не стоит делать в getOrCreateStore DeepPartial потому что тогда будем забывать добавлять редьюсеры
  // @ts-ignore
  const store = initializeStore(state);

  return (
    <StoreProvider store={store}>
      <StoryComponent />
    </StoreProvider>
  );
};
