import { findRegionalCentersWithCache } from '../../services/locations';
import { findAllIndexedUrlsMeta } from '../../services/metadata';

export const getRegionalCenters = async (ctx: App.ExtendedContext) => {
  ctx.body = await findRegionalCentersWithCache();
};

export const getIndexedLocations = async (ctx: App.ExtendedContext) => {
  ctx.body = await findAllIndexedUrlsMeta('/osago/');
};
