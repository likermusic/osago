import { getSeoParamsByAliases } from '@sravni/package-server-utils-insurance/lib/utils';

import { SEO_MATCHER } from '../../../constants/routes';
import { DEFAULT_REGION } from '../../constants/locations';
import { getBrands, getModels } from '../../services/autoInfo';
import { getInsuranceCompanyByAlias } from '../../services/insurance';
import { findRouteByAlias } from '../../services/locations';
import { getLocationSeoParams } from '../../utils/metadata';

import { getOtherPagesSeoParams } from './getOtherPagesSeoParams';

export async function getLandingSeoParams(ctx: App.ExtendedContext) {
  const matchedUrl = SEO_MATCHER.urls.find((url) => ctx.path.match(url));
  const defaultParams = getOtherPagesSeoParams(ctx);

  if (matchedUrl) {
    const params = SEO_MATCHER.paramsExtractor(ctx.path.match(matchedUrl)?.groups);

    const data = await getSeoParamsByAliases({
      params,
      services: {
        getBrandsService: getBrands,
        getCompanyByAliasService: getInsuranceCompanyByAlias,
        getRegionByAliasService: (alias) => findRouteByAlias({ alias }),
        getModelsService: (alias) => getModels(alias),
      },
    });

    return (
      data ?? {
        region: defaultParams.location || getLocationSeoParams(ctx.req.__SELECTED_LOCATION__ || DEFAULT_REGION),
      }
    );
  }

  return {
    car: undefined,
    company: undefined,
    region: defaultParams.location,
  };
}
