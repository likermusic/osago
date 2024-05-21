const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: (...arg: unknown[]) => mockRouterPush(...arg),
    replace: (...arg: unknown[]) => mockRouterReplace(...arg),
    query: {},
    pathname: 'test/route',
  }),
  push: (...arg: unknown[]) => mockRouterPush(...arg),
  replace: (...arg: unknown[]) => mockRouterReplace(...arg),
  query: {},
  pathname: 'test/route',
}));

export { mockRouterPush, mockRouterReplace };
