import type { OSAGOGATEWAY_API, OSAGO_STAFF_API, OSAGOGATEWAY_API_COMPONENTS_API } from '../../generatedDTO';

import type { ApiSchemas } from './ApiSchemas';

declare namespace Order {
  export type GetOrderInfo =
    OSAGOGATEWAY_API['/v1/many-orders/{orderHash}/info']['get']['responses']['200']['content']['application/json'] & {
      cashBackSuccess: ApiSchemas.IAlert[];
    };

  export type OrderInfoType =
    OSAGOGATEWAY_API_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Companies.Models.ReviewRating'];

  export type PostPolicyLink =
    OSAGO_STAFF_API['/v1/order/{orderHash}/policyinfo']['post']['responses']['200']['content']['application/json'];

  export type OrderQuery =
    OSAGO_STAFF_API['/v1/order/{orderHash}/queries']['get']['responses']['200']['content']['application/json'];
}
