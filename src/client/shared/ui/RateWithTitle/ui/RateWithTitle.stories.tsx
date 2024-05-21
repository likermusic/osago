import type { Meta, StoryObj } from '@storybook/react';

import { RateWithTitle } from './RateWithTitle';

const meta: Meta<typeof RateWithTitle> = {
  title: 'Shared/RateStatus',
  component: RateWithTitle,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RateWithTitle>;

export const FixedValue: Story = {
  args: {
    allowHalf: true,
    count: 3,
    defaultValue: 3.5,
    disabled: true,
    onChange: () => {},
    size: 36,
    value: undefined,
  },
};
