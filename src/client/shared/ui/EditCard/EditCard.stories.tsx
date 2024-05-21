import type { Meta, StoryObj } from '@storybook/react';
import { identity } from 'lodash/fp';

import { EditCard } from './EditCard';

const meta: Meta<typeof EditCard> = {
  title: 'Shared/EditCard',
  component: EditCard,
};

export default meta;
type Story = StoryObj<typeof EditCard>;

export const Card: Story = {
  args: {
    onClick: identity,
    isLoading: false,
    children: 'content',
  },
};
