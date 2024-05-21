import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { TRaffleRulesProps } from './RaffleRules';
import { RaffleRules } from './RaffleRules';

export default {
  title: 'Raffle/RaffleRules',
  component: RaffleRules,
} as Meta;

const Template: Story<TRaffleRulesProps> = (args) => <RaffleRules {...args} />;

export const Default = Template.bind({});
Default.args = {
  texts: [
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'text' },
    { text: 'Click here for more information', url: 'https://example.com', type: 'link' },
  ],
};
