import type { Meta, StoryObj } from '@storybook/react';

import { AbTestsDecorator } from 'shared/config/Storybook/AbTestsDecorator';

import { ShowContentForAbVariant } from './ShowContentForAbVariant';

const meta: Meta<typeof ShowContentForAbVariant> = {
  title: 'entity/analytics/ShowContentForAbVariant',
  component: ShowContentForAbVariant,
  decorators: [
    AbTestsDecorator({
      experiments: {
        TEST_MOCK_VARIANT_ID: '1',
        'd40f200b-6c08-4f2d': '2',
      },
      statistics: '',
      userData: {},
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof ShowContentForAbVariant>;

export const Variant1Visible: Story = {
  args: {
    expectedVariants: {
      '0': <span>Значение для эксперимента 0 - я не отображусь</span>,
      '1': <span>Значение для эксперимента 1</span>,
      '2': <span>Значение для эксперимента 2</span>,
    },
    experimentName: 'TEST_MOCK_VARIANT_ID',
    defaultVariant: '1',
  },
  decorators: [
    AbTestsDecorator({
      experiments: {
        TEST_MOCK_VARIANT_ID: '1',
        'd40f200b-6c08-4f2d': '2',
      },
      statistics: '',
      userData: {},
    }),
  ],
};

export const Variant2Visible: Story = {
  args: {
    expectedVariants: {
      '0': <span>Значение для эксперимента 0 - я не отображусь</span>,
      '1': <span>Значение для эксперимента 1</span>,
      '2': <span>Значение для эксперимента 2</span>,
    },
    experimentName: 'd40f200b-6c08-4f2d',
    defaultVariant: '2',
  },
  decorators: [
    AbTestsDecorator({
      experiments: {
        TEST_MOCK_VARIANT_ID: '1',
        'd40f200b-6c08-4f2d': '2',
      },
      statistics: '',
      userData: {},
    }),
  ],
};

export const VariantDefault: Story = {
  args: {
    expectedVariants: {
      '0': <span>Значение для эксперимента 0 - я не отображусь</span>,
      '1': <span>Значение варианта не пришло - я дефолт</span>,
      '2': <span>Значение для эксперимента 2</span>,
    },
    experimentName: 'TEST_MOCK_VARIANT_ID',
    defaultVariant: '1',
  },
  decorators: [
    AbTestsDecorator({
      experiments: {
        TEST_MOCK_VARIANT_ID: '',
      },
      statistics: '',
      userData: {},
    }),
  ],
};
