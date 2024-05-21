import type { Meta, StoryObj } from '@storybook/react';

import { BigOfferTag } from './BigOfferTag';

const meta: Meta<typeof BigOfferTag> = {
  title: 'shared/BigOfferTag',
  component: BigOfferTag,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BigOfferTag>;

export const WithoutTooltip: Story = {
  args: {
    text: 'Победитель ежегодной премии Сравни в номинации «Лучший страховой продукт в категории ОСАГО»',
    type: 'Promo',
    isTooltip: false,
  },
};

export const WithTooltip: Story = {
  args: {
    text: 'Победитель ежегодной премии Сравни в номинации «Лучший страховой продукт в категории ОСАГО»',
    type: 'SravniAward',
    isTooltip: true,
  },
};
