import { FormStepId } from 'shared/config/formStepId';

import { stepsDescriptions, stepsDescriptionsAb } from '../../config';
import type { IOrderedStep, IStepperFormsSet } from '../../types';

function counter() {
  let count = 0;
  return () => {
    count += 1;

    return count;
  };
}

export function generateSteps(forms: IStepperFormsSet, isBVariant: boolean) {
  const steps: IOrderedStep[] = [];

  const iterator = counter();

  const stepsDescriptionsForGenerator = isBVariant ? stepsDescriptionsAb : stepsDescriptions;

  stepsDescriptionsForGenerator
    .filter(({ formId }) => forms[formId]?.isActive)
    .forEach(({ formId, multiStepsDescription }) => {
      if (multiStepsDescription && forms) {
        Object.keys(forms[formId]?.multipleFormsData ?? {}).forEach((multipartFormItemId, index) => {
          if (formId === FormStepId.Drivers && forms[formId]?.isMultiDrive && index > 0) {
            // не отображаем водителей, кроме первого, если установлен мультидрайв
            return;
          }
          steps.push({
            multipartFormId: multipartFormItemId,
            stepIndex: iterator(),
            formId,
            type: 'multipart',
          });
        });

        return;
      }

      steps.push({ formId, stepIndex: iterator(), type: 'single' });
    });

  return steps;
}
