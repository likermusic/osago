import { signin, verify } from '../../services/auth';

export const signinController = async (ctx: App.ExtendedContext) => {
  ctx.body = await signin(ctx);
};

export const verifyController = async (ctx: App.ExtendedContext) => {
  ctx.body = await verify(ctx);
};
