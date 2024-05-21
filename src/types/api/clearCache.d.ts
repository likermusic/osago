import type { OSAGO_STAFF_API } from '../../generatedDTO';

declare namespace ClearCache {
  export type Response =
    OSAGO_STAFF_API['/v1/order/{orderHash}/clear-cache']['post']['responses']['200']['content']['text/json'];
}
