import type { TObjectStore } from '../types';

import type { TPropertyKey } from './propertyKey';
import { formatKey } from './propertyKey';

type TInput = {
  id?: number;
  name?: string | null;
  shortName?: string | null;
};

type TFilteredModification = {
  id: number;
  name: string;
  shortName: string;
};

export const isModificationValid = (modification: TInput | undefined): modification is TFilteredModification =>
  !!modification?.id && !!modification?.name && !!modification.shortName;

export const mapModification = ({ name, shortName }: TFilteredModification) => ({
  // Модификация особенное поле и мы общаемся с беком не по полю value а по полю shortName из словаря
  value: shortName,
  label: name,
});

export const mapModifications = (key: TPropertyKey, modifications?: TInput[] | null): TObjectStore => ({
  [formatKey(key)]: modifications?.filter(isModificationValid)?.map(mapModification) ?? [],
});
