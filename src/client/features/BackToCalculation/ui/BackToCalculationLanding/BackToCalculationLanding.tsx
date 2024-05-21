import type { CardProps } from '@sravni/react-design-system/dist/types/components/Card';
import { useIsMobile } from '@sravni/react-utils';
import React, { useCallback, useEffect } from 'react';

import { CustomRouter } from 'shared/config/router';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventCalculation, sendEventLandingShowPolicies } from 'shared/lib/sendGAEvents';

import { decodeCalculationHash } from '../../lib/decodeCalculationHash';
import { mapCalculationsForAnalytic } from '../../lib/mapCalculationsForAnalytic';
import { previousCalculationsDependOnCurrentVehicleTypeSelector } from '../../model/BackToCalculation.selector';
import { BackToCalculation } from '../BackToCalculation';

export const BackToCalculationLanding: FC<{
  color?: CardProps['color'];
  isCalculationsLoading: boolean;
}> = ({ color, isCalculationsLoading }) => {
  const isMobile = useIsMobile();
  const calculations = useAppSelector(previousCalculationsDependOnCurrentVehicleTypeSelector);

  const onClick = useCallback((calcHash: string, regNumber: Nullable<string>) => {
    const hash = decodeCalculationHash(calcHash);
    sendEventCalculation({
      eventLabel: 'Быстрый расчет',
      regNumber: regNumber ?? undefined,
    });
    CustomRouter.push('propositions', { query: { calculationHash: hash } });
  }, []);

  useEffect(() => {
    !isCalculationsLoading &&
      sendEventLandingShowPolicies({
        eventLabelText: 'Показ сохраненных расчетов',
        eventLabelAmount: calculations.length,
        eventValue: mapCalculationsForAnalytic(calculations),
      });
  }, [calculations, isCalculationsLoading]);

  return (
    <BackToCalculation
      isMobile={isMobile}
      calculations={calculations}
      isLoading={isCalculationsLoading}
      onClick={onClick}
      color={color}
    />
  );
};
