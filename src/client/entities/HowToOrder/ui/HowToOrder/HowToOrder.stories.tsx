import type { Meta, StoryObj } from '@storybook/react';

import { HowToOrder } from './HowToOrder';

const meta: Meta<typeof HowToOrder> = {
  title: 'Entity/HowToOrder',
  component: HowToOrder,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HowToOrder>;

export const Steps: Story = {
  args: {},
};
