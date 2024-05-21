import type { OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace Analytics {
  export type TEventsRequest = NonNullable<
    OSAGOGATEWAY_API['/v1/events']['post']['requestBody']
  >['content']['application/json'];
  export type TEventsResponse =
    OSAGOGATEWAY_API['/v1/events']['post']['responses']['200']['content']['application/json'];
}
