import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT } from 'shared/config/vehicleTypeText';

export const ProcessStepTexts = {
  inputNumber: (vehicleTypeUi: VehicleType) =>
    `Введите данные ${VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT[vehicleTypeUi]} и водителей`,
  calculation: 'Сравните цены и выберите лучшую',
  checking: 'Оплатите полис у нас на сайте',
  afterPayment: 'Получите полис на e‑mail сразу после оплаты',
};
