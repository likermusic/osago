import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { SortPropositions } from './SortPropositions';

const meta: Meta<typeof SortPropositions> = {
  title: 'Features/SortPropositions',
  component: SortPropositions,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SortPropositions>;

export const PropositionSorting: Story = {
  args: {},
  decorators: [StoreDecorator({})],
};
