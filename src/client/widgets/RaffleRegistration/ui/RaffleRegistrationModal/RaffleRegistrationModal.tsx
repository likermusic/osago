import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { identity } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { isUserLoggedInSelector } from 'entities/user';

import { AuthenticationFormPopup } from 'features/Authentication';

import { useGetCurrentStepData } from 'widgets/RaffleRegistration/lib/useGetCurrentStepData';
import { useGetPoliciesForRaffle } from 'widgets/RaffleRegistration/lib/useGetPoliciesForRaffle';

import { startStepSelector } from '../../model/RaffleRegistration.selectors';
import type { TRaffleRegistationFields, TStep } from '../../types';

import styles from './RaffleRegistrationModal.module.scss';

type TRaffleRegistrationModalAdditionalProps = {
  isVisible: boolean;
  rulesLink: string;
  announceDateText: string;
};

type TRaffleRegistrationModalProps = Widgets.FormComponentProps<
  TRaffleRegistationFields,
  TRaffleRegistrationModalAdditionalProps
>;

const RaffleRegistrationModalComponent: FC<TRaffleRegistrationModalProps> = ({
  FieldConstructor,
  additionalProps,
  onSubmit,
}) => {
  const { isVisible, rulesLink, announceDateText = '' } = additionalProps || {};

  const startStep = useAppSelector(startStepSelector);

  const [step, setStep] = useState<TStep>(startStep);

  const { reset } = useFormContext<TRaffleRegistationFields>();
  const onCloseWithReset = useCallback(() => {
    setStep(startStep);
    reset();
    onSubmit();
  }, [onSubmit, reset, startStep]);

  const { StepComponent, title, subtitle } =
    useGetCurrentStepData({ FieldConstructor, setStep, rulesLink, announceDateText, onCloseWithReset, step }) || {};

  const { isLoading } = useGetPoliciesForRaffle();
  const isAuthed = useAppSelector(isUserLoggedInSelector);

  useEffect(() => {
    // Тк, мы не можем изменить шаг синхронно после авторизации из-за замыкания startStep
    if (isAuthed && isLoading) setStep('Loading');
    else if (!isLoading) setStep(startStep);
  }, [isAuthed, isLoading, startStep]);

  const shouldShowAuthenticateModal = step === 'Auth' && isVisible;

  if (shouldShowAuthenticateModal) {
    return (
      <AuthenticationFormPopup
        isVisible={shouldShowAuthenticateModal}
        onClose={onSubmit}
        onAuthenticated={identity}
        title={title}
        subtitle={subtitle}
      />
    );
  }

  return (
    <UI.Popup
      visible={isVisible}
      title={title}
      subtitle={subtitle}
      className={styles.popup}
      onClose={onCloseWithReset}
      closable
    >
      {StepComponent}
    </UI.Popup>
  );
};

export const RaffleRegistrationModal = Widgets.formProviderHOC<
  TRaffleRegistationFields,
  TRaffleRegistrationModalAdditionalProps
>(RaffleRegistrationModalComponent);
