import { Button, Space } from '@sravni/react-design-system';
import type { Meta, StoryObj } from '@storybook/react';

import type { ICompanyPropositionInfo } from 'shared/types';

import { PropositionCardMain } from './PropositionCardMain';

const ADVANTAGES = [
  {
    title: 'За вчера куплено',
    description: '187 полисов',
  },
  {
    title: 'На рынке',
    description: '77 лет',
  },
  {
    title: 'от Сравни',
    description: '7 подарков',
  },
];

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

const meta: Meta<typeof PropositionCardMain> = {
  title: 'Entity/PropositionCard/PropositionCardMain',
  component: PropositionCardMain,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PropositionCardMain>;

export const Main: Story = {
  args: {
    company: COMPANY,
    advantages: ADVANTAGES,
  },
};

export const MainWithActions: Story = {
  args: {
    company: COMPANY,
    advantages: ADVANTAGES,
    headerActionChildren: HEADER_ACTION_CHILDREN,
    children: ACTION_CHILDREN,
  },
};

export const MainWithAlertsAndActions: Story = {
  args: {
    company: COMPANY,
    advantages: ADVANTAGES,
    headerActionChildren: HEADER_ACTION_CHILDREN,
    children: ACTION_CHILDREN,
  },
};
export const MainWithHeaderBadge: Story = {
  args: {
    company: COMPANY,
    advantages: ADVANTAGES,
    headerActionChildren: HEADER_ACTION_CHILDREN,
    children: ACTION_CHILDREN,
    headerBadge: {
      color: 'gray',
      variant: 'primary',
      text: `c 22.12.2023`,
    } as const,
  },
};
