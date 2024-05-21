import { UI } from '@sravni/cosago-react-library/lib/components';
import { TextInput } from '@sravni/react-design-system';
import { useEffect } from 'react';

import type { FieldFactoryProps } from 'types/fieldFactory';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventRaffleLanding } from 'shared/lib/sendGAEvents';

import { rafflePoliciesSelector } from 'widgets/RaffleRegistration';

import { ChoosePolicyStepTexts } from './ChoosePolicyStep.texts';

export const PoliciesAutocomplete = ({ type, label, isLoading, isDisabled, ...props }: FieldFactoryProps) => {
  const rafflePolicies = useAppSelector(rafflePoliciesSelector);

  useEffect(() => {
    rafflePolicies.some((police) => !police.disabled) &&
      sendEventRaffleLanding({ actionType: 'Подтянулся', place: 'Выбор полиса' });
  }, [rafflePolicies]);

  return rafflePolicies.length ? (
    <UI.ControlledCustomSelect
      {...props}
      options={rafflePolicies}
      name={type}
      label={label}
      loading={isLoading}
      disabled={isDisabled}
      required
    />
  ) : (
    <TextInput
      label={ChoosePolicyStepTexts.noPolicies}
      disabled
    />
  );
};
