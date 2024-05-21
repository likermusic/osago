import type request from '@sravni/server-utils/lib/request';

export type TGetMethod = typeof request.get;
export type TPostMethod = typeof request.post;
export type TMethod = TGetMethod | TPostMethod;

export type DoGetRequestProps<TConfig> = {
  method: TGetMethod;
  url: string;
  config?: TConfig;
  headers?: Record<string, string>;
  retryCount?: number;
  checkRetry: (retryCount: number, status: number) => boolean;
};

export type DoPostRequestProps<TConfig, TData> = Omit<DoGetRequestProps<TConfig>, 'method'> & {
  method: TPostMethod;
  data?: TData;
  checkRetry: (retryCount: number, status: number) => boolean;
};
