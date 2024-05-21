import { DEFAULT_REGION } from '../../constants/locations';
import { getLocationSeoParams } from '../../utils/metadata';

// На страницах отличных от сеошных, надо использовать эту функцию, она более легковесная, чем для СЕО
export function getOtherPagesSeoParams(ctx: App.ExtendedContext) {
  const location = ctx.req.__SELECTED_LOCATION__ || DEFAULT_REGION;
  return {
    url: ctx.path,
    location: getLocationSeoParams(location),
  };
}
