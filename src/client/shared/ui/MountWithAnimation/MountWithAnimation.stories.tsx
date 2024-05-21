import type { Meta, StoryObj } from '@storybook/react';

import { MountWithAnimation } from './MountWithAnimation';

const meta: Meta<typeof MountWithAnimation> = {
  title: 'shared/MountWithAnimation',
  component: MountWithAnimation,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MountWithAnimation>;

export const Main: Story = {
  args: {
    isVisible: true,
    children: <div style={{ height: '500px', width: '500px', backgroundColor: 'red' }}>lorem ipsum dolor sit amet</div>,
  },
};
