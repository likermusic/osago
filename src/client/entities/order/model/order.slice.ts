import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TOrderPropositionStatus } from 'shared/types';

import { ORDER_ERROR_ALERT } from '../constants';
import { generateEmptyOrder } from '../lib/helpers/generateEmptyOrder';
import { mapOrderStatus } from '../lib/helpers/mapOrderStatus';
import type { OrderState, TGetOrderCalculations } from '../types';

import { createOrderHash } from './order.query';

export const initialState: OrderState = {
  orderHash: null,
  orderUniqueHash: null,
  order: null,
  orderStatus: 'initial',
  forwardingPropositions: [],
  isOrderCompleted: false,
  shouldShowForwardingPropositions: false,

  alerts: [],
};

const setActiveOrderToErrorHelper = (state: OrderState) => {
  state.orderStatus = 'error';

  if (state.order) {
    state.order.orderPropositionStatus = 'error';
    state.order.alerts = ORDER_ERROR_ALERT;
  } else {
    state.order = {
      ...generateEmptyOrder({
        orderPropositionStatus: 'error',
        alerts: ORDER_ERROR_ALERT,
      }),
    };
  }
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: () => initialState,
    resetOrderAndSetLoadingStatus: () => ({ ...initialState, orderStatus: 'loading' } as const),
    setOrderPropositionStatus: (state, { payload }: PayloadAction<TOrderPropositionStatus>) => {
      if (state.order) state.order.orderPropositionStatus = payload;
    },
    setActiveOrderToError: setActiveOrderToErrorHelper,
    setOrderStatus: (state, { payload }: PayloadAction<OrderState['orderStatus']>) => {
      state.orderStatus = payload;
    },
    setIsOrderCompleted: (state, { payload }: PayloadAction<OrderState['isOrderCompleted']>) => {
      state.isOrderCompleted = payload;
    },
    setOrderHash: (state, { payload }: PayloadAction<OrderState['orderHash']>) => {
      state.orderHash = payload;
    },
    setOrderCalculations: (state, { payload }: PayloadAction<TGetOrderCalculations>) => ({
      ...state,
      ...payload,
    }),
    updateStoreWhenOrderPollingFinishedByTime: (state) => {
      // обновляем статус только если он 'loading'
      if (state.orderStatus === 'loading') {
        const forwardingPropositionsLength = state.forwardingPropositions?.length ?? 0;

        state.orderStatus = mapOrderStatus('Loading', false, true, forwardingPropositionsLength);
      }

      state.isOrderCompleted = true;
    },
  },
  extraReducers(builder) {
    // создание хеша заказа
    builder.addMatcher(createOrderHash.matchFulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
    builder.addMatcher(createOrderHash.matchRejected, setActiveOrderToErrorHelper);

    // создание хеша заказа
    builder.addMatcher(createOrderHash.matchFulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
    builder.addMatcher(createOrderHash.matchRejected, setActiveOrderToErrorHelper);
  },
});

export const {
  setActiveOrderToError,
  setOrderCalculations,
  setOrderStatus,
  setIsOrderCompleted,
  resetOrder,
  resetOrderAndSetLoadingStatus,
  updateStoreWhenOrderPollingFinishedByTime,
} = orderSlice.actions;
