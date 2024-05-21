import type { APIGATEWAY_API } from '../generatedDTO';

declare namespace Whitelabel {
  export type TPartnerQuery =
    APIGATEWAY_API['/agents/v1/agents/query']['post']['requestBody']['content']['application/json'];

  export type TWhiteLabel = {
    analytics: TPartnerQuery;
    nonPartnerWl: boolean;
  };
}
