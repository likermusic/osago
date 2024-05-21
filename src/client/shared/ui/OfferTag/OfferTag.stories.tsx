import type { Meta, StoryObj } from '@storybook/react';

import { OfferTag } from './OfferTag';

const meta: Meta<typeof OfferTag> = {
  title: 'shared/OfferTag',
  component: OfferTag,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfferTag>;

export const WithoutTooltip: Story = {
  args: {
    color: 'green',
    text: 'Победитель ежегодной премии Сравни в номинации «Лучший страховой продукт в категории ОСАГО»',
    variant: 'primary',
    isTooltip: false,
  },
};

export const WithTooltip: Story = {
  args: {
    color: 'green',
    text: 'Победитель ежегодной премии Сравни в номинации «Лучший страховой продукт в категории ОСАГО»',
    variant: 'secondary',
    isTooltip: true,
  },
};
