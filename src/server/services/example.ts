import type { SEOAndSettings } from 'commonTypes/api/SEOAndSettings';

type TExample = {
  name: string;
};

export const find = async (): Promise<SEOAndSettings.IListResponse<TExample>> => ({
  items: [
    {
      name: 'Example',
    },
  ],
});
