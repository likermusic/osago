import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE } from 'shared/config/vehicleTypeText';

export const useAccordionHeaderParamsTexts = {
  getHeaderDefaultTitle: (vehicleType: VehicleType) =>
    concatWithPrefix('Собственник', VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType], ' '),
};
