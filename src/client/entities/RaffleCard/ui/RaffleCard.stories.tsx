import type { Story, Meta } from '@storybook/react';
import React from 'react';

import type { TRaffleCardProps } from './RaffleCard';
import { RaffleCard } from './RaffleCard';

export default {
  title: 'Raffle/RaffleCard',
  component: RaffleCard,
} as Meta;

const Template: Story<TRaffleCardProps> = (args) => <RaffleCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  config: {
    title: 'Mysterious Raffle Adventure',
    subtitle: 'Unlock the Mystery Prize',
    mainImg: '',
    backgroundMobileUrl: '',
    backgroundDesktopUrl: '',
  },
  imgClassName: 'custom-image-class',
};
