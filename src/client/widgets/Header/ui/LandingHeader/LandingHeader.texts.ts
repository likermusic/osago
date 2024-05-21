import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT } from 'shared/config/vehicleTypeText';

export const LandingPageTexts = {
  caption: 'Калькулятор ОСАГО',
  subtitle: (vehicleType: VehicleType) =>
    `Рассчитать стоимость ОСАГО на\u00A0${VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT[vehicleType]} в\u00A017\u00A0страховых на\u00A0калькуляторе, купить ОСАГО на\u00A0лучших условиях и\u00A0оформить полис онлайн в\u00A02024 году`,
  carImgAlt: 'Картинка счастливого человека, купившего ОСАГО',
};
