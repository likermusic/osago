import type { OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace Driver {
  export type GetDriverKbmRequest = Required<
    OSAGOGATEWAY_API['/coefficients/kbm']['post']
  >['requestBody']['content']['application/json'];

  export type GetDriverKbmResponse =
    OSAGOGATEWAY_API['/coefficients/kbm']['post']['responses']['200']['content']['application/json'];
}
