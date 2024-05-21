import type { TObjectStore } from '../types';

import type { TPropertyKey } from './propertyKey';
import { formatKey } from './propertyKey';

export const mapYear = (power: number) => ({ value: power, label: power.toString() });

export const mapManufactureYears = (key: TPropertyKey, years?: number[] | null): TObjectStore => ({
  [formatKey(key)]: years?.map(mapYear) ?? [],
});
