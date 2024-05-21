import { getMarketingInfo as getMarketingInformation } from '../../services/marketing';

export const getMarketingInfo = async (ctx: App.ExtendedContext) => {
  ctx.body = await getMarketingInformation();
};
