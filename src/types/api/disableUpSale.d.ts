import type { OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace disableUpSale {
  export type GetDisableUpSale =
    OSAGOGATEWAY_API['/v1/orders/{orderHash}/spoil']['get']['responses']['200']['content']['application/json'];
}
