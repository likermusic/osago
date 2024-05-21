import { FormStepId } from 'shared/config/formStepId';
import type { TEventNames } from 'shared/types/TEventNames';

import { AccordionModalForm as AccordionModalFormAuthentication } from 'features/Authentication';
import { AccordionModalForm as AccordionModalFormUpdateCarInfo } from 'features/UpdateCarInfo';
import { AccordionModalForm as AccordionModalFormUpdateCarOwner } from 'features/UpdateCarOwner';
import { AccordionModalForm as AccordionModalFormUpdateDrivers } from 'features/UpdateDrivers';
import { AccordionModalForm as AccordionModalFormUpdateInsurer } from 'features/UpdateInsurer';
import { AccordionModalForm as AccordionModalFormUpdatePolicyStartDate } from 'features/UpdatePolicyStartDate';

type TWidgetBlockProps = TAccordionProps & {
  multipartFormId: string;
  isSummary?: boolean;
  shouldRestoreAdditionalData?: boolean;
  shouldShowDriverKbm?: boolean;
};

export const WIDGET_BLOCKS: Record<FormStepId, FC<TWidgetBlockProps>> = {
  [FormStepId.PolicyInfo]: AccordionModalFormUpdatePolicyStartDate,
  [FormStepId.CarInfo]: AccordionModalFormUpdateCarInfo,
  [FormStepId.Drivers]: AccordionModalFormUpdateDrivers,
  [FormStepId.CarOwner]: AccordionModalFormUpdateCarOwner,
  [FormStepId.PolicyHolder]: AccordionModalFormUpdateInsurer,
  [FormStepId.Contacts]: AccordionModalFormAuthentication,
};

export const WIDGET_BLOCKS_ANALYTIC: Partial<Record<FormStepId, TEventNames>> = {
  [FormStepId.CarInfo]: 'osago_contact_step1',
  [FormStepId.Drivers]: 'osago_contact_step2',
  [FormStepId.CarOwner]: 'osago_contact_step3',
  [FormStepId.PolicyHolder]: 'osago_contact_step_owner',
  [FormStepId.Contacts]: 'osago_contact_step4_phone',
};
