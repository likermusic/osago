import type { Marketing } from 'commonTypes/api/marketing';

import { mapMarketingInfoResponse } from '../mapMarketingInfoResponse';
import { DEFAULT_BANNERS } from '../marketingInfo.constants';

describe('WHEN "mapMarketingInfoResponse" is called', () => {
  it.each([undefined, null, [[null]], [[undefined]], [['']], [[{}]], {}, [], { marketingBanners: [] }])(
    'AND data was not correct as %p, MUST return initial array',
    (info) => {
      expect(mapMarketingInfoResponse(info as unknown as Marketing.GetMarketingInfoResponse)).toEqual({
        banners: DEFAULT_BANNERS,
        reviews: [],
      });
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(
      mapMarketingInfoResponse({
        marketingBanners: [
          {
            imageUrl: '',
            description: [''],
            durationInSeconds: 0,
          },
        ],
        marketingReviews: {
          reviews: [
            {
              name: '',
              rating: 1,
              text: '',
            },
          ],
        },
      }),
    ).toEqual({
      banners: [
        {
          imageUrl: '',
          description: [''],
          durationInSeconds: 0,
        },
      ],
      reviews: [
        {
          name: '',
          rating: 1,
          text: '',
        },
      ],
    });
  });

  it('AND data was not fully provided, MUST return with nullable data', () => {
    expect(
      mapMarketingInfoResponse({
        marketingBanners: [
          {
            imageUrl: null,
            description: null,
          },
        ],
        marketingReviews: {
          reviews: [
            {
              name: null,
              text: null,
            },
          ],
        },
      }),
    ).toEqual({
      banners: [
        {
          imageUrl: '',
          description: [],
          durationInSeconds: 0,
        },
      ],
      reviews: [
        {
          name: '',
          rating: 0,
          text: '',
        },
      ],
    });
  });
});
