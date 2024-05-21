import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';

import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithRetry } from 'shared/api/requestInstance';

export const getFormatPathBuilder = (url: string, currentLocation: string) => async (_location: ILocation) => {
  let newUrl = url;
  const { data } = await axiosWithRetry.get(BFF_PROXY_API.indexedRoutes);

  if (!newUrl.endsWith('/')) {
    newUrl += '/';
  }

  if (data.includes(_location.id)) {
    if (newUrl.includes(currentLocation)) {
      return newUrl.replace(currentLocation, _location.alias);
    }

    return `${concatWithPrefix(newUrl, `${_location.alias}`, '')}/`;
  }

  return newUrl;
};
