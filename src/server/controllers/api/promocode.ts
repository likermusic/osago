import { checkPromoRequest } from '../../services/promocode';

export const checkPromo = async (ctx: App.ExtendedContext) => {
  const { promocode } = ctx.request.body;

  ctx.body = await checkPromoRequest(promocode);
};
