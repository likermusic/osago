import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

import { isFaq } from '../lib/isFaq';
import { isHTML } from '../lib/isHTML';

import type { metadataSlice } from './metadata.slice';

type TMetadataState = SliceStateFromReducer<typeof metadataSlice>;

export const metadataSelector = (state: TMetadataState) => state.metadata;

// TODO: OS-6732 поправить типизацию, ошибка так как раньше state был незатипизирован
// @ts-ignore
export const seoFaqSelector = createSelector(metadataSelector, (metadata) => metadata?.contentBlocks?.find(isFaq));
// @ts-ignore
export const seoCoeffsSelector = createSelector(metadataSelector, (metadata) => metadata?.contentBlocks?.find(isHTML));
