import { DEFAULT_REGION } from '../../../constants/locations';
import { getLocationSeoParams } from '../../../utils/metadata';
import { getLandingSeoParams } from '../getLandingSeoParams';

const mockGetSeoParamsByAliases = jest.fn();
jest.mock('@sravni/package-server-utils-insurance/lib/utils', () => ({
  getSeoParamsByAliases: jest.fn().mockImplementation(() => mockGetSeoParamsByAliases()),
}));

describe('WHEN "getLandingSeoParams" is called', () => {
  const externalRegion = { ...DEFAULT_REGION, name: 'UFA' };
  const defaultSeoParams = {
    region: getLocationSeoParams(DEFAULT_REGION),
  };

  beforeEach(() => {
    mockGetSeoParamsByAliases.mockResolvedValue({
      region: externalRegion,
    });
  });

  it('AND url does not satisfy matcher, MUST return default seo state', async () => {
    expect(
      await getLandingSeoParams({
        path: 'test-url',
        req: {
          __SELECTED_LOCATION__: DEFAULT_REGION,
        },
      }),
    ).toEqual(defaultSeoParams);
  });

  describe('AND url satisfies matcher', () => {
    it('AND decoding returns empty state, MUST return default seo params', async () => {
      mockGetSeoParamsByAliases.mockResolvedValue(null);

      expect(
        await getLandingSeoParams({
          path: '/osago/rosgosstrah/',
          req: {
            __SELECTED_LOCATION__: DEFAULT_REGION,
          },
        }),
      ).toEqual(defaultSeoParams);
    });

    it('AND decoding returns params for seo, MUST return it to client', async () => {
      expect(
        await getLandingSeoParams({
          path: '/osago/rosgosstrah/',
          req: {
            __SELECTED_LOCATION__: DEFAULT_REGION,
          },
        }),
      ).toEqual({
        region: externalRegion,
      });
    });
  });
});
