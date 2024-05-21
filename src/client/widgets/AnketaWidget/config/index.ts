import { FormStepId } from 'shared/config/formStepId';

import type { StepDescription } from '../types';

export const stepsDescriptions: StepDescription[] = [
  { formId: FormStepId.PolicyInfo },
  { formId: FormStepId.CarInfo },
  {
    formId: FormStepId.Drivers,
    multiStepsDescription: true,
  },
  { formId: FormStepId.CarOwner },
  { formId: FormStepId.PolicyHolder },
  { formId: FormStepId.Contacts },
];

export const stepsDescriptionsAb: StepDescription[] = [
  { formId: FormStepId.PolicyInfo },
  { formId: FormStepId.CarInfo },
  { formId: FormStepId.Contacts },
  {
    formId: FormStepId.Drivers,
    multiStepsDescription: true,
  },
  { formId: FormStepId.CarOwner },
  { formId: FormStepId.PolicyHolder },
];
