import { useAppSelector } from 'shared/lib/redux';

import { useSendEventOrder } from 'entities/order';

import { OrderPay } from 'features/OrderPay';

import { PropositionOrder } from 'widgets/Propositions';

import { nonNullableOrderSelector } from '../../ActiveOrder.selectors';

import styles from './ActiveOrder.module.scss';

const POSITION_INDEX = 0;
const SALE_TYPE = 'Напрямую' as const;

export const ActiveOrder: FC = ({ className }) => {
  const order = useAppSelector(nonNullableOrderSelector);
  useSendEventOrder();

  const isOrderReady = !!order?.paymentUrl && !!order?.price;

  const { paymentUrl, price, company } = order;

  return (
    <PropositionOrder
      {...order}
      tags={order?.tags ?? null}
      actionChildren={
        <OrderPay
          paymentUrl={paymentUrl}
          isOrderReady={isOrderReady}
          price={price}
          company={company}
          saleType={SALE_TYPE}
          isFromPopup={false}
          isProlongation={!!order?.isProlongation}
          className={styles.pay}
        />
      }
      className={className}
      hasTimeLine
      positionIndex={POSITION_INDEX}
    />
  );
};
