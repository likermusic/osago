import { UI } from '@sravni/cosago-react-library/lib/components';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';

import { capitalizeFullName } from 'shared/lib/formatters';

import { useFilteredProfile } from '../../lib/useFilteredProfile';

import { PersonFioFieldTexts } from './PersonFioField.texts';

type TPersonFioField = IFieldFactoryProps & {
  excludedPeopleFullNames?: string[];
};

export const PersonFioField: FC<TPersonFioField> = ({
  label,
  type,
  onSideActionComplete,
  excludedPeopleFullNames,
  ...props
}) => {
  const suggestions = useFilteredProfile(excludedPeopleFullNames);
  const { setError, clearErrors } = useFormContext();

  const handleSetWrongCharsetError = (error: Nullable<keyof typeof PersonFioFieldTexts>) => {
    const errorText = error ? PersonFioFieldTexts[error] : null;
    if (errorText) {
      setError(type, { message: errorText });
    } else {
      clearErrors(type);
    }
  };

  return (
    <UI.ControlledDaDataFullNameAutocomplete
      {...props}
      isClearable
      label={label ?? ''}
      name={type}
      getCleanFullName={(fio, cb) => {
        const capitalizedName = capitalizeFullName(fio);

        cb({ label: capitalizedName, value: capitalizedName });
      }}
      onError={handleSetWrongCharsetError}
      onProfileSelected={(person) => onSideActionComplete?.('profileApplied', person?.label)}
      peoples={suggestions}
      suggestions={suggestions}
    />
  );
};
