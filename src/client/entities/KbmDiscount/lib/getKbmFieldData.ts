import type { Driver } from 'commonTypes/api/driver';

import type { TKbmFieldWithAlert } from 'shared/types/TKbmFieldWithAlert';

export const getKbmFieldData = (
  kbmData: Driver.GetDriverKbmResponse | undefined,
  isError: boolean,
  isLoading: boolean,
  isValid: boolean,
): TKbmFieldWithAlert => {
  if (!isValid) return { value: null, status: 'noData' };
  if (isLoading) return { value: null, status: 'loading' };
  if (isError) return { value: null, status: 'networkError' };
  if (!kbmData?.value) return { value: null, status: 'notFound' };

  return { value: kbmData.value, status: 'success' };
};
