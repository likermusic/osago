const mockAppSelector = jest.fn();
const mockAppDispatch = jest.fn();

jest.mock('shared/lib/redux', () => ({
  useAppSelector: jest.fn().mockImplementation((...args: unknown[]) => mockAppSelector(...args)),
  useAppDispatch: jest.fn().mockReturnValue((...args: unknown[]) => mockAppDispatch(...args)),
}));

export { mockAppSelector, mockAppDispatch };
