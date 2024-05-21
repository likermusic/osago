import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendEventSelectProduct } from 'shared/lib/sendGAEvents';

import type { IPropositionReadyToOrder } from '../types';

type TProps = Pick<
  IPropositionReadyToOrder,
  'company' | 'price' | 'positionIndex' | 'isProlongation' | 'isSectionSponsor' | 'isOrderInListExist'
>;

export const useSendEventPropositionStartNewOrder = () => {
  const sendAnalyticsEvent = useGetSendAnalytics();

  const sendSelectProductEventAnalytics = (props: TProps) => {
    const {
      company,
      positionIndex,
      isProlongation = false,
      isSectionSponsor = false,
      isOrderInListExist,
    } = props || {};

    sendEventSelectProduct({
      insuranceCompany: company.companyName,
      positionIndex,
      isProlongation,
      isSectionSponsor,
      entry: 'Кнопка',
      isPossiblePay: !!isOrderInListExist,
    });

    sendAnalyticsEvent('osago_choose_IC');
    sendAnalyticsEvent('osago_contact_step5');
  };

  return { sendSelectProductEventAnalytics };
};
