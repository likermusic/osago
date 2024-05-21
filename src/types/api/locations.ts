import type { APIGATEWAY_API } from '../../generatedDTO';

export declare namespace locations {
  export type GetLocations =
    APIGATEWAY_API['/location/v1/locations/regional-centers']['get']['responses']['200']['content']['application/json'];
}
