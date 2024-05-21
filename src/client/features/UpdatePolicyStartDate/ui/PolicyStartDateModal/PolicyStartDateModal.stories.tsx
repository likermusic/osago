import type { Meta, StoryObj } from '@storybook/react';
import { identity } from 'lodash/fp';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { PolicyStartDateModal } from './PolicyStartDateModal';

const meta: Meta<typeof PolicyStartDateModal> = {
  title: 'Features/PolicyStartDateModal',
  component: PolicyStartDateModal,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PolicyStartDateModal>;

export const Modal: Story = {
  args: {
    isDialogOpen: true,
    onDialogClose: identity,
  },
  decorators: [StoreDecorator({})],
};
