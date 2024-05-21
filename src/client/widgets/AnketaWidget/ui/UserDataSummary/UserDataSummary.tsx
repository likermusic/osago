import { Accordion, Skeleton, Space, Spinner, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import type { ReactNode } from 'react';
import React, { useCallback } from 'react';

import type { FormStepId } from 'shared/config/formStepId';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataVisibility } from 'shared/lib/sendGAEvents';
import { SUMMARY_ACCORDION_ID } from 'shared/lib/usePageScroll';
import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';

import { restorePreviousPolicyThunk } from 'widgets/AnketaWidget/model/restorePreviosPolicyThunk';

import { useLoadPeople, useStepper, useDataChanged } from '../../lib';
import { userDataSummarySubtitleSelector } from '../../lib/userDataSummarySubtitleSelector';
import type { IMultipartOrderStep, IOrderedStep, IStepperFormsSet } from '../../types';
import { WIDGET_BLOCKS } from '../AnketaWidget.config';

import styles from './UserDataSummary.module.scss';
import { UserDataSummaryTexts } from './UserDataSummary.texts';

interface IUserDataSummary {
  isOpened: boolean;
  isLoading: boolean;
  /**
   * Указывает, место в которое браузер проскролит пользователя
   * Если есть на странице - аккордион открыт
   * */
  scrollId?: string;
  onDataChanged: () => void;
  toggleIsOpened: (val: boolean) => void;
  customTitle?: string;
  customSubtitle?: string;
  isExtendedData?: boolean;
  steps?: IStepperFormsSet;
}

export const UserDataSummary: FC<IUserDataSummary> = ({
  scrollId,
  isLoading,
  isOpened,
  toggleIsOpened,
  onDataChanged,
  customTitle,
  customSubtitle,
  isExtendedData,
  steps,
}) => {
  const subtitle = useAppSelector((state) => userDataSummarySubtitleSelector(state));
  const { stepsWithMultiStepsOrder, activeStep } = useStepper(steps);
  useLoadPeople();
  const dispatch = useAppDispatch();
  const onFormSubmit = useDataChanged(onDataChanged);

  const restorePreviousHolder = useCallback(() => {
    dispatch(restorePreviousPolicyThunk());
  }, [dispatch]);

  const isMobile = useIsMobile();

  const getStep = useCallback(
    (step: IOrderedStep): ReactNode => {
      const Component = WIDGET_BLOCKS[step.formId as FormStepId];

      const isFormForceOpened = activeStep?.formId === step.formId;

      if ('multipartFormId' in step) {
        const isMultipartFormOpen = step.stepIndex === activeStep?.stepIndex;
        return (
          <Component
            onFormSubmit={onFormSubmit}
            shouldHideDividers
            key={`${step.formId}-${step.multipartFormId}-${step.stepIndex}`}
            isFormForceOpened={isFormForceOpened && isMultipartFormOpen}
            shouldForceOpenPopup
            multipartFormId={(step as IMultipartOrderStep).multipartFormId}
            isOpen={false}
            isSummary
            isExtendedData={isExtendedData}
          />
        );
      }

      return (
        <Component
          onFormSubmit={onFormSubmit}
          multipartFormId=""
          shouldHideDividers
          key={step.formId}
          isOpen={false}
          isFormForceOpened={isFormForceOpened}
          shouldForceOpenPopup
          onPopupClose={() => (step.formId === 'policyHolder' ? restorePreviousHolder() : undefined)}
          isExtendedData={isExtendedData}
        />
      );
    },
    [activeStep?.formId, activeStep?.stepIndex, onFormSubmit, isExtendedData, restorePreviousHolder],
  );

  if (isLoading) {
    return (
      <DeviceSizedCard
        className={styles.accordion}
        vertical
      >
        {isOpened ? (
          <Space
            justify="center"
            align="center"
            className={styles.loader}
          >
            <Spinner size={20} />
          </Space>
        ) : (
          <>
            <Typography.Text
              className="h-mb-8"
              strong
            >
              {customTitle || UserDataSummaryTexts.caption}
            </Typography.Text>
            <Skeleton className={styles.loaderSkeleton}>
              <Skeleton.Paragraph />
            </Skeleton>
          </>
        )}
      </DeviceSizedCard>
    );
  }

  return (
    <DeviceSizedCard
      className={styles.accordion}
      vertical
    >
      <Accordion
        defaultIndex={isOpened ? [0] : undefined}
        padding={false}
        onChange={(openAccordionItems: number[]) => {
          toggleIsOpened(openAccordionItems.length > 0);
          sendEventSummaryDataVisibility(isOpened ? 'Скрыть' : 'Показать (ручное)');
        }}
        id={SUMMARY_ACCORDION_ID}
      >
        <Accordion.Item
          title={
            <Typography.Text
              strong
              size={16}
            >
              {customTitle || UserDataSummaryTexts.caption}
            </Typography.Text>
          }
          subtitle={!isOpened ? subtitle : customSubtitle}
        >
          <Space
            direction="vertical"
            size={isMobile ? 16 : 24}
            id={scrollId}
            className={isExtendedData ? 'h-pt-12' : ''}
          >
            {stepsWithMultiStepsOrder.map(getStep)}
          </Space>
        </Accordion.Item>
      </Accordion>
    </DeviceSizedCard>
  );
};
