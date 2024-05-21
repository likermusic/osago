import type { DaData } from '../../../../types/dadata';
import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';

export const getHostingsRequest = async () => {
  const { data } = await requestWithoutTokenGet<DaData.HostingsSuggestions>(
    `${config.OSAGOGATEWAY}/emails/v1/mail-hostings`,
  );

  return data;
};
