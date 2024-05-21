import logger from '@sravni/server-utils/lib/logger';

export function logMessage(message: string, data: string | Record<string, unknown> | Error) {
  let meta: Record<string, unknown> = {};

  if (data instanceof Error) {
    meta = { msg: data.message };
  } else if (typeof data === 'string') {
    meta = { msg: data };
  } else {
    meta = data;
  }

  if (typeof data === 'string') {
    meta = { msg: data };
  }

  logger.log({
    level: 'info',
    message,
    meta,
  });
}
