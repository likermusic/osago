// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import { mockAxiosDelete, mockAxiosGet, mockAxiosPost, mockAxiosPut, mockedNanoid } from 'mocks/helpers';
import { MockPollingClass } from 'mocks/helpers/polling';

jest.mock('../src/server/utils/openId', () => ({
  getIdentityAuthHeader: () => ({
    Authorization: `Authorization`,
  }),
  getServicesAuthHeader: () => ({
    Authorization: `Authorization`,
  }),
  getUserAuthHeader: () => ({
    Authorization: `Authorization`,
  }),
}));

// @ts-ignore
global.XMLHttpRequest = undefined;

jest.mock('../src/server/constants/config', () => ({
  config: {
    AUTO: '<AUTO_API>',
    APIGATEWAY: '<APIGATEWAY_API>',
    METADATA: '<METADATA>',
    ISSUER: '<ISSUER>',
    GATEWAY: '<GATEWAY>',
    DADATA: '<DADATA>',
    CASCO: '<CASCO_API>',
    PASSPORTAUTHORITY: '<PASSPORTAUTHORITY>',
    RABBIT: 'amqp://<RABBIT>',
    WEB_PATH: '<WEB_PATH>',
    REVIEWS: '<REVIEWS>',
    PROFILE: '<PROFILE>',
    LOCATIONS: '<LOCATIONS>',
    OSAGO_STAFF: '<OSAGO_STAFF>',
    OSAGOGATEWAY: '<OSAGOGATEWAY>',
    INSURANCECOMPANIES: '<INSURANCECOMPANIES>',
    PROMO: '<PROMO>',
  },
}));

jest.mock('@sravni/server-utils/lib/memoryCache');
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    headerDomains: {
      base: 'DOMAIN.ru',
    },
  },
}));

jest.mock('nanoid', () => ({
  nanoid: () => mockedNanoid(),
}));

jest.mock('shared/lib/Polling/polling', () => ({
  Polling: jest.fn().mockImplementation(() => new MockPollingClass()),
}));

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

export {};
