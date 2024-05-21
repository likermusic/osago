import type { DaData } from 'commonTypes/dadata';
import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithoutRetries } from 'shared/api/requestInstance';

import { mapHostings } from './mapHostings';

export const getHostings = async () => {
  const { data } = await axiosWithoutRetries.get<DaData.HostingsSuggestions>(BFF_PROXY_API.getDaDataHostings);

  return mapHostings(data);
};
