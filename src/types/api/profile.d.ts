import type { OSAGOGATEWAY_V2_API } from '../../generatedDTO';

declare namespace Profile {
  export type PostPeopleRequest =
    OSAGOGATEWAY_V2_API['/v2/profile/people']['post']['requestBody']['content']['application/json'];
  export type PostPeopleResponse =
    OSAGOGATEWAY_V2_API['/v2/profile/people']['post']['responses']['200']['content']['application/json'];
}
