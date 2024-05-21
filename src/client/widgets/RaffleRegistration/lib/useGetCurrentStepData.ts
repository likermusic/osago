import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { registratedIdSelector, registratedPolicyNumbersSelector } from '../model/RaffleRegistration.selectors';
import type { TInteractiveStepProps, TStep, TTextStepProps } from '../types';
import { getStepsData } from '../ui/RaffleRegistrationModal/RaffleRegistrationModal.config';

type TGetCurrentStepData = {
  FieldConstructor: TInteractiveStepProps['FieldConstructor'];
  setStep: TInteractiveStepProps['setStep'];
  rulesLink: TInteractiveStepProps['rulesLink'];
  announceDateText: string;
  onCloseWithReset: TTextStepProps['onClose'];
  step: TStep;
};

export const useGetCurrentStepData = ({
  FieldConstructor,
  setStep,
  rulesLink,
  announceDateText,
  onCloseWithReset,
  step,
}: TGetCurrentStepData) => {
  const registratedPolicyNumber = useAppSelector(registratedIdSelector);
  const policyNumbers = useAppSelector(registratedPolicyNumbersSelector);

  const stepsData = useMemo(
    () =>
      getStepsData({
        interactiveStepsProps: { FieldConstructor, setStep, rulesLink },
        policyNumbers,
        announceDateText,
        registratedPolicyNumber,
        onClose: onCloseWithReset,
      }),
    [FieldConstructor, announceDateText, onCloseWithReset, policyNumbers, registratedPolicyNumber, rulesLink, setStep],
  );

  return stepsData[step];
};
