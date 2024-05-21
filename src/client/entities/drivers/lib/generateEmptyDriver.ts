import { nanoid } from 'nanoid';

import type { DriversCommonFields } from '../types';

export function generateEmptyDriver(isFullFilled = false): Form.Multi<DriversCommonFields>['multipleFormsData'] {
  return {
    [nanoid()]: {
      data: null,
      isFullFilled,
    },
  };
}
