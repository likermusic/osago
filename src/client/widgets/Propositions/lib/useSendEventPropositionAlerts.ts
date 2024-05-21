import { useEffect } from 'react';

import { sendEventPropositionAlerts } from 'shared/lib/sendGAEvents';
import type { ICalculationProposition, IOrderProposition } from 'shared/types';

import type { PropositionCalculationsState } from 'entities/propositionCalculations';

type TSendEventPropositionAlertsScope = (color: string, companyName: string, title: string) => void;
const findAlertsInProposition = (
  proposition: ICalculationProposition | IOrderProposition,
  sendEventPropositionAlertsScope: TSendEventPropositionAlertsScope,
) => {
  proposition.alerts.forEach(
    (alert) =>
      proposition?.company?.companyName &&
      sendEventPropositionAlertsScope(
        String(alert.color),
        proposition?.company?.companyName,
        alert.title || alert.subtitle,
      ),
  );
};

const findAlertsInPropositions = (
  propositions: ICalculationProposition[] | IOrderProposition[],
  sendEventPropositionAlertsScope: TSendEventPropositionAlertsScope,
) => {
  propositions?.forEach((proposition) => findAlertsInProposition(proposition, sendEventPropositionAlertsScope));
};
const sendEventPropositionAlertsScope = sendEventPropositionAlerts();

export const useSendEventPropositionAlerts = (data: PropositionCalculationsState | undefined) => {
  useEffect(() => {
    if (!data) return;
    findAlertsInPropositions(data?.propositions, sendEventPropositionAlertsScope);
    data?.orderInfo && findAlertsInProposition(data?.orderInfo, sendEventPropositionAlertsScope);
  }, [data]);
};
