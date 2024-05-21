import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { TRafflePrizesProps } from './RafflePrizes';
import { RafflePrizes } from './RafflePrizes';

export default {
  title: 'Raffle/RafflePrizes',
  component: RafflePrizes,
} as Meta;

const Template: Story<TRafflePrizesProps> = (args) => <RafflePrizes {...args} />;

export const Default = Template.bind({});
Default.args = {
  config: {
    title: 'Raffle Title',
    prizes: [
      {
        title: 'First Prize',
        subtitle: { type: 'badge', value: 'Badge Text' },
        color: 'red',
        img: { url: 'image-url', width: 100, height: 100 },
      },
      {
        title: 'Second Prize',
        subtitle: { type: 'text', value: 'Subtitle Text' },
        color: 'blue',
        img: { url: 'image-url', width: 100, height: 100 },
      },
    ],
  },
};
