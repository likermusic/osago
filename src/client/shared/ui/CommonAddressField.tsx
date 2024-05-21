import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';

import { useAddresses } from '../lib/useAddresses';

export const CommonAddressField = (props: IFieldFactoryProps) => {
  const { type, label, isMobileFlow } = props;

  const { search, searchValue, isLoading, currentAddresses } = useAddresses();

  return (
    <UI.ControlledAdressDadataAutocomplete
      isClearable
      suggestions={currentAddresses}
      onSearch={search}
      name={type}
      setDefaultSearchValue={search}
      currentSearchValue={searchValue}
      isLoading={isLoading}
      label={label || ''}
      isMobileFlow={isMobileFlow}
    />
  );
};
