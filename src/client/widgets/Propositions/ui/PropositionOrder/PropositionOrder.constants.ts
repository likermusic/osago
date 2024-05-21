import { Car, RubleSign } from '@sravni/react-icons';

import filledFileIcon from 'shared/ui/icons/filledFileIcon.svg';
import networkBrowserIcon from 'shared/ui/icons/networkBrowserIcon.svg';

type TGetContent = {
  email?: string;
  isOrderReady?: boolean;
};
export const getContent = ({ email, isOrderReady }: TGetContent) => [
  {
    IconComponent: filledFileIcon,
    description: 'Оформляем договор',
    durationInSeconds: 20,
    bottomText: 'Как только страховая проверит данные, вы сможете оплатить полис напрямую без переплат и комиссий',
  },
  {
    IconComponent: Car,
    description: 'Проверяем данные в РСА',
    durationInSeconds: 20,
    bottomText: 'Как только страховая проверит данные, вы сможете оплатить полис напрямую без переплат и комиссий',
  },
  {
    IconComponent: networkBrowserIcon,
    description: 'Создаем ссылку на оплату',
    durationInSeconds: 20,
    bottomText: 'Как только страховая проверит данные, вы сможете оплатить полис напрямую без переплат и комиссий',
  },
  {
    IconComponent: RubleSign,
    description: isOrderReady ? 'Все готово к оплате' : 'Подготовка к оплате',
    durationInSeconds: 240,
    bottomText: `После оплаты отправим полис на ${email || 'ваш email'}`,
  },
];
