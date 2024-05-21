import type { Meta, StoryObj } from '@storybook/react';

import { TimingProgressBar } from './TimingProgressBar';

const meta: Meta<typeof TimingProgressBar> = {
  title: 'shared/TimingProgressBar',
  component: TimingProgressBar,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimingProgressBar>;

export const Main: Story = {
  args: {
    text: 'Ответило компаний: 10',
  },
};
