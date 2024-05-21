import { Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import React, { useCallback, useState } from 'react';

import { FlowType } from 'shared/config/FlowType';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventCalculation, sendEventRaffleLanding } from 'shared/lib/sendGAEvents';

import type { CarNumberLandingFormFields } from 'entities/carInfo';

import { BackToCalculationLanding } from 'features/BackToCalculation';
import { useGetPreviousCalculationsAndPolicies } from 'features/getPreviousCalculationsAndPolicies';

import { showBackToCalculationSelector } from 'widgets/CalculationWidget/model/CalculationWidget.selectors';

import { useDisableBackForwardCache } from '../../lib/useDisableBackForwardCache/useDisableBackForwardCache';
import { CarNumberBlock } from '../CarNumberBlock';

import styles from './RaffleCalculationWidget.module.scss';
import { CarNumberBlockTexts, RaffleCalculationWidgetTexts } from './RaffleCalculationWidget.texts';

export const RaffleCalculationWidget: FC<{ subtitle: string }> = ({ subtitle }) => {
  const isMobile = useIsMobile();
  useDisableBackForwardCache();

  const [flowType, setFlowType] = useState<FlowType>(FlowType.Calculation);

  const shouldShowLastSearches = useAppSelector(showBackToCalculationSelector(flowType));

  const { isPreviousCalculationsLoading } = useGetPreviousCalculationsAndPolicies();

  const changeFlowType = useCallback((newValue: string | number) => {
    const storeValue = newValue === FlowType.Calculation ? FlowType.Calculation : FlowType.Prolongation;
    setFlowType(storeValue);
  }, []);

  const sendOnSubmitAnalytic = useCallback((values: CarNumberLandingFormFields) => {
    sendEventCalculation({
      eventLabel: 'По номеру',
      regNumber: values.carNumber,
    });
    sendEventRaffleLanding({ place: 'Купить ОСАГО' });
  }, []);

  return (
    <Space
      direction="vertical"
      align="center"
      className={styles.wrapper}
    >
      <Typography.Heading
        level={2}
        className="h-mb-8"
      >
        {RaffleCalculationWidgetTexts.title}
      </Typography.Heading>
      <Typography.Text
        size={isMobile ? 14 : 16}
        className={cn('h-text-center', { 'h-mb-16': isMobile, 'h-mb-32': !isMobile })}
      >
        {subtitle}
      </Typography.Text>

      <Space
        direction="vertical"
        size={12}
      >
        {shouldShowLastSearches && <BackToCalculationLanding isCalculationsLoading={isPreviousCalculationsLoading} />}

        <Card className={styles.calculationToggleCard}>
          <CarNumberBlock
            btnCalculateTitle={CarNumberBlockTexts.btnCalculateTitle}
            flowType={flowType}
            changeFlowType={changeFlowType}
            onSubmitCallback={sendOnSubmitAnalytic}
          />
        </Card>
      </Space>
    </Space>
  );
};
