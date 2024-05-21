import { useAbTestingSdk } from '@sravni/react-utils';
import { useMemo } from 'react';

import { B_VARIANT_VALUE, TEST_ANKETA_CONTACT_NUMBER } from 'shared/config/anketaContactAb';
import { useAppSelector } from 'shared/lib/redux';

import { defaultStepperConfigSelector } from '../../model/AnketaWidget.selectors';
import type { IStepperFormsSet } from '../../types';
import { recalculateSteps } from '../index';

export const useStepper = (steps?: IStepperFormsSet) => {
  const defaultSteps = useAppSelector(defaultStepperConfigSelector);
  const defaultedSteps = steps || defaultSteps;
  const abTestingSdk = useAbTestingSdk();
  const isBVariant = abTestingSdk.checkExperimentVariant(TEST_ANKETA_CONTACT_NUMBER, B_VARIANT_VALUE);

  return useMemo(() => recalculateSteps(defaultedSteps, isBVariant), [defaultedSteps, isBVariant]);
};
