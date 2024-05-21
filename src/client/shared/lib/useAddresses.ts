import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';
import { useDebounceValue } from '@sravni/react-utils';
import { useState, useEffect, useMemo } from 'react';

import { getAddress } from 'shared/api/daData';

const DA_DATA_DEBOUNCE = 700;

export function useAddresses(): {
  currentAddresses: ICustomSelectOption[];
  search: (value: string) => void;
  isLoading: boolean;
  searchValue: string;
} {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentAddresses, setCurrentAddresses] = useState<ICustomSelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearchValue = useDebounceValue<string | undefined>(searchValue, DA_DATA_DEBOUNCE);

  const search = useMemo(
    () => async (value: string) => {
      if (!value || value.length < 3) {
        return;
      }
      setIsLoading(true);

      try {
        const suggestions = await getAddress(value);
        setCurrentAddresses(suggestions);
      } catch (e) {
        setCurrentAddresses([]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    search(debounceSearchValue || '');
  }, [debounceSearchValue, search]);

  return {
    isLoading,
    currentAddresses,
    searchValue,
    search: setSearchValue,
  };
}
