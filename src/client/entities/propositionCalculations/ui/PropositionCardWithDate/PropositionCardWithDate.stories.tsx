import { Button, Space } from '@sravni/react-design-system';
import type { Meta, StoryObj } from '@storybook/react';

import type { ICompanyPropositionInfo } from 'shared/types';

import { PropositionCardWithDate } from './PropositionCardWithDate';

const COMPANY: ICompanyPropositionInfo = {
  companyName: 'Росгосстрах',
  companyId: 1234,
  logoLink: '//f.sravni.ru/logotypes/ic/40x40/logo_8105.svg',
  averageRating: 2.5,
};

const HEADER_ACTION_CHILDREN = (
  <Space size={12}>
    <Button color="gray">О</Button>
  </Space>
);

const ACTION_CHILDREN = (
  <Space size={12}>
    <Button color="gray">Оплатить</Button>

    <Button color="blue">Проект вашего полиса</Button>
  </Space>
);

const meta: Meta<typeof PropositionCardWithDate> = {
  title: 'Entity/PropositionCard/PropositionCardWithDate',
  component: PropositionCardWithDate,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PropositionCardWithDate>;

export const Main: Story = {
  args: {
    company: COMPANY,
  },
};

export const MainWithActions: Story = {
  args: {
    company: COMPANY,

    headerActionChildren: HEADER_ACTION_CHILDREN,
    children: ACTION_CHILDREN,
  },
};

export const MainWithAlertsAndActions: Story = {
  args: {
    company: COMPANY,
    headerActionChildren: HEADER_ACTION_CHILDREN,
    children: ACTION_CHILDREN,
  },
};
export const MainWithHeaderBadge: Story = {
  args: {
    company: COMPANY,
    headerActionChildren: HEADER_ACTION_CHILDREN,
    children: ACTION_CHILDREN,
    headerBadge: {
      color: 'gray',
      variant: 'primary',
      text: `c 22.12.2023`,
    } as const,
  },
};
