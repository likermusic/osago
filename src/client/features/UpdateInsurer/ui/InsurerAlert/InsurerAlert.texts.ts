import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE } from 'shared/config/vehicleTypeText';

export const InsurerAlertTexts = {
  title: (vehicleType: VehicleType) =>
    `Советуем оставить собственника ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]} страхователем`,
  subtitle:
    'Это поможет снизить цену и получить больше предложений от страховых. Страхователь может вносить изменения в полис и обращаться в страховую компанию по всем вопросам, включая его расторжение',
};
