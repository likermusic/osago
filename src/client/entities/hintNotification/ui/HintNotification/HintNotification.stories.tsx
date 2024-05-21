import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { HintNotification as HintNotificationComponent } from './HintNotification';

const meta: Meta<typeof HintNotificationComponent> = {
  title: 'Entity/HintNotification',
  component: HintNotificationComponent,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HintNotificationComponent>;

export const HintNotification: Story = {
  args: { isDesktopOnly: false },
  decorators: [
    StoreDecorator({
      hintNotification: {
        message: 'message',
        title: 'title',
        type: 'info',
        position: 0,
      },
    }),
  ],
};
