import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithoutRetries } from 'shared/api/requestInstance';

export const fetchRegions = async () => {
  let centers = null;

  const centersData = localStorage.getItem('centers');

  if (!centersData) {
    try {
      const { data: centersApi } = await axiosWithoutRetries.get(BFF_PROXY_API.getRegionalCenters);

      localStorage.setItem('centers', JSON.stringify(centersApi));
    } catch (e) {}
  } else {
    try {
      centers = JSON.parse(centersData);
    } catch (e) {}
  }

  return centers;
};
