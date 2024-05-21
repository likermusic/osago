import { useEffect, useState } from 'react';

import { convertToNumber } from 'shared/lib/convertToNumber/convertToNumber';
import { isArrayIncreaseFirstTimeByNumber } from 'shared/lib/isArrayIncreaseFirstTimeByNumber';
import { useAppSelector } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendEventPropositionsShow } from 'shared/lib/sendGAEvents';

import { CALCULATION_FINISHED_STATUS } from '../../constants';
import { propositionCalculationsSelector } from '../../model';
import type { ITransformedGetMultiCalculations } from '../../types';

export const useSendCalculationAnalytics = () => {
  const data = useAppSelector(propositionCalculationsSelector);

  const [previousData, setPreviousData] = useState<ITransformedGetMultiCalculations | null>(null);
  const { propositions, orderInfo, propositionStatus } = data || {};

  const { propositions: previousProposition, orderInfo: previousOrderInfo } = previousData || {};
  const sendAnalyticsEvent = useGetSendAnalytics();

  const previousSuccessPropositionsLength =
    convertToNumber(previousProposition?.length) + convertToNumber(!!previousOrderInfo);
  const payloadSuccessPropositionsLength = convertToNumber(propositions?.length) + convertToNumber(!!orderInfo);

  useEffect(() => {
    const isSuccessIncreaseFirstTimeByNumber = isArrayIncreaseFirstTimeByNumber(
      previousSuccessPropositionsLength,
      payloadSuccessPropositionsLength,
    );

    if (isSuccessIncreaseFirstTimeByNumber(1)) {
      sendEventPropositionsShow({ propositionStatus: 'Успех' });
      sendAnalyticsEvent('osago_calculation_first1_ic');
    }
    if (isSuccessIncreaseFirstTimeByNumber(3)) {
      sendAnalyticsEvent('osago_calculation_first3_ic');
    }
  }, [payloadSuccessPropositionsLength, sendAnalyticsEvent, previousSuccessPropositionsLength]);

  useEffect(() => {
    if (propositionStatus === 'empty') {
      sendEventPropositionsShow({ propositionStatus: 'Расчет недоступен' });
      sendAnalyticsEvent('osago_empty_result_on_calculations');
    }
    if (propositionStatus === 'error') sendEventPropositionsShow({ propositionStatus: 'Ошибка бэка' });

    if (CALCULATION_FINISHED_STATUS.includes(propositionStatus)) {
      sendAnalyticsEvent('osago_calculation_complete');
    }
  }, [propositionStatus, sendAnalyticsEvent]);

  useEffect(() => {
    setPreviousData(data ?? null);
  }, [data]);
};
