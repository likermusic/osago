import type { Meta, StoryObj } from '@storybook/react';

import { PresentBanner } from './PresentBanner';

const meta: Meta<typeof PresentBanner> = {
  title: 'entity/bonus/PresentBanner',
  component: PresentBanner,
};

export default meta;
type Story = StoryObj<typeof PresentBanner>;

export const Main: Story = {
  args: {
    title: 'title',
    subtitle: 'subtitle',
  },
};
