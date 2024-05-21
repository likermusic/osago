export const generateReviewsParams = (locationId?: string, companyId?: string) => ({
  Deleted: 'false',
  GroupedByBanks: 'false',
  LocationId: locationId,
  OrderBy: 'WithRates',
  RateStatus: 'rateApproved',
  Rated: 'good',
  ReviewObjectId: companyId,
  ReviewObjectType: 'insuranceCompany',
  ReviewOnly: 'true',
  ReviewStatus: 'checked',
  Tag: 'osago',
});
