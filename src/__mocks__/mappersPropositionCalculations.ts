import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { ALERT_CORRECT_DATA, ALERT_CORRECT_DATA_TRANSFORMED } from 'mocks/Alerts';
import {
  MULTIPLE_ORDER_INFO_CORRECT_DATA,
  MULTIPLE_ORDER_INFO_CORRECT_DATA_TRANSFORMED,
  ORDER_INFO_CORRECT_DATA_TRANSFORMED,
} from 'mocks/orderInfo';
import {
  PROPOSITIONS_CORRECT_DATA,
  PROPOSITIONS_CORRECT_DATA_TRANSFORMED,
  PROPOSITIONS_SHORT_CORRECT_DATA,
} from 'mocks/propositionsData';

import type { TGetOrderCalculations } from 'entities/order';
import type { ITransformedGetMultiCalculations } from 'entities/propositionCalculations';

export const ORDER: PropositionCalculations.GetManyOrders = {
  offers: PROPOSITIONS_CORRECT_DATA,
  orderInfo: MULTIPLE_ORDER_INFO_CORRECT_DATA[0],

  isCompleted: true,
  benefitSuccess: [],
  alerts: ALERT_CORRECT_DATA,
};

export const ORDER_TRANSFORMED: TGetOrderCalculations = {
  forwardingPropositions: PROPOSITIONS_CORRECT_DATA_TRANSFORMED,
  order: MULTIPLE_ORDER_INFO_CORRECT_DATA_TRANSFORMED[0],
  orderStatus: 'success',
  isOrderCompleted: true,
  shouldShowForwardingPropositions: false,
  alerts: ALERT_CORRECT_DATA_TRANSFORMED,
};

export const ORDER_INITIAL: TGetOrderCalculations = {
  forwardingPropositions: [],
  order: null,

  isOrderCompleted: false,
  orderStatus: 'initial',
  shouldShowForwardingPropositions: false,
  alerts: [],
};

export const CALCULATIONS: PropositionCalculations.GetCalculations = {
  offers: PROPOSITIONS_CORRECT_DATA,
  orderInfo: MULTIPLE_ORDER_INFO_CORRECT_DATA[0],
  inProgressOffers: PROPOSITIONS_SHORT_CORRECT_DATA,
  unavailableOffers: PROPOSITIONS_SHORT_CORRECT_DATA,
  isCompleted: true,
  kbmInfo: { drivers: [] },
  benefitSuccess: [],
  alerts: ALERT_CORRECT_DATA,
};

export const CALCULATIONS_TRANSFORMED: ITransformedGetMultiCalculations = {
  propositions: PROPOSITIONS_CORRECT_DATA_TRANSFORMED,

  orderInfo: ORDER_INFO_CORRECT_DATA_TRANSFORMED,

  propositionStatus: 'success',
  driversWithKbm: [],
  promocodeAlerts: [],
  alerts: ALERT_CORRECT_DATA_TRANSFORMED,
};

export const CALCULATIONS_INITIAL: ITransformedGetMultiCalculations = {
  propositions: [],

  orderInfo: null,

  propositionStatus: 'loading',
  driversWithKbm: [],
  promocodeAlerts: [],
  alerts: [],
};
