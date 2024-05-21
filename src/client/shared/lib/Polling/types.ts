import type { AxiosError } from 'axios';

import type { BFF_PROXY_API } from 'constants/apiRoutes';

export type TPolling = {
  maxPollingIntervalMs: number;
  pollingIntervalMs: number;
  urlKey: keyof typeof BFF_PROXY_API;
};
export type TSuccessAction<R> = (data: R, isExpired: boolean) => void;
export type TErrorAction = (error: AxiosError) => void;

export interface IPollingAbs<R> {
  startPolling(params: Record<string, unknown>): void;
  stopPolling: () => void;
  setOnError: (onError: TErrorAction) => void;
  setOnSuccess: (onSuccess: TSuccessAction<R>) => void;
}
