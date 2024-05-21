import type { Meta, StoryObj } from '@storybook/react';

import { IPromoTypes } from 'shared/types/BonusesDescription';

import { SmartTagList } from './SmartTagList';

const meta: Meta<typeof SmartTagList> = {
  title: 'features/SmartTag/SmartTagList',
  component: SmartTagList,
};

export default meta;
type Story = StoryObj<typeof SmartTagList>;

export const Main: Story = {
  args: {
    bonuses: [
      {
        detail: {
          infoList: [{ title: 'title', description: ['description'] }],
          shortDescription: 'shortDescription',
        },
        logoBigLink: 'logoUrl',
        name: IPromoTypes.rgsGiftBase,
        title: 'title',
        subtitle: 'subtitle',
      },
    ],
    tags: [
      {
        color: 'blue',
        code: IPromoTypes.rgsGiftBase,
        title: 'Промо с тултипом',
        text: 'text',
        type: 'PromoWithDetails',
        variant: 'primary',
        isTooltip: true,
      },
      {
        color: 'red',
        title: 'Промо без тултипа',
        text: undefined,
        type: 'Promo',
        variant: 'primary',
        isTooltip: false,
      },
    ],
  },
};
