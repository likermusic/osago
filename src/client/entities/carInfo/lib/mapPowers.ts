import type { TObjectStore } from '../types';

import type { TPropertyKey } from './propertyKey';
import { formatKey } from './propertyKey';

const HORSEPOWER_TO_KWT_COEFF = 0.7355;

const convertHorsepowerToKwt = (power: number) => power * HORSEPOWER_TO_KWT_COEFF;

export const normalizePower = (power: number): string =>
  `${power} л.с. / ${convertHorsepowerToKwt(power).toLocaleString('ru', {
    maximumFractionDigits: 2,
  })} кВт`;

export const mapPower = (power: number) => ({ value: power, label: normalizePower(power) });

export const mapPowers = (key: Omit<TPropertyKey, 'power'>, powers?: number[] | null): TObjectStore => ({
  [formatKey(key)]: powers?.map(mapPower) ?? [],
});
