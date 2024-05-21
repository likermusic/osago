import { createSelector } from 'reselect';

import type { ICompanyPropositionInfo } from 'shared/types';

import { DEFAULT_ORDER_PROPOSITION_STATUS, activeOrderSelector } from 'entities/order';
import { currentPolicyStartDateSelector } from 'entities/PolicyInfo';
import { selectedPropositionPriceSelector } from 'entities/selectedProposition';

import { selectedCompanySelector } from 'features/UpdatePolicyStartDate';

// Селектор нужен, чтобы показывать инфу о компании, до того когда появилась инфа о компании
export const activeCompanyInOrderSelector = createSelector(
  selectedCompanySelector,
  (selectedProposition): ICompanyPropositionInfo => ({
    logoLink: selectedProposition?.mobileLogoLink,
    companyId: selectedProposition?.companyId,
    companyName: selectedProposition?.name,
  }),
);

export const nonNullableOrderSelector = createSelector(
  activeOrderSelector,
  selectedPropositionPriceSelector,
  currentPolicyStartDateSelector,
  activeCompanyInOrderSelector,
  (order, selectedPrice, startDate, company) => ({
    ...order,
    company,
    startDate: (order?.startDate || startDate) ?? null,

    orderHash: order?.orderHash ?? null,
    calcHash: order?.calcHash ?? null,
    paymentUrl: order?.paymentUrl ?? null,
    draftFullUrl: order?.draftFullUrl ?? null,
    price: order?.price || selectedPrice,
    searchPrice: order?.searchPrice ?? null,
    description: order?.description ?? null,
    advantages: null,
    productId: order?.productId ?? null,
    orderPropositionStatus: order?.orderPropositionStatus ?? DEFAULT_ORDER_PROPOSITION_STATUS,
    absoluteTags: order?.absoluteTags ?? [],
    alerts: order?.alerts ?? [],
    isPriceChanged: !!order?.isPriceChanged,
  }),
);
