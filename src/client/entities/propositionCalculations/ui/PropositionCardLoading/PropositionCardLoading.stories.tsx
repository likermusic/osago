import type { Meta, StoryObj } from '@storybook/react';

import type { IPropositionCardLoading } from '../../types';

import { PropositionCardLoading } from './PropositionCardLoading';

const COMPANY: IPropositionCardLoading = {
  companyName: 'Росгосстрах',
  logoLink: '//f.sravni.ru/logotypes/ic/40x40/logo_8105.svg',
};
const meta: Meta<typeof PropositionCardLoading> = {
  title: 'Entity/PropositionCard/PropositionCardLoading',
  component: PropositionCardLoading,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PropositionCardLoading>;

export const PropositionCardLoadingMain: Story = {
  args: {
    ...COMPANY,
  },
};

export const PropositionCardLoadingWithoutCompany: Story = {
  args: {},
};
