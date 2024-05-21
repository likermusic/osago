import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendEventMoveToPayment } from 'shared/lib/sendGAEvents';
import type { TSaleType } from 'shared/lib/sendGAEvents/events';
import type { ICompanyPropositionInfo } from 'shared/types';

interface IAnalyticEventsForOrder {
  price: Nullable<number>;
  company: ICompanyPropositionInfo;
  isProlongation: boolean;
  isFromPopup: boolean;
  saleType: TSaleType;
}

export const useGetAnalyticEventsForOrder = (props: IAnalyticEventsForOrder) => {
  const { price, company, isProlongation = false, saleType, isFromPopup } = props;

  const sendAnalyticsEvent = useGetSendAnalytics();

  const sendMoveToPaymentAnalyticEvent = () => {
    sendAnalyticsEvent('osago_contact_step6');

    sendEventMoveToPayment({
      companyName: company.companyName,
      price,
      isProlongation,
      saleType,
      isFromPopup,
    });
  };

  return { sendMoveToPaymentAnalyticEvent };
};
