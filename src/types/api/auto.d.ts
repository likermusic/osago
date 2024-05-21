import type { ConvertDotsToObj } from 'commonUtils/convertDotsToObject';

import type { AUTO_API, OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace Auto {
  export type TAutoInfoDictionaryRequest = {
    brandId: string | number;
    modelId: string | number;
    year: number;
    enginePower: number;
  };

  export type AutoInfo = GetAutoInfo & { modifications: GetModification };
  export type AutoInfoRequest = ConvertDotsToObj<OSAGOGATEWAY_API['/auto/v1/info']['get']['parameters']['query']>;
  export type GetAutoInfo = OSAGOGATEWAY_API['/auto/v1/info']['get']['responses']['200']['content']['application/json'];
  export type GetBrands = OSAGOGATEWAY_API['/auto/v1/brands']['get']['responses']['200']['content']['application/json'];
  export type GetCarEnginePowers =
    AUTO_API['/v1/brand/{brandId}/years/{yearFrom}/models/{modelId}/engine-powers']['get']['responses']['200']['content']['application/json'];
  export type GetManufactureYears =
    AUTO_API['/v1/model/{modelId}/years']['get']['responses']['200']['content']['application/json'];
  export type GetModels =
    AUTO_API['/v1/brand/{brandId}/models']['get']['responses']['200']['content']['application/json'];
  export type GetModification =
    AUTO_API['/v1/brand/{brandId}/years/{yearFrom}/models/{modelId}/powers/{power}/modifications']['get']['responses']['200']['content']['application/json'];
  export type GetRegNumberToken =
    OSAGOGATEWAY_API['/auto/v1/regnumber-token']['get']['responses']['200']['content']['application/json'];

  export type GetRegNumberTokenInfoRequest =
    OSAGOGATEWAY_API['/auto/v1/regnumber-token-info']['get']['parameters']['query'];
  export type GetRegNumberTokenInfoResponse =
    OSAGOGATEWAY_API['/auto/v1/regnumber-token-info']['get']['responses']['200']['content']['application/json'];

  export type TCalculationQueryDictionary = {
    brands: Auto.GetBrands;
    models: Auto.GetModels;
    powers: Auto.GetCarEnginePowers;
    years: Auto.GetManufactureYears;
    modifications: Auto.GetModification;
  };
}
