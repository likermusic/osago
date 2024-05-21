import type { OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace Marketing {
  export type GetMarketingInfoResponse =
    OSAGOGATEWAY_API['/v1/events/marketing']['get']['responses']['200']['content']['application/json'];
}
