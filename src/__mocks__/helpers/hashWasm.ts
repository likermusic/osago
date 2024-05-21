export const mockHashWasmMd5 = jest.fn();

jest.mock('hash-wasm', () => ({
  ...jest.requireActual('hash-wasm'),
  md5: (...arg: unknown[]) => mockHashWasmMd5(...arg),
}));
