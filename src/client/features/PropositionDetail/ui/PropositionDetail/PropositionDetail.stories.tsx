import { Button } from '@sravni/react-design-system';
import type { Meta, StoryObj } from '@storybook/react';

import { COMPANY, DESCRIPTION } from 'mocks/PropositionDetail.mock';

import { PropositionDetail } from './PropositionDetail';

const meta: Meta<typeof PropositionDetail> = {
  title: 'Features/PropositionDetail',
  component: PropositionDetail,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PropositionDetail>;

export const PropositionDetailMain: Story = {
  args: {
    children: (
      <Button
        size={52}
        variant="primary"
      >
        Далее
      </Button>
    ),
    company: COMPANY,
    description: DESCRIPTION,
  },
};
