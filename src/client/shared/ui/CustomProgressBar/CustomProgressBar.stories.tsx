import type { Meta, StoryObj } from '@storybook/react';
import type { FC } from 'react';

import type { TCustomProgressBar } from './CustomProgressBar';
import { CustomProgressBar } from './CustomProgressBar';

const ElementDecorator: FC<TCustomProgressBar> = (props) => (
  <div style={{ width: '200px' }}>
    <CustomProgressBar {...props} />
  </div>
);

const meta: Meta<typeof CustomProgressBar> = {
  title: 'Shared/CustomProgressBar',
  component: ElementDecorator,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CustomProgressBar>;

export const CustomProgressBarEmpty: Story = {
  args: {
    percent: 0,
  },
};

export const CustomProgressBarHalf: Story = {
  args: {
    percent: 50,
  },
};

export const CustomProgressBarFull: Story = {
  args: {
    percent: 100,
  },
};
