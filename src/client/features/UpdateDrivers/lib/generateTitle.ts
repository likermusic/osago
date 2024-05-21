import { capitalizeFullName } from 'shared/lib/formatters';

import type { DriversCommonFields } from 'entities/drivers';

import { AccordionModalFormTexts } from '../ui/AccordionModalForm/AccordionModalForm.texts';

export const generateTitle = (isMultiDrive: boolean, data: Nullable<DriversCommonFields>) =>
  isMultiDrive ? AccordionModalFormTexts.multidrive : capitalizeFullName(data?.fullName?.label ?? '');
