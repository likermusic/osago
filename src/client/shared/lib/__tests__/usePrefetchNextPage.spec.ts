import { renderHook } from '@testing-library/react-hooks';

import { APP_ROUTES } from 'constants/routes';

import { usePrefetchNextPages } from '../usePrefetchNextPages';

const mockUseRouter = jest.fn().mockName('mockUseRouter');
const mockPrefetchRouter = jest.fn().mockName('mockPrefetchRouter');

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn().mockImplementation(() => mockUseRouter()),
}));
jest.mock('shared/lib/queue', () => ({
  queue: { push: jest.fn().mockImplementation((callback) => callback()) },
}));

describe('WHEN "usePrefetchNextPages" is called', () => {
  it.each`
    pathname                         | routes
    ${APP_ROUTES.propositions}       | ${[APP_ROUTES.summary]}
    ${`${APP_ROUTES.propositions}/`} | ${[APP_ROUTES.summary]}
    ${`${APP_ROUTES.main}`}          | ${[APP_ROUTES.propositions, APP_ROUTES.anketa]}
  `('MUST set $pathname to $routes', ({ pathname, routes }) => {
    mockUseRouter.mockReturnValue({
      pathname,
      prefetch: mockPrefetchRouter,
    });

    renderHook(() => usePrefetchNextPages());

    routes.forEach((route: string) => {
      expect(mockPrefetchRouter).toHaveBeenCalledWith(route);
    });
  });

  it.each`
    pathname                  | routes
    ${APP_ROUTES.success}     | ${[]}
    ${`${APP_ROUTES.order}/`} | ${[]}
  `('MUST set $pathname to empty $routes', ({ pathname, routes }) => {
    mockUseRouter.mockReturnValue({
      pathname,
      prefetch: mockPrefetchRouter,
    });

    renderHook(() => usePrefetchNextPages());

    routes.forEach((route: string) => {
      expect(mockPrefetchRouter).toHaveBeenCalledWith(route);
    });
  });
});
