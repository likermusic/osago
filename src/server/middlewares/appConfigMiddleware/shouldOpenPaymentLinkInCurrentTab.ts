import { PARTNERS_IDS } from '../../../constants/partners';

const partnersWithPaymentLinkInCurrentTab = new Set([PARTNERS_IDS.cardsMobileApp]);

export const shouldOpenPaymentLinkInCurrentTab = (partnerId?: number, paymentLinkInCurrentTab?: string) =>
  (partnerId && partnersWithPaymentLinkInCurrentTab.has(partnerId)) || paymentLinkInCurrentTab === 'true';
