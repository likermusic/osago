import type { ApiSchemas } from 'commonTypes/api/ApiSchemas';

import type { OSAGOGATEWAY_API, OSAGOGATEWAY_V2_API } from '../../generatedDTO';

declare namespace PropositionCalculations {
  export type GetCalculations = TCulculationsWithoutOffers & ICustomOffers;

  type TCulculationsWithoutOffers = Omit<
    OSAGOGATEWAY_V2_API['/v2/calculations/{calcHash}']['get']['responses']['200']['content']['application/json'],
    'offers' | 'multipleOrderInfo' | 'orderInfo' | 'alerts'
  >;

  export type PostManyOrders =
    OSAGOGATEWAY_API['/v1/many-orders']['post']['responses']['200']['content']['application/json'];
  export type PostManyOrdersRequest = Required<
    OSAGOGATEWAY_API['/v1/many-orders']['post']
  >['requestBody']['content']['application/json'];

  export type GetManyOrders = TGetManyOrdersWithoutOffers & ICustomOffers;
  type TGetManyOrdersWithoutOffers = Omit<
    OSAGOGATEWAY_API['/v1/many-orders/{orderHash}']['get']['responses']['200']['content']['application/json'],
    'offers' | 'orderInfo' | 'benefitSuccess' | 'multipleOrderInfo' | 'alerts'
  >;

  //  из свагера просто так не взять, в кривых типах добавил Capitalize
  interface ICustomOffers {
    offers: ApiSchemas.TOfferWithCustomTagsAndAlerts[];
    orderInfo: ApiSchemas.TOrderInfoWithCustomTagsAndAlerts;
    benefitSuccess: ApiSchemas.IAlert[];
    alerts: ApiSchemas.IAlert[];
  }

  type GetCalculationsHashQuery = NonNullable<
    OSAGOGATEWAY_API['/v1/calculations']['post']['requestBody']
  >['content']['application/json'];

  type GetCalculationsHashResponse =
    OSAGOGATEWAY_API['/v1/calculations']['post']['responses']['200']['content']['application/json'];

  type GetCalculationsHashRequest = {
    query: GetCalculationsHashQuery;
    hash?: string;
    searchId?: string;
    orderHash?: string;
  };
}
