import { Calculations, Check, PrizeCup } from '@sravni/react-icons';
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { RouterPages } from 'shared/config/router';

import type { TRaffleHowToProps } from './RaffleHowTo';
import { RaffleHowTo } from './RaffleHowTo';

export default {
  title: 'Raffle/RaffleHowTo',
  component: RaffleHowTo,
} as Meta;

const steps = [
  {
    IconComponent: Calculations,
    title: ' step 1: Registration',
    subtitle: 'Register for the raffle by filling out the form',
    linkAtStartOfTitle: { url: '/registration' as RouterPages, text: 'Click here to register' },
  },
  {
    IconComponent: Check,
    title: 'Step 2: Selection',
    subtitle: 'A winner will be selected randomly from the registered participants',
  },
  {
    IconComponent: PrizeCup,
    title: 'Step 3: Claiming Prize',
    subtitle: 'The winner can claim their prize by following the instructions provided',
  },
];

const config = {
  steps,
  scrollToId: 'prizeSection',
};

const Template: Story<TRaffleHowToProps> = (args) => <RaffleHowTo {...args} />;

export const Default = Template.bind({});
Default.args = {
  config,
};
