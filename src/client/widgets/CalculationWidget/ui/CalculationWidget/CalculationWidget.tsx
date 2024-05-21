import { Card, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import { useCallback, useMemo, useState } from 'react';

import { FlowType } from 'shared/config/FlowType';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventCalculation } from 'shared/lib/sendGAEvents';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import { isUserLoggedInSelector } from 'entities/user';

import { AuthenticationFormWithDefaults } from 'features/Authentication';
import { BackToCalculationLanding } from 'features/BackToCalculation';
import { CalculationProlongationToggle } from 'features/CalculationProlongationToggle';
import { useGetPreviousCalculationsAndPolicies } from 'features/getPreviousCalculationsAndPolicies';
import { ProlongationController } from 'features/Prolongation';

import {
  isHasProlongationPolicesSelector,
  showBackToCalculationSelector,
} from 'widgets/CalculationWidget/model/CalculationWidget.selectors';

import { useDisableBackForwardCache } from '../../lib/useDisableBackForwardCache/useDisableBackForwardCache';
import { CarNumberBlock } from '../CarNumberBlock';
import { StickyBar } from '../StickyBar';

import styles from './CalculationWidget.module.scss';

export const CalculationWidget: FC<{ vehicleTypeUi: VehicleType }> = ({ vehicleTypeUi }) => {
  const isMobile = useIsMobile();
  useDisableBackForwardCache();

  const [flowType, setFlowType] = useState<FlowType>(FlowType.Calculation);
  const isCalculationFlow = useMemo(() => flowType === FlowType.Calculation, [flowType]);

  const { isPreviousCalculationsLoading, isFetchingPreviousPolicies } = useGetPreviousCalculationsAndPolicies();

  const isLoggedUser = useAppSelector(isUserLoggedInSelector);
  const shouldShowLastSearches = useAppSelector(showBackToCalculationSelector(flowType));
  const isHasProlongation = useAppSelector(isHasProlongationPolicesSelector);

  const changeFlowType = useCallback((newValue: string | number) => {
    const storeValue = newValue === FlowType.Calculation ? FlowType.Calculation : FlowType.Prolongation;
    setFlowType(storeValue);
  }, []);

  const sendOnSubmitAnalytic = useCallback((values: CarNumberLandingFormFields) => {
    sendEventCalculation({
      eventLabel: 'По номеру',
      regNumber: values.carNumber,
    });
  }, []);

  const ProlongationComponent = isLoggedUser ? (
    <ProlongationController
      changeFlowType={changeFlowType}
      isFetchingPreviousPolicies={isFetchingPreviousPolicies}
    />
  ) : (
    <AuthenticationFormWithDefaults variant="form" />
  );

  const renderContent = (
    <StickyBar
      flowType={flowType}
      changeFlowType={changeFlowType}
      onSubmitCallback={sendOnSubmitAnalytic}
    >
      <Space
        direction="vertical"
        size={16}
      >
        <CalculationProlongationToggle
          value={flowType}
          onChange={changeFlowType}
          shouldShowBadge={isHasProlongation}
        />

        {shouldShowLastSearches && (
          <BackToCalculationLanding
            color={isMobile ? 'dark' : 'light'}
            isCalculationsLoading={isPreviousCalculationsLoading}
          />
        )}

        <Card className={styles.calculationToggleCard}>
          {isCalculationFlow && (
            <div>
              <CarNumberBlock
                vehicleTypeUi={vehicleTypeUi}
                flowType={flowType}
                changeFlowType={changeFlowType}
                onSubmitCallback={sendOnSubmitAnalytic}
              />
            </div>
          )}

          {!isCalculationFlow && <div>{ProlongationComponent}</div>}
        </Card>
      </Space>
    </StickyBar>
  );

  return isMobile ? <Card size={16}>{renderContent}</Card> : renderContent;
};
