import * as prolongationService from '../../services/prolongation';
import { getCookie, readUTMCookie } from '../../utils/analytics';

export const findProlongationByCarNumber = async (ctx: App.ExtendedContext) => {
  const req = ctx.request.body;

  ctx.body = await prolongationService.findProlongationByCarNumber(
    req.carNumber,
    ctx.user?.phone_number,
    readUTMCookie(getCookie(ctx)),
  );
};
