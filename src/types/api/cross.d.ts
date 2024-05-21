import type { OSAGOGATEWAY_API, OSAGOGATEWAY_API_COMPONENTS_API } from '../../generatedDTO';

declare namespace Cross {
  export type GetCrossCalculations =
    OSAGOGATEWAY_API['/v1/x/calculation/{hash}']['get']['responses']['200']['content']['application/json'];
  export type GetCrossCalculationsPropositions = Array<
    OSAGOGATEWAY_API_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.ExternalDependencies.XGateway.Models.XProposition']
  >;
  export type GetCrossCalculationsPropositionsProperties = Array<
    OSAGOGATEWAY_API_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.ExternalDependencies.XGateway.Models.ProductProperty']
  >;
  export type GetCrossCalculationsPropositionsPropertiesEnriched = Array<
    OSAGOGATEWAY_API_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.ExternalDependencies.XGateway.Models.EnrichedProductProperty']
  >;

  export type PostCrossCalculations =
    OSAGOGATEWAY_API['/v1/x/calculation']['post']['responses']['200']['content']['application/json'];

  export type GetCrossOrders =
    OSAGOGATEWAY_API['/v1/x/order/{hash}']['get']['responses']['200']['content']['application/json'];

  export type PostCrossOrders =
    OSAGOGATEWAY_API['/v1/x/order']['post']['responses']['200']['content']['application/json'];

  export type PostCrossOrdersRequest = Required<
    OSAGOGATEWAY_API['/v1/x/order']['post']
  >['requestBody']['content']['application/json'];
}
