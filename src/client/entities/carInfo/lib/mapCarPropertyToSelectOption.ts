import type { TObjectStore } from '../types';

import type { TPropertyKey } from './propertyKey';
import { formatKey } from './propertyKey';

type TInput = {
  id?: number;
  name?: Nullable<string>;
  categories?: Nullable<string[]>;
};

type TFilteredProperty = {
  id: number;
  name: string;
  categories: string[];
};

export const isPropertyValid = (property: TInput | undefined): property is TFilteredProperty =>
  !!property?.id && !!property?.name;

export const mapProperty = ({ id, name, categories }: TFilteredProperty) => ({
  value: id,
  label: name,
  categories: categories.map((category) => category.toUpperCase()),
});

export const mapCarPropertyToSelectOption = (key: TPropertyKey, properties?: TInput[] | null): TObjectStore => ({
  [formatKey(key)]: properties?.filter(isPropertyValid)?.map(mapProperty) ?? [],
});
