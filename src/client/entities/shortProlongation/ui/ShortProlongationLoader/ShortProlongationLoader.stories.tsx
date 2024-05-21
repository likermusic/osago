import type { Meta, StoryObj } from '@storybook/react';

import { ShortProlongationLoader } from './ShortProlongationLoader';

export default {
  title: 'Entity/ShortProlongation/ShortProlongationLoader',
  component: ShortProlongationLoader,
} as Meta;

type Story = StoryObj<typeof ShortProlongationLoader>;

export const Loader: Story = {
  args: {},
};
