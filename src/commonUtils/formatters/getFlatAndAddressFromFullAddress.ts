import { FLAT_REGEXP } from '../../constants/flatPrefix';

export const getFlatAndAddressFromFullAddress = (
  fullAddress: string | undefined,
): { flat: string; address: string } => {
  const fullAddressArray = fullAddress?.split(FLAT_REGEXP);

  return { flat: fullAddressArray?.[2] ?? '', address: fullAddressArray?.[0] ?? '' };
};
