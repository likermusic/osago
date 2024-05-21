import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE } from 'shared/config/vehicleTypeText';

export const CarInfoLoadedAlertTexts = {
  title: 'Данные подгружены автоматически',
  subtitle: (vehicleType: VehicleType) =>
    `Проверьте все параметры вашего ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]} – это может влиять на стоимость полиса`,
};
