import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';

import type { DaData } from 'commonTypes/dadata';
import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithoutRetries } from 'shared/api/requestInstance';

import { mapAddresses } from './mapAddresses';

export const getAddress = async (search: string): Promise<ICustomSelectOption[]> => {
  if (search?.length < 3) {
    return [];
  }

  const { data } = await axiosWithoutRetries.post<{ search: string }, { data: DaData.Address[] }>(
    BFF_PROXY_API.getAddressesAutocomplete,
    {
      search,
    },
  );

  return mapAddresses(data);
};
