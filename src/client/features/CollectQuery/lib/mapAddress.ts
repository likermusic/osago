import { FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT } from 'constants/flatPrefix';

export const mapAddress = (address: string, flat?: string) =>
  flat ? `${address}, ${FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT}${flat}` : address;
