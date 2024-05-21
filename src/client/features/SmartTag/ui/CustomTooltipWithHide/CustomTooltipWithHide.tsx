import { withoutPropagation } from '@sravni/cosago-react-library/lib/utils';
import { useBoolean } from '@sravni/react-utils';
import { useMemo } from 'react';

import type { IOfferTag } from 'shared/types';
import type { IBonus } from 'shared/types/BonusesDescription';
import { OfferTag } from 'shared/ui';

import { BonusDetails } from 'entities/bonus';

import { OpenModalBtn } from '../OpenModalBtn/OpenModalBtn';

interface ICustomTooltipWithHide extends IOfferTag {
  bonuses: IBonus[];
}

export const CustomTooltipWithHide: FC<ICustomTooltipWithHide> = ({ bonuses, code, ...props }) => {
  const [isVisible, setIsVisible] = useBoolean(false);
  const bonusInfo = useMemo(() => bonuses.find((bonus) => bonus.name === code), [bonuses, code]);
  return (
    <>
      {/* Скрываем тултип чтоб он не мешал модалке */}
      {!isVisible && (
        <OfferTag
          {...props}
          footer={bonusInfo ? <OpenModalBtn onClick={setIsVisible.on} /> : undefined}
          width={300}
        />
      )}

      {bonusInfo && (
        <BonusDetails
          detail={bonusInfo.detail}
          visible={isVisible}
          onClose={withoutPropagation(setIsVisible.off)}
        />
      )}
    </>
  );
};
