import { requiredCustomSelectScheme, validateConditionaly } from '@sravni/cosago-react-library/lib/validationSchemes';
import { object, string } from 'yup';

import type { Shape } from 'types/yup';

import { FieldErrors } from 'shared/lib/fields';

import { ERRORS_TEXTS } from '../lib/RaffleRegistration.constants';
import type { TRaffleRegistationFields } from '../types';
import { OSAGO_POLICY_NUMBER_MASK } from '../ui/EnterPolicyByYourselfStep/EnterPolicyByYourself.constants';

const policyNumber = string().nullable().required(FieldErrors.requiredError);
const policyNumberIfOsago = string()
  .nullable()
  .transform((value: string | null) => (value ?? '').replace(/_/g, ''))
  .length(OSAGO_POLICY_NUMBER_MASK.length, `${ERRORS_TEXTS.minRequired} ${OSAGO_POLICY_NUMBER_MASK.length}`)
  .required(`${ERRORS_TEXTS.minRequired} ${OSAGO_POLICY_NUMBER_MASK.length}`);

export const enterPolicyByYourselfStepValidation = () =>
  object<Shape<Omit<TRaffleRegistationFields, 'policiesAutocomplete'>>>({
    policyNumber: validateConditionaly<TRaffleRegistationFields>(
      (val) => val?.value === 'Osago',
      policyNumberIfOsago,
      policyNumber,
    )('policyType'),
    policyType: requiredCustomSelectScheme(FieldErrors.requiredError, 'value'),
  }).required();
