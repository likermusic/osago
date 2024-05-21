import type { OSAGO_STAFF_API } from '../../generatedDTO';

declare namespace RestoreSelectedProposition {
  export type Response =
    OSAGO_STAFF_API['/v1/order/{orderHash}/tehinfo']['get']['responses']['200']['content']['application/json'];
}
