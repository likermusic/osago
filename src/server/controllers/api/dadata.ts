import type { DaData } from '../../../types/dadata';
import { getAddress, getHostingsRequest } from '../../services/daData';
import { getBodyFromKoaContext } from '../../utils/getParamsFromContext';

export const getAddresses = async (ctx: App.ExtendedContext) => {
  const body = getBodyFromKoaContext<DaData.AddressesRequests>(ctx);

  ctx.body = await getAddress(body);
};

export const getHostings = async (ctx: App.ExtendedContext) => {
  ctx.body = await getHostingsRequest();
};
