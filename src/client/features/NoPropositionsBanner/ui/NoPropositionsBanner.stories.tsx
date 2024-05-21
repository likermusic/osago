import { Button } from '@sravni/react-design-system';
import type { Meta, StoryObj } from '@storybook/react';

import { NoPropositionsBanner } from './NoPropositionsBanner';

const meta: Meta<typeof NoPropositionsBanner> = {
  title: 'Features/NoPropositionsBanner',
  component: NoPropositionsBanner,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NoPropositionsBanner>;

export const NoPropositionsBannerMain: Story = {
  args: {},
};

export const NoPropositionsBannerMainWithChildren: Story = {
  args: {
    children: <Button>Кнопка</Button>,
  },
};
