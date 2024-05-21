import type { Meta, StoryObj } from '@storybook/react';

import { PriceBlockWithTags } from './PriceBlockWithTags';

const meta: Meta<typeof PriceBlockWithTags> = {
  title: 'Entity/PropositionCard/PriceBlockWithTags',
  component: PriceBlockWithTags,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PriceBlockWithTags>;

export const Main: Story = {
  args: {
    price: 1000,
    searchPrice: 1000,
  },
};

export const MainWithTags: Story = {
  args: {
    tags: [{ title: 'title', text: 'text', type: 'Promo', isTooltip: false, color: 'green', variant: 'primary' }],
    price: 1000,
    searchPrice: 1000,
  },
};

export const MainWithTagsAndPriceChanged: Story = {
  args: {
    tags: [{ title: 'title', text: 'text', type: 'Promo', isTooltip: false, color: 'green', variant: 'primary' }],
    price: 1000,
    searchPrice: 1500,
  },
};
