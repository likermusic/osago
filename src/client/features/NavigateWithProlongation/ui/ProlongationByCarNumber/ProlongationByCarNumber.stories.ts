import type { Meta, StoryObj } from '@storybook/react';
import identity from 'lodash/identity';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { PROLONGATION_MOCK } from 'entities/prolongation/lib/__tests__/prolongationMock';

import { ProlongationByCarNumber } from './ProlongationByCarNumber';

const generateMock = (type: 'lastSearch' | 'sravniProlongation', isAuthorized: boolean) => ({
  prolongation: {
    prolongationPolicyByCarNumber: {
      ...PROLONGATION_MOCK,
      type,
    },
  },
  user: {
    isLoggedIn: isAuthorized,
  },
  args: {
    onClose: identity,
    onNeedAuth: identity,
    carNumber: 'c912tt22',
  },
});

const meta: Meta<typeof ProlongationByCarNumber> = {
  title: 'features/NavigateWithProlongation/ProlongationByCarNumber',
  component: ProlongationByCarNumber,
  argTypes: {},
};

type Story = StoryObj<typeof ProlongationByCarNumber>;

export const ProlongationAuthorizedUsage: Story = {
  args: {},
  decorators: [StoreDecorator(generateMock('sravniProlongation', true))],
};

export const LastSearchAuthorizedUsage: Story = {
  args: {},
  decorators: [StoreDecorator(generateMock('lastSearch', true))],
};

export const ProlongationUnauthorizedUsage: Story = {
  decorators: [StoreDecorator(generateMock('sravniProlongation', false))],
};

export const LastSearchUnauthorizedUsage: Story = {
  args: {},
  decorators: [StoreDecorator(generateMock('lastSearch', false))],
};

export default meta;
