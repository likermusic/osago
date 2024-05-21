import type {
  BadgeColor,
  BadgeVariant,
} from '@sravni/react-design-system/dist/types/components/Badge/types/Badge.types';
import { isDefined } from '@sravni/react-utils';

import type { ApiSchemas } from 'commonTypes/api/ApiSchemas';

import type { IOfferTag } from '../../types';
import { getSravniAwardTagIfHasAward } from '../getSravniAwardTagIfHasAward';

export const mapTags = (tags?: ApiSchemas.IUpperTag[]): IOfferTag[] =>
  tags?.map((tag) => ({
    code: tag?.code ?? undefined,
    color: tag?.color?.toLowerCase() as BadgeColor,
    isTooltip: !!tag?.text,
    variant: tag?.colorVariant?.toLowerCase() as BadgeVariant,
    title: tag?.title ?? undefined,
    text: tag?.text ?? undefined,
    type: tag?.type ?? 'None',
  })) ?? [];

export const mapTagsAndAddAwards = (
  tags: ApiSchemas.IUpperTag[] | undefined,
  companyId: number | undefined,
): IOfferTag[] => [getSravniAwardTagIfHasAward(companyId), ...mapTags(tags)].filter(isDefined);
