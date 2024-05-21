import { mockHashWasmMd5 } from 'mocks/helpers/hashWasm';

import { generateEmptyCarInfoResult, getCarInfoController } from '../auto';

const HASH = 'hash';
const INCORRECT_HASH = 'hash1';

const mockGetCarInfo = jest.fn();

jest.mock('../../../services/autoInfo', () => ({
  getCarInfo: (...args: unknown[]) => mockGetCarInfo(...args),
}));

jest.mock('../../../utils/analytics', () => ({
  ...jest.requireActual('../../../utils/analytics'),

  getCookie: () => () => '',
}));

const CAR_NUMBER = 'А 123 АА 157';

const emptyCarInfoResult = generateEmptyCarInfoResult(CAR_NUMBER);
const getContex = (hash: unknown) => ({
  request: {
    body: {
      carNumber: CAR_NUMBER,
      hash,
    },
    headers: {
      'user-agent': '',
    },
  },
  body: undefined,
});

describe('WHEN "getCarInfoController" is called', () => {
  beforeAll(() => {
    mockHashWasmMd5.mockReturnValue(HASH);
  });

  it('AND no hash in request MUST not do request AND MUST return emptyCarInfoResult', async () => {
    const ctx = getContex(undefined);
    await getCarInfoController(ctx);

    expect(ctx.body).toEqual(emptyCarInfoResult);
    expect(mockGetCarInfo).not.toHaveBeenCalled();
  });

  it('AND hash in request is incorrect  MUST not do request AND MUST return emptyCarInfoResult', async () => {
    const ctx = getContex(INCORRECT_HASH);
    await getCarInfoController(ctx);

    expect(ctx.body).toEqual(emptyCarInfoResult);
    expect(mockGetCarInfo).not.toHaveBeenCalled();
  });

  it('AND hash in request is correct  MUST do request', async () => {
    const ctx = getContex(HASH);
    await getCarInfoController(ctx);

    expect(mockGetCarInfo).toHaveBeenCalled();
  });
});
