import { formatPrice } from 'shared/lib/formatters';

import type { IPreviousCalculations } from 'entities/previousCalculations';

export const mapCalculationsForAnalytic = (calculations: IPreviousCalculations[]): string[] =>
  calculations.reduce<string[]>((acc, currentValue) => {
    acc.push(`${currentValue.regNumber}, ${formatPrice(currentValue.minPrice)}`);
    return acc;
  }, []);
