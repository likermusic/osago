import { BASE_URL } from '../../../../config/baseUrl';
import { generateOldOsagoUrl } from '../generateOldOsagoUrl';

const mockGetConfig = jest.fn();
jest.mock('next/config', () => jest.fn().mockImplementation(() => mockGetConfig()));

describe('WHEN "generateOldOsagoUrl" is called', () => {
  describe('AND "headerDomains" is presented in config', () => {
    const headerDomains = 'OSAGO_DOMAIN';
    beforeEach(() => {
      mockGetConfig.mockReturnValue({
        publicRuntimeConfig: {
          headerDomains: {
            base: headerDomains,
          },
        },
      });
    });

    it('AND "tail" url part is empty, MUST return base url', () => {
      expect(generateOldOsagoUrl()).toEqual(`${headerDomains}/osago/`);
    });

    it('AND "tail" url part is presented, MUST return base url plus tail', () => {
      expect(generateOldOsagoUrl('failure?hash=123')).toEqual(`${headerDomains}/osago/failure?hash=123`);
    });
  });

  it('AND "headerDomains" is  not presented in config MUST return base url', () => {
    mockGetConfig.mockReturnValue({
      publicRuntimeConfig: {},
    });
    expect(generateOldOsagoUrl('failure?hash=123')).toEqual(`${BASE_URL}/osago/failure?hash=123`);
  });
});
