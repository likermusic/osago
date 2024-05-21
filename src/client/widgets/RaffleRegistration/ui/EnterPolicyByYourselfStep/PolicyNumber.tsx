import { UI } from '@sravni/cosago-react-library/lib/components';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import type { FieldFactoryProps } from 'types/fieldFactory';

import type { TRaffleRegistationFields } from '../../types';

import { OSAGO_POLICY_NUMBER_MASK } from './EnterPolicyByYourself.constants';

export const PolicyNumber = ({ type, ...props }: FieldFactoryProps) => {
  const { watch } = useFormContext<TRaffleRegistationFields>();
  const policyType = watch('policyType');

  return policyType?.value === 'Osago' ? (
    <UI.ControlledMaskInput
      {...props}
      name={type}
      mask={OSAGO_POLICY_NUMBER_MASK}
      type="text"
    />
  ) : (
    <UI.ControlledTextInput
      {...props}
      name={type}
      type="text"
    />
  );
};
