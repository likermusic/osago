const mockedMemoryCacheGet = jest.fn();
const mockedMemoryCacheSet = jest.fn();
jest.mock('@sravni/server-utils/lib/memoryCache', () => ({
  get: (...args: unknown[]) => mockedMemoryCacheGet(...args),
  set: (...args: unknown[]) => mockedMemoryCacheSet(...args),
}));

export { mockedMemoryCacheGet, mockedMemoryCacheSet };
