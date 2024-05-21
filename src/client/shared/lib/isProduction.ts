import getConfig from 'next/config';

export const isProduction = (): boolean => {
  const { environment, autoTest } = getConfig().publicRuntimeConfig;
  return environment === 'production' && autoTest !== 'true';
};
