import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

import type { TForwardingPropositionsMappedByDate } from 'entities/order';

import { ORDER_CONFIRMED_STATUS } from '../constants';

import type { orderSlice } from './order.slice';

type OrderState = SliceStateFromReducer<typeof orderSlice>;

export const orderHashSelector = (state: OrderState) => state.order.orderHash;
export const orderAlertsSelector = (state: OrderState) => state.order.alerts;
export const orderUniqueHashSelector = (state: OrderState) => state.order.orderUniqueHash;

export const activeOrderSelector = (state: OrderState) => state.order.order;
export const orderSelector = (state: OrderState) => state.order;

export const isOrderProlongationSelector = (state: OrderState) => state.order.order?.isProlongation;

export const orderStatusSelector = (state: OrderState) => state.order.orderStatus;

export const isOrderCompletedSelector = (state: OrderState) => state.order.isOrderCompleted;

export const shouldShowForwardingPropositionsSelector = (state: OrderState) =>
  state.order.shouldShowForwardingPropositions;

export const forwardingPropositionsSelector = (state: OrderState) => state.order.forwardingPropositions;

export const isOrderConfirmedStatusSelector = (state: OrderState) =>
  ORDER_CONFIRMED_STATUS.includes(state.order?.orderStatus);

export const forwardingPropositionsMappedByDateAndSortedSelector = createSelector(
  forwardingPropositionsSelector,
  (userPropositions) =>
    userPropositions.reduce<TForwardingPropositionsMappedByDate>((acc, proposition) => {
      if (proposition.startDate) {
        if (acc[proposition.startDate]) {
          acc[proposition.startDate].push(proposition);
        } else {
          acc[proposition.startDate] = [proposition];
        }
      }
      return acc;
    }, {}),
);
