import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';

import type { DaData } from 'commonTypes/dadata';

export const mapHostings = (hostings: DaData.HostingsSuggestions): ICustomSelectOption[] => {
  if (!hostings || !Array.isArray(hostings)) return [];

  return hostings.map((host) => ({
    value: host,
    label: host,
  }));
};
