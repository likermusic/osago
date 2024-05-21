import { regNumberTokenInfo } from '../auto';

jest.mock('../../../utils/analytics', () => ({
  ...jest.requireActual('../../../utils/analytics'),

  getCookie: () => () => '',
}));

const mockDecodeRegNumberToken = jest.fn();
jest.mock('../../../services/auto', () => ({
  decodeRegNumberToken: jest.fn().mockImplementation((...args: unknown[]) => mockDecodeRegNumberToken(...args)),
}));

const mockGetCarInfo = jest.fn();
jest.mock('../../../services/autoInfo', () => ({
  getCarInfo: jest.fn().mockImplementation((...args: unknown[]) => mockGetCarInfo(...args)),
}));

describe('WHEN "regNumberTokenInfo" is called', () => {
  it('MUST call "decodeRegNumberToken" service with carNumber token and additional parameters', async () => {
    await regNumberTokenInfo({
      request: {
        headers: {
          'user-agent': 'user-agent',
        },
        body: {
          carNumberToken:
            'Avi20hKKWHl7tsnokSDBC1vJvCssYo2Vkv7X3zfVng7A2V-o9gvk0AebfTJdwi5E8eerxANp9OyHZcxeM3oqeDGOLDcmhfWn15U-O9ih-avIKTY438LzCx_sPqsrMTGQRFoEnOPVRxiSYmuL-jlhTsRaD3KQJ-e5Xu0TpoHeE64',
        },
      },
    });

    expect(mockDecodeRegNumberToken).toHaveBeenCalledWith({
      utm: {},
      partnerUtm: {
        source: '',
      },
      userAgent: 'user-agent',
      regNumberToken:
        'Avi20hKKWHl7tsnokSDBC1vJvCssYo2Vkv7X3zfVng7A2V-o9gvk0AebfTJdwi5E8eerxANp9OyHZcxeM3oqeDGOLDcmhfWn15U-O9ih-avIKTY438LzCx_sPqsrMTGQRFoEnOPVRxiSYmuL-jlhTsRaD3KQJ-e5Xu0TpoHeE64',
    });

    expect(mockGetCarInfo).toHaveBeenCalledWith({
      utm: {},
      partnerUtm: {
        source: '',
      },
      type: 'number',
      userAgent: 'user-agent',
      value: '',
    });
  });
});
