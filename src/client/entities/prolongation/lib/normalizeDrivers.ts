import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';

import type { TDriversFromServer } from '../types';

export const normalizeDrivers = (drivers?: Nullable<TDriversFromServer>): string =>
  drivers?.map(({ fullName }) => fullName)?.join(TEXT_DOT_SEPARATOR) || '';
