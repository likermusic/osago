import type { Marketing } from 'commonTypes/api/marketing';

import type { TMarketingInfo } from '../types';

import { DEFAULT_BANNERS } from './marketingInfo.constants';

export const mapMarketingInfoResponse = (info?: Marketing.GetMarketingInfoResponse): TMarketingInfo => ({
  banners: info?.marketingBanners?.length
    ? info.marketingBanners.map((banner) => ({
        imageUrl: banner.imageUrl ?? '',
        description: banner.description ?? [],
        durationInSeconds: banner.durationInSeconds ?? 0,
      }))
    : DEFAULT_BANNERS,
  reviews: info?.marketingReviews?.reviews
    ? info.marketingReviews.reviews.map((review) => ({
        name: review.name ?? '',
        rating: review.rating ?? 0,
        text: review.text ?? '',
      }))
    : [],
});
