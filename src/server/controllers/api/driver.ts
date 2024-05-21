import logger from '@sravni/server-utils/lib/logger';
import { md5 } from 'hash-wasm';

import { getDriverKbmRequest } from '../../services/driver/getDriverKbm';

const NO_HASH_IN_REQUEST_ERROR = 'IN_coefficients/kbm_NO_HASH_IN_REQUEST_ERROR';
const HASH_NOT_EQUAL_ERROR = 'IN_coefficients/kbm_HASH_NOT_EQUAL_ERROR';

export const getDriverKbm = async (ctx: App.ExtendedContext) => {
  const body = ctx?.request?.body;
  const hashFromRequest = ctx?.request?.query?.hash;

  if (!hashFromRequest) {
    ctx.body = { kbm: 0, errorMessage: NO_HASH_IN_REQUEST_ERROR };

    logger.error({
      message: NO_HASH_IN_REQUEST_ERROR,
      meta: {
        body,
        hashFromRequest,
      },
      request_url: 'OSAGOGATEWAY/coefficients/kbm',
    });

    return;
  }

  const saltAutoInfo = process.env.SALT_AUTO_INFO;
  const hash = await md5(`${body.driver?.license?.number}${saltAutoInfo}`);

  if (hashFromRequest !== hash) {
    ctx.body = { kbm: 0, errorMessage: HASH_NOT_EQUAL_ERROR };

    logger.error({
      message: HASH_NOT_EQUAL_ERROR,
      meta: {
        body,
        hashFromRequest,
        hash,
      },
      request_url: 'OSAGOGATEWAY/coefficients/kbm',
    });

    return;
  }

  ctx.body = await getDriverKbmRequest(body);
};
