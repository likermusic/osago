import type { Story, Meta } from '@storybook/react';
import React from 'react';

import type { TRaffleFAQProps } from './RaffleFAQ';
import { RaffleFAQ } from './RaffleFAQ';

export default {
  title: 'Raffle/RaffleFAQ',
  component: RaffleFAQ,
} as Meta;

const items = [
  {
    title: 'How do I enter the raffle?',
    text: "To enter the raffle, simply click on the 'Enter Raffle' button on the main page.",
  },
  {
    title: 'What are the prizes for the raffle?',
    text: 'The prizes for the raffle include a brand new car, a luxury vacation, and cash prizes.',
  },
];

const Template: Story<TRaffleFAQProps> = (args) => <RaffleFAQ {...args} />;

export const Default = Template.bind({});
Default.args = {
  items,
};
