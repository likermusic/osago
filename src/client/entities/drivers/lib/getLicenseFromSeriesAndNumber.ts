import { concatWithPrefix, removeSpaces } from '@sravni/cosago-react-library/lib/utils';

import { MAX_DRIVERS_LICENSE_LENGTH } from 'entities/drivers';

export const getLicenseFromSeriesAndNumber = (
  series: Nullable<string | undefined>,
  number: Nullable<string | undefined>,
) => (series ? removeSpaces(concatWithPrefix(series, number || '')).slice(0, MAX_DRIVERS_LICENSE_LENGTH) : '');
