import type { Meta, StoryObj } from '@storybook/react';

import type { IDetailAlert } from 'shared/types/IAlert';

import { PropositionAlertsList } from './PropositionAlertsList';

const ALERTS: IDetailAlert[] = [
  {
    title: 'Полис готов к оплате',
    subtitle: 'Договор успешно создан в базе страховой компании и РСА, после оплаты будет отправлен на ваш e‑mail.',
    color: 'green',
    action: 'DisableUpsale',
  },
  {
    title: 'Включено в полис',
    subtitle:
      'При повреждении автомобиля в результате стихийных бедствий страховая компания компенсирует убытки в пределах 200 000 руб',
    color: 'blue',
    action: '',
  },
];

const meta: Meta<typeof PropositionAlertsList> = {
  title: 'features/PropositionAlertsList',
  component: PropositionAlertsList,

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PropositionAlertsList>;

export const AlertsListMain: Story = {
  args: {
    alerts: ALERTS,
  },
};
