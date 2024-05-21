import type { SliceStateFromReducer } from 'shared/types';

import type { reviewsSlice } from './reviews.slice';

type TReviewsState = SliceStateFromReducer<typeof reviewsSlice>;

export const reviewsSelector = (state: TReviewsState) => state.reviews;
