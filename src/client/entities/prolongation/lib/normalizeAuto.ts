import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';

export const normalizeAuto = (
  brandName?: Nullable<string>,
  modelName?: Nullable<string>,
  vehicleYear?: Nullable<number>,
) => {
  let result = concatWithPrefix(brandName ?? '', modelName ?? '', ' ');

  if (vehicleYear) {
    result = concatWithPrefix(result, `${vehicleYear}`, ', ');
  }

  return result;
};
