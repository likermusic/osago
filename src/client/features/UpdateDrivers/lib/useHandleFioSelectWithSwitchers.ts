import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';
import { useAppSelector } from 'shared/lib/redux';

import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';
import { selectInsurerDataOrDefaults } from 'entities/insurer';
import { selectOwnerDataOrDefaults } from 'entities/owner';
import type { TConvertPersonToFormFieldsResult, TSendEventType } from 'entities/people';

import { useHandleFioSelect } from './useHandleFioSelect';

export const useHandleFioSelectWithSwitchers = (
  NAMES: { [TKey in keyof UpdateDriversWithSwitchersForm]: TKey },
  sendEvent: TSendEventType,
) => {
  const { setValue } = useFormContext<UpdateDriversWithSwitchersForm>();
  const owner = useAppSelector(selectOwnerDataOrDefaults);
  const insurer = useAppSelector(selectInsurerDataOrDefaults);

  const updateSwitchers = (person: TConvertPersonToFormFieldsResult) => {
    setValue('isDriverInsurer', comparePeopleWithFullNameAsObject(person, insurer));
    setValue('isDriverOwner', comparePeopleWithFullNameAsObject(person, owner));
  };

  return useHandleFioSelect(NAMES, sendEvent, updateSwitchers);
};
