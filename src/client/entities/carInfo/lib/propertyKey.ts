import { isDefined } from '@sravni/react-utils';

export type TPropertyKey = {
  brandId?: string | number;
  modelId?: string | number;
  year?: string | number;
  power?: string | number;
};

export const formatKey = ({ brandId, modelId, year, power }: TPropertyKey) =>
  [brandId, modelId, year, power].filter(isDefined).join(':');

export const getPowerOptionsKey = (props: Required<Omit<TPropertyKey, 'power'>>) => formatKey(props);

export const getModificationOptionsKey = (props: Required<TPropertyKey>) => formatKey(props);
