import type { OSAGOGATEWAY_API } from '../../generatedDTO';

export declare namespace PolicyInfo {
  export type GetRecommendedStartDateRes =
    OSAGOGATEWAY_API['/v1/calculations/recommendedstartdate']['post']['responses']['200']['content']['application/json'];
  export type GetRecommendedStartDateReq = Required<
    OSAGOGATEWAY_API['/v1/calculations/recommendedstartdate']['post']
  >['requestBody']['content']['application/json'];
}
