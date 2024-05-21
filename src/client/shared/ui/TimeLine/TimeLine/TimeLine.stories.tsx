import { Car, RubleSign } from '@sravni/react-icons';
import type { Meta, StoryObj } from '@storybook/react';

import filledFileIcon from 'shared/ui/icons/filledFileIcon.svg';
import networkBrowserIcon from 'shared/ui/icons/networkBrowserIcon.svg';

import { TimeLine } from './TimeLine';

const meta: Meta<typeof TimeLine> = {
  title: 'Shared/TimeLine',
  component: TimeLine,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimeLine>;

const arr = [
  {
    IconComponent: filledFileIcon,
    description: 'Оформляем договор',
    durationInSeconds: 8,
    bottomText: 'Печатаем бланк',
  },
  {
    IconComponent: Car,
    description: 'Регистрируем полис в РСА',
    durationInSeconds: 2,
    bottomText: 'Идет процесс отправки',
  },
  {
    IconComponent: networkBrowserIcon,
    description: 'Создаем ссылку на оплату',
    durationInSeconds: 4,
    bottomText: 'Генерируем защищенную ссылку',
  },
  {
    IconComponent: RubleSign,
    description: 'Все готово к оплате',
    durationInSeconds: 2,
    bottomText: 'Можно оплачивать',
  },
];

export const TimeLineMainCase: Story = {
  args: {
    content: arr,
    isInfinity: false,
  },
};
