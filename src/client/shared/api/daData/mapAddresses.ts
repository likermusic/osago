import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';

import type { DaData } from '../../../../types/dadata';

export const mapAddresses = (addresses: DaData.Address[]): ICustomSelectOption[] =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  addresses.map(({ fiasLevel: fias_level, address }) => ({
    value: address,
    label: address,
    data: { fias_level },
  }));
