import { md5 } from 'hash-wasm';
import getConfig from 'next/config';

import type { Driver } from 'commonTypes/api/driver';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getDriverKbm: build.query<Driver.GetDriverKbmResponse, Driver.GetDriverKbmRequest & { hash: string }>({
      query: ({ hash, ...body }) => ({
        url: BFF_API_ROUTES.getDriverKbm,
        method: 'POST',
        body,
        params: { hash },
        timeout: 10000,
      }),
      // Чтобы не обновлять каждый раз кэш при изменении хэша
      serializeQueryArgs: ({ queryArgs }) => ({ driver: queryArgs.driver, marker: queryArgs.marker }),
      // Тк пользователь на анкете по 10 минут зависает
      keepUnusedDataFor: 600,
    }),
  }),
});

export const useLazyGetDriverKbm = queries.useLazyGetDriverKbmQuery;

type TypeOfLazyFuncFromHook = ReturnType<typeof useLazyGetDriverKbm>[0];

type OmitFirstArrayElement<T extends unknown[]> = T extends [_: unknown, ...args: infer U] ? U : never;
type RestLazyHookReturnParams = OmitFirstArrayElement<ReturnType<typeof useLazyGetDriverKbm>>;

type LazyFuncFromHookReturnType = ReturnType<TypeOfLazyFuncFromHook>;

type OmitHashFromArgsLazyFuncParams = Omit<Parameters<TypeOfLazyFuncFromHook>[0], 'hash'>;

export const useLazySaltedGetDriverKbm = (): [
  (body: OmitHashFromArgsLazyFuncParams) => Promise<LazyFuncFromHookReturnType>,
  ...RestLazyHookReturnParams,
] => {
  const [query, ...rest] = useLazyGetDriverKbm();

  return [
    async (bodyWithoutHash: OmitHashFromArgsLazyFuncParams): Promise<LazyFuncFromHookReturnType> => {
      const { saltAutoInfo } = getConfig().publicRuntimeConfig;

      const hash = await md5(`${bodyWithoutHash.driver?.license?.number}${saltAutoInfo}`);

      // true нужен чтобы в lazy запросах включить кэш
      return query({ ...bodyWithoutHash, hash }, true);
    },
    ...rest,
  ];
};
