import type { Meta, StoryObj } from '@storybook/react';

import type { ICompanyPropositionInfo } from 'shared/types';

import { PropositionCardFailed } from './PropositionCardFailed';

const COMPANY: ICompanyPropositionInfo = {
  companyName: 'Росгосстрах',
  companyId: 1234,
  logoLink: '//f.sravni.ru/logotypes/ic/40x40/logo_8105.svg',
  averageRating: 2.5,
};
const meta: Meta<typeof PropositionCardFailed> = {
  title: 'Entity/PropositionCard/PropositionCardFailed',
  component: PropositionCardFailed,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PropositionCardFailed>;

export const Failed: Story = {
  args: {
    ...COMPANY,
  },
};
