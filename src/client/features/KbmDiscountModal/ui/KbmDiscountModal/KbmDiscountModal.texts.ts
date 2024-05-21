import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_CREATIVE_CASE } from 'shared/config/vehicleTypeText';
import { capitalizeFirstLetter } from 'shared/lib/formatters';

export const KbmDiscountModalTexts = {
  title: 'Водители',
  multiDriveTitle: 'Полис без ограничений',
  subtitle: 'Для расчета ОСАГО всегда используется самый высокий КБМ (безаварийность) из всех добавленных водителей',
  multiDriveSubtitle: (vehicleType: VehicleType) =>
    `${capitalizeFirstLetter(
      VEHICLE_TEXT_MAP_CREATIVE_CASE[vehicleType],
    )} сможет управлять любой водитель, но полис будет стоить дороже в 3 раза`,
  applyButton: 'Применить',
};
