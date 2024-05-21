import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { TRaffleWinnersProps } from './RaffleWinners';
import { RaffleWinners } from './RaffleWinners';

export default {
  title: 'Raffle/RaffleWinners',
  component: RaffleWinners,
} as Meta;

const Template: Story<TRaffleWinnersProps> = (args) => <RaffleWinners {...args} />;

export const Default = Template.bind({});
Default.args = {
  subtitle: 'Subtitle Text',
  // eslint-disable-next-line no-alert
  onBtnClick: () => alert('Button clicked'),
};
