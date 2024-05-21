import type { FormStepId } from 'shared/config/formStepId';
import type { UserCommonFields } from 'shared/types';

import type { CarInfoCommonFields } from 'entities/carInfo';
import type { ContactsCommonFields } from 'entities/contacts';
import type { DriversCommonFields } from 'entities/drivers';
import type { OwnerCommonFields } from 'entities/owner';

export type StepDescription = {
  formId: FormStepId;
  multiStepsDescription?: boolean;
};

interface ICommonOrderStep {
  stepIndex: number;
  type: 'single' | 'multipart';
}

export interface ISingleOrderStep extends ICommonOrderStep {
  type: 'single';
  formId: string;
}

export interface IMultipartOrderStep extends ICommonOrderStep {
  type: 'multipart';
  formId: string;
  multipartFormId: string;
}

export type IOrderedStep = ISingleOrderStep | IMultipartOrderStep;

export type IStepperFormsSet = Partial<Record<FormStepId, Form.Stepper>>;
export type IStepperState = {
  activeStep: IOrderedStep | undefined;
  lastStep: IOrderedStep;
  stepsWithMultiStepsOrder: IOrderedStep[];
};

export type TAllAnketaData =
  | CarInfoCommonFields
  | DriversCommonFields
  | OwnerCommonFields
  | UserCommonFields
  | ContactsCommonFields;
export type TWidgetBlockProps = TAccordionProps & {
  multipartFormId: string;
  isSummary?: boolean;
  onDataChanged?: () => void;
};
