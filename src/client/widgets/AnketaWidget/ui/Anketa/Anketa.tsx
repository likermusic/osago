import { Space } from '@sravni/react-design-system';
import { useAbTestingSdk } from '@sravni/react-utils';
import type { ReactNode } from 'react';
import React, { useCallback } from 'react';

import type { FormStepId } from 'shared/config/formStepId';
import { KBM_FIELD_AB_VALUE, KBM_FIELD_B_VARIANT_VALUE } from 'shared/config/kbmFieldAB';
import { useNavigateOnNextStep } from 'shared/lib';
import { useAppDispatch } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { AuthenticationEsia, useEsia } from 'features/AuthenticationEsia';

import { useLoadPeople, useStepper } from '../../lib';
import { submitAnketaThunk } from '../../lib/submitAnketaThunk';
import { useAnketaAnalytic } from '../../lib/useAnketaAnalytic/useAnketaAnalytic';
import type { IMultipartOrderStep, IOrderedStep } from '../../types';
import { WIDGET_BLOCKS } from '../AnketaWidget.config';

import styles from './Anketa.module.scss';

interface IAnketaProps {
  isLoading?: boolean;
}
export const Anketa: FC<IAnketaProps> = ({ isLoading }) => {
  const { activeStep, lastStep, stepsWithMultiStepsOrder } = useStepper();
  const fillFormByEsia = useEsia();
  useLoadPeople(fillFormByEsia);
  const { isNextStepLoading, next } = useNavigateOnNextStep();
  const sendAnalyticsEvent = useGetSendAnalytics();

  useAnketaAnalytic(activeStep?.formId as FormStepId);

  const dispatch = useAppDispatch();

  const onFullySubmitCallback = useCallback(() => {
    sendAnalyticsEvent('osago_contact_step4');

    next('propositions');
  }, [next, sendAnalyticsEvent]);

  const abTestingSdk = useAbTestingSdk();
  const isBVariant = abTestingSdk.checkExperimentVariant(KBM_FIELD_AB_VALUE, KBM_FIELD_B_VARIANT_VALUE);

  const getStep = useCallback(
    (step: IOrderedStep): ReactNode => {
      const Component = WIDGET_BLOCKS[step.formId as FormStepId];
      const isActive = activeStep?.formId === step.formId;
      const isLastStep = lastStep.formId === step.formId;
      const isForceOpenLastStep = isLastStep && !activeStep?.stepIndex;

      if ('multipartFormId' in step) {
        const isOpen =
          (isActive && (activeStep as IMultipartOrderStep).multipartFormId === step.multipartFormId) ||
          isForceOpenLastStep;

        return (
          <Component
            key={`${step.formId}-${step.multipartFormId}`}
            multipartFormId={step.multipartFormId}
            isOpen={isOpen}
            isLoading={isLoading}
            esiaLoginBlock={
              <AuthenticationEsia
                step={step.formId}
                className={styles.esia}
              />
            }
            isFormForceOpened={false}
            shouldForceOpenPopup={false}
            onFormSubmit={(_, isDialog) => {
              dispatch(submitAnketaThunk(isDialog, onFullySubmitCallback));
            }}
            shouldRestoreAdditionalData
            shouldHideDividers={isLastStep}
            shouldShowDriverKbm={isBVariant}
          />
        );
      }
      const isOpen = isActive || isForceOpenLastStep;
      return (
        <Component
          esiaLoginBlock={
            <AuthenticationEsia
              step={step.formId}
              className={styles.esia}
            />
          }
          isFormForceOpened={false}
          shouldForceOpenPopup={false}
          multipartFormId=""
          key={step.formId}
          isOpen={isOpen}
          isLoading={isNextStepLoading || isLoading}
          onFormSubmit={(_, isDialog) => {
            dispatch(submitAnketaThunk(isDialog, onFullySubmitCallback));
          }}
          shouldHideDividers={isLastStep}
          shouldRestoreAdditionalData
          shouldShowDriverKbm={isBVariant}
        />
      );
    },
    [activeStep, lastStep.formId, isNextStepLoading, isLoading, isBVariant, dispatch, onFullySubmitCallback],
  );

  return <Space direction="vertical">{stepsWithMultiStepsOrder.map(getStep)}</Space>;
};
