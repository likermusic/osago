import { useEffect } from 'react';

import type { FormStepId } from 'shared/config/formStepId';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { WIDGET_BLOCKS_ANALYTIC } from '../../ui/AnketaWidget.config';

export const useAnketaAnalytic = (formId: FormStepId | undefined) => {
  const sendAnalyticsEvent = useGetSendAnalytics();

  useEffect(() => {
    const event = formId && WIDGET_BLOCKS_ANALYTIC[formId];

    if (event) sendAnalyticsEvent(event);
  }, [formId, sendAnalyticsEvent]);
};
