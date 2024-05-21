import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import type { CarInfoCommonFields } from 'entities/carInfo';

import { useOptions } from './useOptions';

export const useCategoryType = () => {
  const { categories } = useOptions();
  const { watch } = useFormContext<CarInfoCommonFields>();

  const category = watch('category');

  if (category?.data?.isPrefilled && category?.value) {
    if (category?.value !== 'B') return 'alert';

    return null;
  }

  if (categories?.length) {
    if (categories.length > 1) return 'field';

    if (categories[0]?.value !== 'B') return 'alert';
  }

  return null;
};
