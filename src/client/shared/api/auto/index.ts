import { md5 } from 'hash-wasm';
import getConfig from 'next/config';

import type { Auto } from 'commonTypes/api/auto';

import { BFF_PROXY_API } from '../../../../constants';
import { axiosWithoutRetries } from '../requestInstance';

export const getCarInfo = async (carNumber: string): Promise<Auto.AutoInfo> => {
  const { saltAutoInfo } = getConfig().publicRuntimeConfig;

  const hash = await md5(`${carNumber}${saltAutoInfo}`);
  const { data } = await axiosWithoutRetries.post(BFF_PROXY_API.getCarInfo, { carNumber, hash });

  return data;
};
