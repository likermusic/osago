import { getMetaByProvidedParams, getAllIndexedRegions } from '@sravni/package-server-utils-insurance/lib/services';

import { config } from '../constants/config';

export const findMeta = getMetaByProvidedParams(config.GATEWAY);
export const findAllIndexedUrlsMeta = getAllIndexedRegions(config.METADATA);
