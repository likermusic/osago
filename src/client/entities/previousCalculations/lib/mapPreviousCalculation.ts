import { isDefined } from '@sravni/react-utils';

import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';

import { getVehicleTypeFromCategory } from 'shared/lib/getVehicleTypeFromCategory';
import { handleHashes } from 'shared/lib/handleHashes';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';
import {
  NO_HASH_IN_LAST_USER_SEARCHES,
  NO_VEHICLE_CATEGORY_IN_LAST_USER_SEARCHES,
} from 'shared/lib/validations/Errors.texts';

import type { previousCalculationsState } from '../types';

export const mapCalculations = (calculations: PreviousCalculation.GetCalculations): previousCalculationsState => ({
  result:
    calculations?.result
      ?.map((calc) => {
        if (!calc.hash) {
          sendSentryClientErrorOnce(true, NO_HASH_IN_LAST_USER_SEARCHES, {
            level: 'log',
            req: JSON.stringify(calc),
          });

          return undefined;
        }

        if (calc.vehicleCategory === undefined) {
          sendSentryClientErrorOnce(true, NO_VEHICLE_CATEGORY_IN_LAST_USER_SEARCHES, {
            level: 'log',
            req: JSON.stringify(calc),
          });
        }

        return {
          auto: `${calc.brandName || ''} ${calc.modelName || ''}`,
          calculationHash: handleHashes.code(calc.hash, 'calculation'),
          minPrice: calc.minPrice ?? null,
          regNumber: calc.regNumber ?? null,
          vehicleType: getVehicleTypeFromCategory(calc.vehicleCategory),
        };
      })
      .filter(isDefined) || [],
});
