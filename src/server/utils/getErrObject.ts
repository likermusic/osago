import type { AxiosError } from 'axios';

export const getErrObject = (e: AxiosError) => ({
  message: e?.message,
  name: e?.name,
  config: e?.config,
  code: e?.code,
  response: {
    data: e?.response?.data,
    status: e?.response?.status,
    headers: e?.response?.headers,
  },
});
