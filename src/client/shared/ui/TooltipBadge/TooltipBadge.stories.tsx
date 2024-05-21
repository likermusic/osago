import type { Meta, StoryObj } from '@storybook/react';

import { SravniAwardIcon } from '../../assets/icons/SravniAwardIcon';

import { TooltipBadge } from './TooltipBadge';

const meta: Meta<typeof TooltipBadge> = {
  title: 'shared/TooltipBadge',
  component: TooltipBadge,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TooltipBadge>;

export const WithoutTooltip: Story = {
  args: {
    color: 'green',
    text: 'Победитель ежегодной премии Сравни в номинации «Лучший страховой продукт в категории ОСАГО»',
    iconColor: 'red',
    icon: SravniAwardIcon,
    variant: 'primary',
    isTooltip: false,
  },
};

export const WithTooltip: Story = {
  args: {
    color: 'green',
    text: 'Победитель ежегодной премии Сравни в номинации «Лучший страховой продукт в категории ОСАГО»',
    iconColor: 'blue',
    icon: SravniAwardIcon,
    variant: 'secondary',
    isTooltip: true,
  },
};
