import { useBoolean } from '@sravni/react-utils';
import { useMemo } from 'react';

import type { IBonus } from 'shared/types/BonusesDescription';

import { BonusDetails, PresentBanner } from 'entities/bonus';

import { MoreBtn } from '../MoreBtn';

interface IPresentModalBanner {
  alert: {
    code?: string;
    title: string;
    subtitle: string;
  };
  bonuses: IBonus[];
}

export const PresentModalBanner: FC<IPresentModalBanner> = ({ alert, bonuses }) => {
  const [isVisible, setIsVisible] = useBoolean(false);
  const bonusInfo = useMemo(() => bonuses.find((bonus) => bonus.name === alert?.code), [bonuses, alert?.code]);

  return (
    <>
      <PresentBanner {...alert}>{bonusInfo && <MoreBtn onClick={setIsVisible.on} />}</PresentBanner>
      {bonusInfo && (
        <BonusDetails
          visible={isVisible}
          onClose={setIsVisible.off}
          detail={bonusInfo.detail}
        />
      )}
    </>
  );
};
