import { sendEventProductCardMoreClick } from 'shared/lib/sendGAEvents';

import { OrderPay } from 'features/OrderPay';
import { PropositionDetail } from 'features/PropositionDetail';

import type { IOrderActionTypes } from '../../types';

import styles from './PropositionDetailWithPayBtn.module.scss';
/*
 * для вставки в слот actionChildren в компонент заказа
 */
export const PropositionDetailWithPayBtn: FC<IOrderActionTypes> = (props) => {
  const {
    company,
    price,
    positionIndex,
    isSectionSponsor = false,
    isProlongation = false,
    description,
    isDetailInfoOpened,
    onToggleDetailInfoPopup,
  } = props;

  const sendPropositionDetailAnalyticEvent = () => {
    sendEventProductCardMoreClick({
      insuranceCompany: company.companyName,
      price,
      positionIndex,
      isProlongation,
      isSectionSponsor,
      entry: 'Кнопка',
    });
  };

  return (
    <PropositionDetail
      company={company}
      onPopupChangeState={onToggleDetailInfoPopup}
      isOpenDetails={isDetailInfoOpened}
      description={description}
      sendEventAnalytics={sendPropositionDetailAnalyticEvent}
    >
      <OrderPay
        {...props}
        className={styles.detailPayFeature}
        isProlongation={isProlongation}
        isFromPopup
        size={52}
      />
    </PropositionDetail>
  );
};
