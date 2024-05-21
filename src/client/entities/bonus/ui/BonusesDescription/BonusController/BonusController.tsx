import { useBoolean } from '@sravni/react-utils';
import React from 'react';

import { sendInsuranceInfoClick } from 'shared/lib/sendGAEvents';
import type { IBonus } from 'shared/types/BonusesDescription';

import { BonusCard } from '../BonusCard';
import { BonusDetails } from '../BonusDetails';

const sendInsuranceInfoClickScope = sendInsuranceInfoClick();

export const BonusController: FC<IBonus> = ({ detail, ...props }) => {
  const [isVisible, setIsVisible] = useBoolean(false);

  const handleClick = () => {
    setIsVisible.on();
    sendInsuranceInfoClickScope({ giftName: props.name });
  };

  return (
    <>
      <BonusCard
        {...props}
        onClick={handleClick}
      />
      <BonusDetails
        detail={detail}
        visible={isVisible}
        onClose={setIsVisible.off}
      />
    </>
  );
};
