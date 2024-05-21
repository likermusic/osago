import type { Story, Meta } from '@storybook/react';
import React from 'react';

import type { TRaffleCardBtnsProps } from './RaffleCardBtns';
import { RaffleCardBtns } from './RaffleCardBtns';

export default {
  title: 'Raffle/RaffleCardBtns',
  component: RaffleCardBtns,
} as Meta;

const Template: Story<TRaffleCardBtnsProps> = (args) => <RaffleCardBtns {...args} />;

export const Default = Template.bind({});
Default.args = {
  config: {
    btnLeftText: 'Buy Insurance',
    btnRightText: 'Enter Raffle',
  },
  onRightBtnClick: () => {
    // eslint-disable-next-line no-console
    console.log('Raffle entered successfully!');
  },
};
