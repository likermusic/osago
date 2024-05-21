import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';

import type { Auto } from 'commonTypes/api/auto';

import type { TBrandData } from '../types';

type TFilteredBrand = {
  id: number;
  name: string;
  alias: string;
};

export const isBrandValid = (brand: Auto.GetBrands[0] | undefined): brand is TFilteredBrand =>
  !!brand?.id && !!brand?.alias && !!brand?.name;

export const mapBrand = ({ id, name, alias }: TFilteredBrand) => ({ value: id, label: name, data: { alias } });

export const mapBrands = (brands?: Auto.GetBrands): Array<ICustomSelectOption<TBrandData>> =>
  brands?.filter(isBrandValid)?.map(mapBrand) ?? [];
