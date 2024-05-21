import type { FormStepId } from 'shared/config/formStepId';

import type { IOrderedStep, IStepperFormsSet } from '../../types';

interface GetNextActiveStepProps {
  steps: IOrderedStep[];
  forms: IStepperFormsSet;
}

export function getNextActiveStep(props: GetNextActiveStepProps) {
  const { steps, forms } = props;

  return steps.find((step) => {
    const { formId, type } = step;
    const formData = forms[formId as FormStepId];

    if (type === 'multipart') {
      return !formData?.multipleFormsData?.[step.multipartFormId]?.isFullFilled;
    }

    return !formData?.isFullFilled;
  });
}
