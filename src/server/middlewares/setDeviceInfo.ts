import type { Next } from 'koa';

export default function setDeviceInfo(ctx: App.ExtendedContext, next: Next): Promise<void> {
  if (ctx.deviceInfo) {
    ctx.req.__DEVICE_INFO__ = ctx.deviceInfo;
  }

  return next();
}
