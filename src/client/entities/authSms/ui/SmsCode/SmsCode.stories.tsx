import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { SmsCode } from './SmsCode';

const meta: Meta<typeof SmsCode> = {
  title: 'Entity/SmsCode',
  component: SmsCode,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SmsCode>;

export const SignIn: Story = {
  args: {},
  decorators: [StoreDecorator({})],
};
