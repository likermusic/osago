import type { PROMO_API } from '../../generatedDTO';

declare namespace Raffle {
  export type GetPoliciesForRaffleResponse =
    PROMO_API['/v1/lottery/policies']['get']['responses']['200']['content']['application/json'];
  export type RegisterUserInRaffleRequest = Required<
    PROMO_API['/v1/lottery/register']['post']
  >['requestBody']['content']['application/json'];
  export type RegisterUserInRaffleResponse =
    PROMO_API['/v1/lottery/register']['post']['responses']['200']['content']['application/json'];
}
