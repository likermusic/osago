import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { AuthenticationFormPopup } from './AuthenticationFormPopup';

const meta: Meta<typeof AuthenticationFormPopup> = {
  title: 'features/Authentication/AuthenticationLandingFormPopup',
  component: AuthenticationFormPopup,
  argTypes: {
    isVisible: {
      control: 'boolean',
    },
  },
  decorators: [
    StoreDecorator({
      authSms: {},
    }),
  ],
};

type Story = StoryObj<typeof AuthenticationFormPopup>;

export const BaseUsage: Story = {};

export default meta;
