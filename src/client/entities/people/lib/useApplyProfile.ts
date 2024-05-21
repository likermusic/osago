import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import { checkAndReturnStringIfObjectHasLabelOrValue } from 'shared/lib/checkAndReturnStringIfObjectHasValue/checkAndReturnStringIfObjectHasLabelOrValue';
import { useAppSelector } from 'shared/lib/redux';

import { selectPeople } from '../model/people.selectors';
import type { TConvertPersonToFormFieldsResult, TSendEventType } from '../types';

import { convertPersonToFormFields } from './convertPersonToFormFields';

export const useApplyProfile = (
  sendEvent: TSendEventType,
  onApplyProfile?: (person: TConvertPersonToFormFieldsResult) => void,
) => {
  const people = useAppSelector(selectPeople);

  const { reset, getValues, trigger } = useFormContext();

  const sendFieldValueEvent = (fieldName: string, fieldValue: unknown) => {
    const previousValue = checkAndReturnStringIfObjectHasLabelOrValue(getValues(fieldName));

    const newValue = checkAndReturnStringIfObjectHasLabelOrValue(fieldValue);

    if (previousValue !== newValue && (newValue || previousValue)) {
      sendEvent(String(newValue), String(previousValue), fieldName);
    }
  };

  return (fio: string) => {
    if (fio === getValues('fullName.value')) return;

    const profile = people.find((person) => person.fullName === fio);

    if (profile) {
      const convertedValues = convertPersonToFormFields(profile);

      reset(
        { ...convertedValues, policyHolder: getValues('policyHolder') },
        { keepDirty: false, keepTouched: false, keepIsValid: false },
      );
      trigger();
      Object.entries(convertedValues).forEach(([key, value]) => {
        sendFieldValueEvent(key, value);
      });
      onApplyProfile?.(convertedValues);
    }
  };
};
