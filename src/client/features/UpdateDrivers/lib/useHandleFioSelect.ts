import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import type { DriversCommonFields } from 'entities/drivers';
import type { TConvertPersonToFormFieldsResult, TSendEventType } from 'entities/people';
import { useApplyProfile } from 'entities/people';

export const useHandleFioSelect = <T extends DriversCommonFields>(
  NAMES: { [TKey in keyof T]: TKey },
  onEvent: TSendEventType,
  onApplyProfile?: (person: TConvertPersonToFormFieldsResult) => void,
) => {
  const { setValue } = useFormContext<DriversCommonFields>();

  const applyProfile = useApplyProfile(onEvent, onApplyProfile);

  return (_action: string, payload: unknown) => {
    const { type, newName } = (payload as Record<string, string>) || {};

    if (type === NAMES.fullName) {
      applyProfile(newName);
      return;
    }

    setValue(type as keyof DriversCommonFields, { value: newName, label: newName });
  };
};
