import type { Meta, StoryObj } from '@storybook/react';

import { CostDetails } from './CostDetails';

const meta: Meta<typeof CostDetails> = {
  title: 'shared/CostDetails',
  component: CostDetails,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CostDetails>;

export const CostDetailsMain: Story = {
  args: {
    formula: {
      resultText: 'Стоимость',
      multipliers: ['КТ', 'КВ'],
    },
  },
};
