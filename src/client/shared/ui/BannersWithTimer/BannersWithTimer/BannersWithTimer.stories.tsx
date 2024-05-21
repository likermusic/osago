import type { Meta, StoryObj } from '@storybook/react';

import CalculatorImg from 'shared/assets/icons/calculator.svg';
import CatImg from 'shared/assets/icons/cat.svg';
import CoinsImg from 'shared/assets/icons/coins.svg';
import FilesImg from 'shared/assets/icons/files.svg';

import { BannersWithTimer } from './BannersWithTimer';

const CONTENT = [
  {
    image: <CalculatorImg />,
    description: ['Рассчитываем цену в вашей прошлой страховой. Подбираем самые выгодные предложения'],
    durationInSeconds: 6,
  },
  {
    image: <CatImg />,
    description: ['Продлите полис на Сравни, без наценок и переплат'],
    durationInSeconds: 6,
  },
  {
    image: <CoinsImg />,
    description: ['Каждый 10-й электронный полис в стране оформляется через Сравни'],
    durationInSeconds: 6,
  },
  {
    image: <FilesImg />,
    description: ['После оплаты вы получите чек и электронный полис на почту. Электронный ОСАГО равнозначен бумажному'],
    durationInSeconds: 6,
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BannersWithTimer> = {
  title: 'Shared/BannersWithTimer',
  component: BannersWithTimer,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BannersWithTimer>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    content: CONTENT,
    onExpired: () => {},
    timerSec: 20,
    timerTitle: 'Заголовок таймера',
  },
};
