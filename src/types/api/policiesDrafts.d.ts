import type { OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace PoliciesDrafts {
  export type Request = Required<
    OSAGOGATEWAY_API['/v1/policydrafts']['post']
  >['requestBody']['content']['application/json'];

  export type BFFRequest = { query: PoliciesDrafts.Request; companyId: number | undefined };

  export type Response =
    OSAGOGATEWAY_API['/v1/policydrafts']['post']['responses']['200']['content']['application/json'];
}
