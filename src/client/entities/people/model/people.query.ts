import type { Profile } from 'commonTypes/api/profile';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapPeople } from '../lib/mapPeople';
import type { TPerson } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    postPeople: build.query<TPerson[], void>({
      query: () => ({
        url: BFF_API_ROUTES.postPeople,
        method: 'POST',
      }),
      transformResponse: (response: Profile.PostPeopleResponse) => mapPeople(response),
    }),
  }),
});

export const useLazyPostPeople = queries.useLazyPostPeopleQuery;
