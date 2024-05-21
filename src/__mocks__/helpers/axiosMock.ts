const mockAxiosGet = jest.fn();
const mockAxiosPut = jest.fn();
const mockAxiosPost = jest.fn();
const mockAxiosDelete = jest.fn();

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: (...arg: unknown[]) => mockAxiosGet(...arg),
  put: (...arg: unknown[]) => mockAxiosPut(...arg),
  post: (...arg: unknown[]) => mockAxiosPost(...arg),
  delete: (...arg: unknown[]) => mockAxiosDelete(...arg),
  create: () => ({
    get: (...arg: unknown[]) => mockAxiosGet(...arg),
    put: (...arg: unknown[]) => mockAxiosPut(...arg),
    post: (...arg: unknown[]) => mockAxiosPost(...arg),
    delete: (...arg: unknown[]) => mockAxiosDelete(...arg),
  }),
}));

jest.mock('@sravni/server-utils/lib/request', () => ({
  get: (...arg: unknown[]) => mockAxiosGet(...arg),
  put: (...arg: unknown[]) => mockAxiosPut(...arg),
  post: (...arg: unknown[]) => mockAxiosPost(...arg),
  delete: (...arg: unknown[]) => mockAxiosDelete(...arg),
}));

jest.mock('shared/api/requestInstance', () => ({
  axiosWithoutRetries: {
    get: (...arg: unknown[]) => mockAxiosGet(...arg),
    put: (...arg: unknown[]) => mockAxiosPut(...arg),
    post: (...arg: unknown[]) => mockAxiosPost(...arg),
    delete: (...arg: unknown[]) => mockAxiosDelete(...arg),
  },
  axiosWithRetry: {
    get: (...arg: unknown[]) => mockAxiosGet(...arg),
    put: (...arg: unknown[]) => mockAxiosPut(...arg),
    post: (...arg: unknown[]) => mockAxiosPost(...arg),
    delete: (...arg: unknown[]) => mockAxiosDelete(...arg),
  },
}));

export { mockAxiosGet, mockAxiosPut, mockAxiosPost, mockAxiosDelete };
