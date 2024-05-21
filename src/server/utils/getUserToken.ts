import type { IUser } from '@sravni/types/lib/auth';
import type { ParameterizedContext } from 'koa';

type IPartialSravniKoaContext = ParameterizedContext<{ user?: IUser }>;

type TAuthHeader = { Authorization: string };

export type AuthorizationHeader = TAuthHeader | undefined;

/**
 * Токен для авторизации с данными пользователя (sub - id пользователя)
 * @param ctx контекст
 */
export function getUserToken(ctx: IPartialSravniKoaContext): AuthorizationHeader {
  return ctx.user ? { Authorization: `Bearer ${ctx.user.access_token}` } : undefined;
}
