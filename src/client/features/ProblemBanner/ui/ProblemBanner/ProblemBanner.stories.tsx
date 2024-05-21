import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { ProblemBanner } from './ProblemBanner';

export default {
  title: 'Features/ProblemBanner',
  component: ProblemBanner,
} as Meta;

const Template: Story = (args) => <ProblemBanner {...args} />;

export const Default = Template.bind({});
Default.args = {};
