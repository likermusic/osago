import withMemoryCache from '@sravni/server-utils/lib/utils/withMemoryCache';
import trimHtml from 'trim-html';

import type { LandingReviewItem } from 'commonTypes/insuranceCompanies';

import { getMobileLogoLinkFromCompanyId } from '../../../../commonUtils/getLogoLinkFromCompanyId';
import { findAllLocationsByProvidedIds } from '../../locations/locations';
import { getInsuranceCompaniesByIds } from '../insuranceCompanies/insuranceCompaniesServices';

import { getReviews } from './getReviews';
import { collectReviews } from './utils/collectReviews';
import { convertCompaniesToMap } from './utils/convertCompaniesToMap';
import { convertLocationToMap } from './utils/convertLocationToMap';

export const insuranceCompaniesReviews = withMemoryCache(
  async (locationId?: string, companyId?: string): Promise<LandingReviewItem[]> => {
    const { items } = await getReviews(locationId, companyId);

    if (!items) {
      return [];
    }

    const reviewsSettings = collectReviews(items);

    const [locations, companies] = await Promise.all([
      findAllLocationsByProvidedIds(reviewsSettings.locations),
      getInsuranceCompaniesByIds(reviewsSettings.companies),
    ]);

    const locationsHashMap = convertLocationToMap(locations);
    const companiesHashMap = convertCompaniesToMap(companies);

    return items.map(({ id, text, reviewObjectId, locationId: itemLocationId, rating, title, authorName }) => {
      const company = reviewObjectId ? companiesHashMap[parseInt(reviewObjectId, 10)] : null;

      return {
        title: title || '',
        companyName: company?.name || '',
        city: itemLocationId ? locationsHashMap[itemLocationId]?.name : null,
        comment: trimHtml(text || '', { limit: 150, suffix: '...' }).html,
        name: authorName || '',
        rating: rating || 5,
        reviewLink: company ? `/strakhovaja-kompanija/${company.alias}/otzyv/${id}` : '/strakhovye-kompanii/otzyvy/',
        companyLogoLink: company?.id ? getMobileLogoLinkFromCompanyId(company.id) : '',
      };
    });
  },
  { fnKey: 'insuranceCompaniesReviews' },
);
