import { pluralizeDrivers } from 'shared/lib/pluralize';

export const normalizeDriversCount = (driversCount = 0): string =>
  driversCount === 0 ? 'Без ограничений' : `${driversCount} ${pluralizeDrivers(driversCount)}`;
