import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { RafflePrevWinner } from './RafflePrevWinner';

export default {
  title: 'Raffle/RafflePrevWinner',
  component: RafflePrevWinner,
} as Meta;

const Template: Story = (args) => <RafflePrevWinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
