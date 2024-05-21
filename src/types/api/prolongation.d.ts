import type { OSAGOGATEWAY_API } from '../../generatedDTO';

export declare namespace Prolongation {
  export type FoundedProlongationPolicyResponse =
    OSAGOGATEWAY_API['/v1/orders/prolongationOffer']['post']['responses']['200']['content']['application/json'];

  export type FoundedProlongationPolicyRequest = {
    carNumber: string;
  };
}
