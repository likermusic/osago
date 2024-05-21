import getConfig from 'next/config';

import { BASE_URL } from '../../../config/baseUrl';

export const generateOldOsagoUrl = (tail = '') => {
  const { headerDomains } = getConfig().publicRuntimeConfig;
  return `${headerDomains?.base || BASE_URL}/osago/${tail}`;
};
