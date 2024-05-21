import type { DaData } from '../../../../types/dadata';
import { config } from '../../../constants/config';
import { requestWithoutTokenPost } from '../../../utils/api/api';

export const getAddress = async ({ search, bound = 'house' }: DaData.AddressesRequests): Promise<DaData.Address[]> => {
  try {
    if (search?.length < 3) {
      return [];
    }

    const url = `${config.DADATA}/v1/suggest/address/`;

    const { data } = await requestWithoutTokenPost<{ suggestions: DaData.AddressSuggestion[] }>(url, {
      query: search,
      to_bound: {
        value: bound,
      },
    });

    return data.suggestions.map((suggestion) => ({
      address: suggestion.value,
      fiasLevel: suggestion.data?.fias_level,
    }));
  } catch (e) {
    return [];
  }
};
