import type { IStepperFormsSet, IStepperState } from '../../types';

import { generateSteps } from './generateSteps';
import { getNextActiveStep } from './getNextActiveStep';

export function recalculateSteps(forms: IStepperFormsSet, isBVariant: boolean): IStepperState {
  const newSteps = generateSteps(forms, isBVariant);

  return {
    activeStep: getNextActiveStep({ steps: newSteps, forms }),
    lastStep: newSteps[newSteps.length - 1],
    stepsWithMultiStepsOrder: newSteps,
  };
}
