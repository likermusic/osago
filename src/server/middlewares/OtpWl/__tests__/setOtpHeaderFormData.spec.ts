import { PARTNERS_IDS } from 'constants/partners';
import { FULL_OTP_USER_DATA } from 'mocks/OtpUserData';

import { COUNTRY_CODES } from '../constants';
import { setOtpHeaderFormData } from '../setOtpHeaderFormData';

const mockNext = jest.fn().mockName('mockNext');
const mockDecryptSignedJwtPayload = jest.fn().mockName('mockDecryptSignedJwtPayload');
const mockOtpError = jest.fn().mockName('mockOtpError');

jest.mock('../decryptSignedJwtPayload', () => ({
  decryptSignedJwtPayload: jest.fn().mockImplementation(() => mockDecryptSignedJwtPayload()),
}));

jest.mock('../OtpError', () => ({
  OtpError: jest.fn().mockImplementation((...args: any[]) => mockOtpError(...args)),
}));

const CTX_OTP = { req: { __WL__: { partnerId: PARTNERS_IDS.otp }, headers: { authorization: 'authorization' } } };

describe('WHEN "setOtpHeaderFormData" is called', () => {
  afterEach(() => {
    expect(mockNext).toHaveBeenCalled();
  });

  it('AND partner is not OTP MUST not try decrypt token', async () => {
    setOtpHeaderFormData({ req: {} }, mockNext);
    expect(mockDecryptSignedJwtPayload).not.toHaveBeenCalled();
  });

  describe('AND partner is OTP', () => {
    it('MUST not try decrypt token', async () => {
      await setOtpHeaderFormData(CTX_OTP, mockNext);

      expect(mockDecryptSignedJwtPayload).not.toHaveBeenCalled();
      expect(mockOtpError).toHaveBeenCalledWith({
        message: 'OTP_JWE_PRIVATE_KEY_NOT_FOUND',
        metricStatus: 'jwePrivateKey_not_found',
      });
    });

    describe('AND env var "OTP_BANK_JWE_PRIVATE_KEY" is provided', () => {
      beforeEach(() => {
        process.env = { ...process.env, OTP_BANK_JWE_PRIVATE_KEY: 'key' };
      });

      afterEach(() => {
        expect(mockDecryptSignedJwtPayload).toHaveBeenCalled();
      });

      it('AND "decryptSignedJwtPayload" return invalid value MUST throw error "OTP_DATA_EXTRACTION_ERROR_PAYLOAD"', async () => {
        await setOtpHeaderFormData(CTX_OTP, mockNext);

        expect(mockOtpError).toHaveBeenCalledWith({
          message: 'OTP_DATA_EXTRACTION_ERROR_PAYLOAD',
          metricStatus: 'incorrect_payload',
        });
      });

      it('AND clientId not exist in jwePayload MUST throw error "OTP_DATA_EXTRACTION_ERROR_CLIENT_ID"', async () => {
        mockDecryptSignedJwtPayload.mockResolvedValue({
          ...FULL_OTP_USER_DATA,
          tokenData: { ...FULL_OTP_USER_DATA.tokenData, clientId: '' },
        });
        await setOtpHeaderFormData(CTX_OTP, mockNext);

        expect(mockOtpError).toHaveBeenCalledWith({
          message: 'OTP_DATA_EXTRACTION_ERROR_CLIENT_ID',
          metricStatus: 'wrong_client_id',
        });
      });

      it('AND citizenship not exist is not russia MUST throw error "OTP_DATA_EXTRACTION_ERROR_CITIZENSHIP"', async () => {
        mockDecryptSignedJwtPayload.mockResolvedValue({
          ...FULL_OTP_USER_DATA,
          tokenData: {
            ...FULL_OTP_USER_DATA.tokenData,
            personalData: {
              ...FULL_OTP_USER_DATA.tokenData.personalData,
              citizenship: COUNTRY_CODES.russia + 1,
            },
          },
        });
        await setOtpHeaderFormData(CTX_OTP, mockNext);

        expect(mockOtpError).toHaveBeenCalledWith({
          message: 'OTP_DATA_EXTRACTION_ERROR_CITIZENSHIP',
          metricStatus: 'unsupported_country',
        });
      });

      it('AND citizenship not exist is not russia MUST throw error "OTP_DATA_EXTRACTION_ERROR_CITIZENSHIP"', async () => {
        mockDecryptSignedJwtPayload.mockResolvedValue({
          ...FULL_OTP_USER_DATA,
          tokenData: {
            ...FULL_OTP_USER_DATA.tokenData,
            personalData: {
              ...FULL_OTP_USER_DATA.tokenData.personalData,
              citizenship: COUNTRY_CODES.russia + 1,
            },
          },
        });
        await setOtpHeaderFormData(CTX_OTP, mockNext);

        expect(mockOtpError).toHaveBeenCalledWith({
          message: 'OTP_DATA_EXTRACTION_ERROR_CITIZENSHIP',
          metricStatus: 'unsupported_country',
        });
      });

      describe('AND NODE_ENV is "production"', () => {
        beforeEach(() => {
          process.env = { ...process.env, NODE_ENV: 'production' };
        });

        it('AND "decryptSignedJwtPayload" return jwePayload with expired token MUST throw error', async () => {
          mockDecryptSignedJwtPayload.mockResolvedValue(FULL_OTP_USER_DATA);
          await setOtpHeaderFormData(CTX_OTP, mockNext);

          expect(mockOtpError).toHaveBeenCalledWith({
            message: 'OTP_DATA_EXTRACTION_ERROR_TOKEN_EXPIRED',
            metricStatus: 'token_expired',
          });
        });

        it('AND "decryptSignedJwtPayload" return correct jwePayload MUST not throw error', async () => {
          mockDecryptSignedJwtPayload.mockResolvedValue({ ...FULL_OTP_USER_DATA, exp: (Date.now() - 1) / 1000 });
          await setOtpHeaderFormData(CTX_OTP, mockNext);

          expect(mockOtpError).not.toHaveBeenCalled();
        });
      });
    });
  });
});
