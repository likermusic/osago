import { FieldErrors } from 'shared/lib/fields';

import { enterPolicyByYourselfStepValidation } from '../../model/RaffleRegistration.validation';
import { OSAGO_POLICY_NUMBER_MASK } from '../../ui/EnterPolicyByYourselfStep/EnterPolicyByYourself.constants';
import { ERRORS_TEXTS } from '../RaffleRegistration.constants';

describe('enterPolicyByYourselfStepValidation', () => {
  it('AND policyType is Osago AND policyNumber is provided and it is more then 14 chars, MUST not throw error', () => {
    const values = {
      policyType: { value: 'Osago' },
      policyNumber: '12345678901111',
    };

    const result = enterPolicyByYourselfStepValidation().validateSync(values);

    expect(result).toEqual(values);
  });

  describe('AND provided policyType is not "Osago"', () => {
    const values = {
      policyType: { value: 'Non-Osago' },
      policyNumber: '1234567890',
    };

    it('AND policyNumber is provided, MUST not throw error', () => {
      const result = enterPolicyByYourselfStepValidation().validateSync(values);

      expect(result).toEqual(values);
    });

    it('AND policyNumber is not provided, MUST  throw error', () => {
      expect(() => enterPolicyByYourselfStepValidation().validateSync({ ...values, policyNumber: '' })).toThrow(
        FieldErrors.requiredError,
      );
    });
  });

  it('AND policyNumber is not provided for Osago MUST throw error', () => {
    const values = {
      policyType: { value: 'Osago' },
      policyNumber: null,
    };

    expect(() => enterPolicyByYourselfStepValidation().validateSync(values)).toThrow(
      `${ERRORS_TEXTS.minRequired} ${OSAGO_POLICY_NUMBER_MASK.length}`,
    );
  });

  it('AND policyNumber does not match OSAGO_POLICY_NUMBER_MASK.length for Osago MUST throw error', () => {
    const values = {
      policyType: { value: 'Osago' },
      policyNumber: '12345___',
    };

    expect(() => enterPolicyByYourselfStepValidation().validateSync(values)).toThrow(
      `${ERRORS_TEXTS.minRequired} ${OSAGO_POLICY_NUMBER_MASK.length}`,
    );
  });

  it('AND policyType is not provided MUST throw error', () => {
    const values = {
      policyType: null,
      policyNumber: '1234567890',
    };

    expect(() => enterPolicyByYourselfStepValidation().validateSync(values)).toThrow(FieldErrors.requiredError);
  });
});
