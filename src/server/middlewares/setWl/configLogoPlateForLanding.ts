import { plateDisclaimers } from './config';

export const configLogoPlateForLanding = (ctx: App.ExtendedContext) => ({
  disclaimerText: plateDisclaimers,
  showLandingPlate: ctx.query.noHeader !== 'true',
});
