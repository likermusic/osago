import type { OSAGOGATEWAY_API } from 'src/generatedDTO';

declare namespace DaData {
  export type HostingsSuggestions =
    OSAGOGATEWAY_API['/emails/v1/mail-hostings']['get']['responses']['200']['content']['application/json'];

  export type AddressesRequests = {
    search: string;
    bound: 'house' | 'settlement';
  };

  export interface Address {
    address: string;
    fiasLevel: string;
  }

  export interface AddressSuggestion {
    value: string;
    unrestricted_value: string;
    data: {
      postal_code: null;
      country: string;
      country_iso_code: string;
      federal_district: string;
      region_fias_id: string;
      region_kladr_id: string;
      region_iso_code: string;
      region_with_type: string;
      region_type: string;
      region_type_full: string;
      region: string;
      city_fias_id: string;
      city_kladr_id: string;
      city_with_type: string;
      city_type: string;
      city_type_full: string;
      city: string;
      city_area: string;
      street_fias_id: string;
      street_kladr_id: string;
      street_with_type: string;
      street_type: string;
      street_type_full: string;
      street: string;
      fias_id: string;
      fias_level: string;
      fias_actuality_state: string;
      kladr_id: string;
      geoname_id: string;
      capital_marker: string;
      okato: string;
      oktmo: string;
      tax_office: string;
      tax_office_legal: string;
      timezone: string;
      geo_lat: string;
      geo_lon: string;
      beltway_hit: string;
      qc_geo: string;
    };
  }
}
