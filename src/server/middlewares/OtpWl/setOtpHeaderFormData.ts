import logger from '@sravni/server-utils/lib/logger';
import Metrics from '@sravni/server-utils/lib/metrics';
import millisecondsToSeconds from 'date-fns/millisecondsToSeconds';
import type { Next } from 'koa';

import { PARTNERS_IDS } from '../../../constants/partners';
import { isDevelopment } from '../../constants/isDevelopment';

import { COUNTRY_CODES } from './constants';
import { decryptSignedJwtPayload } from './decryptSignedJwtPayload';
import { getAccessToken } from './getAccessToken';
import { isOtpTokenPayload } from './isOtpTokenPayload';
import { mapOtpDataToQuery } from './mapOtpDataToQuery';
import { OtpError } from './OtpError';

const metrics = new Metrics();
const optTokenMetric = metrics.counter(`otp_token_status`, 'Otp header token statuses', ['status']);

const setClientIdToRequest = (clientId: string, ctx: App.ExtendedContext) => {
  const wl = ctx.req.__WL__ ?? {};

  ctx.req.__WL__ = {
    ...wl,
    analytics: {
      ...wl?.analytics,
      affSub3: clientId,
    },
  };
};

// Дока https://sravni-corp.atlassian.net/wiki/spaces/OSAGO/pages/382763517
export const setOtpHeaderFormData = async (ctx: App.ExtendedContext, next: Next) => {
  if (ctx.req.__WL__?.partnerId === PARTNERS_IDS.otp) {
    const jwe = getAccessToken(ctx.req.headers.authorization);
    const jwePrivateKey = process.env.OTP_BANK_JWE_PRIVATE_KEY;

    let payload = null;
    try {
      if (!jwePrivateKey) {
        throw new OtpError({ message: 'OTP_JWE_PRIVATE_KEY_NOT_FOUND', metricStatus: 'jwePrivateKey_not_found' });
      }
      payload = await decryptSignedJwtPayload(jwe, jwePrivateKey);
      if (!isOtpTokenPayload(payload)) {
        throw new OtpError({ message: 'OTP_DATA_EXTRACTION_ERROR_PAYLOAD', metricStatus: 'incorrect_payload' });
      }
      const clientId = payload?.tokenData?.clientId;
      if (!clientId) {
        throw new OtpError({ message: 'OTP_DATA_EXTRACTION_ERROR_CLIENT_ID', metricStatus: 'wrong_client_id' });
      }
      if (payload.tokenData?.personalData?.citizenship !== COUNTRY_CODES.russia) {
        throw new OtpError({ message: 'OTP_DATA_EXTRACTION_ERROR_CITIZENSHIP', metricStatus: 'unsupported_country' });
      }
      if (!isDevelopment && millisecondsToSeconds(Date.now()) > payload.exp) {
        throw new OtpError({ message: 'OTP_DATA_EXTRACTION_ERROR_TOKEN_EXPIRED', metricStatus: 'token_expired' });
      }

      ctx.req.__FORM_OTP_DATA__ = mapOtpDataToQuery(payload.tokenData);

      logger.error({
        message: 'OTP_DATA_EXTRACTION_SUCCESS',
        meta: { authHeader: ctx.req.headers.authorization, jwe },
      });

      optTokenMetric.inc({ status: 'success' });

      setClientIdToRequest(clientId, ctx);
    } catch (error) {
      logger.error({
        message: error.message || 'OTP_DATA_EXTRACTION_ERROR',
        meta: { error, authHeader: ctx.req.headers.authorization, jwe, payload },
      });

      optTokenMetric.inc({ status: error.metricStatus || 'incorrect_token' });
    }
  }

  return next();
};
