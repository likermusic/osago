import { Space } from '@sravni/react-design-system';
import React from 'react';

import type { IOfferTag } from 'shared/types';
import type { IBonus } from 'shared/types/BonusesDescription';

import { SmartTag } from '../SmartTag/SmartTag';

type TSmartTagList = {
  bonuses: IBonus[] | undefined;
  tags: IOfferTag[];
};

const EMPTY_BONUS_LIST: IBonus[] = [];

export const SmartTagList: FC<TSmartTagList> = ({ bonuses, className, tags }) =>
  tags?.length > 0 ? (
    <Space
      className={className}
      size={4}
    >
      {tags.map((absoluteTag) => (
        <SmartTag
          key={absoluteTag.text}
          {...absoluteTag}
          bonuses={bonuses ?? EMPTY_BONUS_LIST}
        />
      ))}
    </Space>
  ) : null;
