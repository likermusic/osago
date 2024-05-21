import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_CREATIVE_CASE } from 'shared/config/vehicleTypeText';
import { capitalizeFirstLetter } from 'shared/lib/formatters';

export const AccordionModalFormTexts = {
  addAnotherDriverAnketa: 'Добавить водителя',
  multidrive: 'Водители без ограничений',
  multiDriveSubtitle: (vehicleType: VehicleType) =>
    `${capitalizeFirstLetter(VEHICLE_TEXT_MAP_CREATIVE_CASE[vehicleType])} сможет управлять любой водитель`,
};
