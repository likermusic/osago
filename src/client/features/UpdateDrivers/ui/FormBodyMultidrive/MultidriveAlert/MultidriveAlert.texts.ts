import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_CREATIVE_CASE } from 'shared/config/vehicleTypeText';
import { capitalizeFirstLetter } from 'shared/lib/formatters';

export const MultidriveAlertTexts = {
  title: 'Полис без ограничений – это не выгодно',
  subtitle: (vehicleType: VehicleType) =>
    `${capitalizeFirstLetter(
      VEHICLE_TEXT_MAP_CREATIVE_CASE[vehicleType],
    )} сможет управлять любой водитель, но полис будет стоить дороже в 3 раза. Не будут применены накопленные скидки за безаварийность (КБМ)`,
};
