import { Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import { useCallback, useEffect } from 'react';

import { FlowType } from 'shared/config/FlowType';
import { CustomRouter } from 'shared/config/router';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventCalculation, sendEventLandingShowPolicies } from 'shared/lib/sendGAEvents';

import ProlongationIcon from '../assets/prolongationIcon.svg';
import { decodeProlongationHash } from '../lib/decodeProlongationHash';
import { policiesResultDependOnCurrentVehicleTypeSelector } from '../model/Prolongation.selectors';

import { Prolongation } from './Prolongation';
import { prolongationTexts } from './Prolongation.texts';
import style from './ProlongationController.module.scss';
import { ProlongationSkeleton } from './ProlongationSkeleton/ProlongationSkeleton';

interface ProlongationControllerProps {
  changeFlowType: (value: string) => void;
  isFetchingPreviousPolicies: boolean;
}

export const ProlongationController: FC<ProlongationControllerProps> = ({
  changeFlowType,
  isFetchingPreviousPolicies,
}) => {
  const allPolicies = useAppSelector(policiesResultDependOnCurrentVehicleTypeSelector);
  const isMobile = useIsMobile();

  const onClick = useCallback((calcHash: string) => {
    const hash = decodeProlongationHash(calcHash);

    sendEventCalculation({
      eventLabel: 'Быстрое продление',
    });
    CustomRouter.push('propositions', { query: { prolongationHash: hash } });
  }, []);

  const onBtnClick = useCallback(() => {
    changeFlowType(FlowType.Calculation);
  }, [changeFlowType]);

  const isLoading = isFetchingPreviousPolicies && !allPolicies.length;

  useEffect(() => {
    !isLoading &&
      sendEventLandingShowPolicies({
        eventLabelText: 'Показ полисов к продлению',
        eventLabelAmount: allPolicies.length,
        eventValue: allPolicies.map((police) => police.regNumber ?? undefined),
      });
  }, [allPolicies, isLoading]);

  if (isLoading) {
    return <ProlongationSkeleton />;
  }
  return allPolicies.length > 0 ? (
    <Space
      size={16}
      className={style.cardContainer}
    >
      {allPolicies.map((policy) => (
        <Prolongation
          AvatarIcon={policy.AvatarIcon}
          buttonText={prolongationTexts.button.prolongate}
          subtitle={policy.subtitle}
          title={policy.title}
          badges={policy.badges}
          isMobile={isMobile}
          key={policy.orderHash}
          onClick={() => onClick(policy.orderHash)}
        />
      ))}
    </Space>
  ) : (
    <Prolongation
      AvatarIcon={<ProlongationIcon />}
      buttonText={prolongationTexts.button.default}
      subtitle={prolongationTexts.subtitle}
      isMobile={isMobile}
      onClick={onBtnClick}
    />
  );
};
