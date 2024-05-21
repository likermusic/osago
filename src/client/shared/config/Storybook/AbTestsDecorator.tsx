import type { IAbTestingInfo } from '@sravni/ab-testing-sdk/lib/browser';
import { AbTestingProvider } from '@sravni/react-utils';
import type { StoryFn } from '@storybook/react';

export const AbTestsDecorator = (state: IAbTestingInfo) => (StoryComponent: StoryFn) =>
  (
    <AbTestingProvider value={state}>
      <StoryComponent />
    </AbTestingProvider>
  );
