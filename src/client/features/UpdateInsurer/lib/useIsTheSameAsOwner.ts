import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';
import { useAppSelector } from 'shared/lib/redux';
import type { UserCommonFields } from 'shared/types';

import { selectOwnerDataOrDefaults } from 'entities/owner';

export const useIsTheSameAsOwner = () => {
  const owner = useAppSelector(selectOwnerDataOrDefaults);

  const { watch } = useFormContext<UserCommonFields>();
  const insurer = watch();

  return comparePeopleWithFullNameAsObject(insurer, owner);
};
