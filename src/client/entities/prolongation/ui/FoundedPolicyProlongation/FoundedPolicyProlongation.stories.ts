import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { PROLONGATION_MOCK } from '../../lib/__tests__/prolongationMock';

import { FoundedPolicyProlongation } from './FoundedPolicyProlongation';

const generateMock = (type: 'lastSearch' | 'sravniProlongation') => ({
  prolongation: {
    prolongationPolicyByCarNumber: {
      ...PROLONGATION_MOCK,
      type,
    },
  },
});

const meta: Meta<typeof FoundedPolicyProlongation> = {
  title: 'entity/prolongation/FoundedPolicyProlongation',
  component: FoundedPolicyProlongation,
  argTypes: {},
  decorators: [StoreDecorator(generateMock('sravniProlongation'))],
};

type Story = StoryObj<typeof FoundedPolicyProlongation>;

export const AuthorizedUsage: Story = {
  args: {
    isAuthorized: true,
  },
};

export const AuthorizedLastSearchUsage: Story = {
  args: {
    isAuthorized: true,
  },
  decorators: [StoreDecorator(generateMock('lastSearch'))],
};

export const UnAuthorizedUsage: Story = {
  args: {
    isAuthorized: false,
  },
};

export const UnAuthorizedLastSearchUsage: Story = {
  args: {
    isAuthorized: false,
  },
  decorators: [StoreDecorator(generateMock('lastSearch'))],
};

export default meta;
