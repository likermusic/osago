import type { OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace Query {
  export type TRestoreCalculationQueryByHashQuery =
    OSAGOGATEWAY_API['/v1/queries/searchHash/{hash}/restore']['get']['parameters']['path'];

  export type TRestoreCalculationQueryByOrderHashQuery =
    OSAGOGATEWAY_API['/v1/queries/orderHash/{orderHash}']['get']['parameters']['path'];

  export type TRestoreCalculationQueryBySearchIdQuery =
    OSAGOGATEWAY_API['/v1/queries/id/{id}/hash/{hash}']['get']['parameters']['path'];

  export type TRestoreCalculationQueryResponse =
    | OSAGOGATEWAY_API['/v1/queries/searchHash/{hash}/restore']['get']['responses']['200']['content']['application/json']
    | OSAGOGATEWAY_API['/v1/queries/orderHash/{orderHash}']['get']['responses']['200']['content']['application/json']
    | OSAGOGATEWAY_API['/v1/queries/id/{id}/hash/{hash}']['get']['responses']['200']['content']['application/json'];
}
