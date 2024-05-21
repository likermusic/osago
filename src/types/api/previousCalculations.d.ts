import type { OSAGOGATEWAY_API } from '../../generatedDTO';

export declare namespace PreviousCalculation {
  export type GetProlongationPolicies =
    OSAGOGATEWAY_API['/v1/userorders/last']['get']['responses']['200']['content']['application/json'];
  export type GetCalculations =
    OSAGOGATEWAY_API['/v1/usersearches/last']['get']['responses']['200']['content']['application/json'];
}
