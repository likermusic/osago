export type TMarketingInfoBanner = {
  imageUrl: string;
  description: string[];
  durationInSeconds: number;
};

export type TMarketingInfoReview = {
  name: string;
  rating: number;
  text: string;
};

export type TMarketingInfo = {
  banners: TMarketingInfoBanner[];
  reviews: TMarketingInfoReview[];
};
