import type { IReviewsApi } from 'commonTypes/insuranceCompanies';

export const collectReviews = (items: IReviewsApi['items']) => {
  const locations: Record<string, boolean> = {};
  const companies: Record<string, boolean> = {};

  items?.forEach((item) => {
    if (item.locationId) {
      locations[item.locationId] = true;
    }

    if (item.reviewObjectId) {
      companies[item.reviewObjectId] = true;
    }
  });

  return {
    locations: Object.keys(locations),
    companies: Object.keys(companies),
  };
};
