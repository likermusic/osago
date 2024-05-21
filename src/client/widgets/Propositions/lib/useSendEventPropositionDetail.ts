import { sendEventProductCardMoreClick } from 'shared/lib/sendGAEvents';

import type { IPropositionReadyToOrder } from '../types';

type TProps = Pick<
  IPropositionReadyToOrder,
  'company' | 'price' | 'positionIndex' | 'isProlongation' | 'isSectionSponsor' | 'isOrderInListExist'
>;

export const useSendEventPropositionDetail = (props: TProps) => {
  const { company, price, positionIndex, isProlongation = false, isSectionSponsor = false } = props || {};

  const sendPropositionDetailEventAnalytics = () => {
    sendEventProductCardMoreClick({
      insuranceCompany: company.companyName,
      price,
      positionIndex,
      isProlongation,
      isSectionSponsor,
      entry: 'Кнопка',
    });
  };

  return { sendPropositionDetailEventAnalytics };
};
