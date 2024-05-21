import type { AnketaScrollingLabels } from 'shared/lib/usePageScroll';

export const SUMMARY_NAV_BLOCK_ID_MAP: Record<string, Nullable<keyof typeof AnketaScrollingLabels>> = {
  '1': 'Driver',
  '2': 'DND',
  '3': null,
  '4': 'CarInsurer',
};
