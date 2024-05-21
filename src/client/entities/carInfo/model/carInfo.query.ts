import type { Auto } from 'commonTypes/api/auto';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapBrands } from 'entities/carInfo/lib/mapBrands';

import { mapCarPropertyToSelectOption } from '../lib/mapCarPropertyToSelectOption';
import { mapManufactureYears } from '../lib/mapManufactureYears';
import { mapModifications } from '../lib/mapModifications';
import { mapPowers } from '../lib/mapPowers';
import type { TObjectStore } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getEnginePowers: build.query<
      TObjectStore,
      { brandId: string | number; modelId: string | number; year: string | number }
    >({
      query: (params) => ({
        url: BFF_API_ROUTES.getCarEnginePowers,
        params,
      }),
      transformResponse: (response: Auto.GetCarEnginePowers, _, args) => mapPowers(args, response),
    }),
    getModels: build.query<TObjectStore, number | string>({
      query: (brandId) => ({
        url: BFF_API_ROUTES.getModels,
        params: { brandId },
      }),
      transformResponse: (response: Auto.GetModels, _, brandId) => mapCarPropertyToSelectOption({ brandId }, response),
    }),
    getBrands: build.query<ReturnType<typeof mapBrands>, void>({
      query: () => ({
        url: BFF_API_ROUTES.getBrands,
      }),
      transformResponse: (response: Auto.GetBrands, _) => mapBrands(response),
    }),
    getManufactureYears: build.query<TObjectStore, number | string>({
      query: (modelId) => ({
        url: BFF_API_ROUTES.getManufactureYears,
        params: { modelId },
      }),
      transformResponse: (response: Auto.GetManufactureYears, _, modelId) => mapManufactureYears({ modelId }, response),
    }),
    getModification: build.query<
      TObjectStore,
      { brandId: string | number; modelId: string | number; year: string | number; power: string | number }
    >({
      query: (params) => ({
        url: BFF_API_ROUTES.getCarModifications,
        params,
      }),
      transformResponse: (response: Auto.GetModification, _, args) => mapModifications(args, response),
    }),
  }),
});

export const useGetEnginePowers = queries.useLazyGetEnginePowersQuery;
export const useGetModels = queries.useLazyGetModelsQuery;
export const useGetManufactureYears = queries.useLazyGetManufactureYearsQuery;
export const useGetModifications = queries.useLazyGetModificationQuery;
export const useGetBrands = queries.useGetBrandsQuery;
