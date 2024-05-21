import type { AnaliticsValue } from 'shared/lib/sendGAEvents/interface';

export const formatValue = (value: AnaliticsValue) => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.join('|');
  }

  return value.toString();
};
