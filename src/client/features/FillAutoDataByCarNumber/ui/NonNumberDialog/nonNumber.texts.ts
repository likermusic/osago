import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT } from 'shared/config/vehicleTypeText';

export const nonNumberTexts = {
  title: 'Оформление без номера',
  subtitle: 'Если у вас ещё нет номера или вы планируете его сменить, продолжайте оформление без него',
  prompt: (vehicleType: VehicleType) =>
    `Для постановки ${VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT[vehicleType]} на учёт в ГИБДД подойдёт распечатанный полис даже без вписанного номера. \r\n Номер можно будет вписать в полис после постановки ${VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT[vehicleType]} на учёт или при следующем продлении ОСАГО `,
  backBtn: 'Ввести номер',
  continueBtn: 'Продолжить без номера',
};
