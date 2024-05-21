import type { Meta, StoryObj } from '@storybook/react';

import { CompanyLogoWithPrice } from './CompanyLogoWithPrice';

const meta: Meta<typeof CompanyLogoWithPrice> = {
  title: 'Shared/CompanyLogoWithPrice',
  component: CompanyLogoWithPrice,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CompanyLogoWithPrice>;

export const Common: Story = {
  args: {
    companyIconUrl: 'http://f.sravni.ru/logotypes/ic/40x40/logo_8105.svg',
    price: 27200,
    subtitle: 'any text',
  },
};
