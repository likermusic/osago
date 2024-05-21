import { Avatar, Card, Space, Typography } from '@sravni/react-design-system';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import { getDateWithText } from 'shared/lib/getDateWithText';
import type { IOrderProposition } from 'shared/types';

import { OrderPay } from 'features/OrderPay';

import styles from './PropositionOrderSticky.module.scss';

const SALE_TYPE = 'Напрямую' as const;

type TShortInfoOrder = Pick<
  IOrderProposition,
  'company' | 'paymentUrl' | 'startDate' | 'price' | 'isProlongation' | 'orderPropositionStatus'
>;

export interface IOrderShortInfoSticky {
  order: Nullable<TShortInfoOrder>;
}

export const OrderShortInfoSticky: FC<IOrderShortInfoSticky> = ({ order }) => {
  if (!order?.company) return null;

  if (typeof window === 'undefined') {
    // Чтоб не падал при серверном рендеринге
    return null;
  }

  const { company, paymentUrl, startDate, price, isProlongation = false, orderPropositionStatus } = order;
  const { companyName, logoLink } = company;

  const isOrderReady = orderPropositionStatus !== 'loading';

  if (orderPropositionStatus === 'error' || orderPropositionStatus === 'rejected') return null;

  return createPortal(
    <Card className={styles.card}>
      <Space
        className={styles.wrapper}
        justify="space-between"
      >
        <Space>
          <Avatar
            size={36}
            src={logoLink}
            className="h-mr-8"
          />

          <Space direction="vertical">
            {startDate && (
              <Typography.Text
                size={14}
                strong
                nowrap
              >
                {getDateWithText(startDate)}
              </Typography.Text>
            )}
            <Typography.Text
              size={12}
              nowrap
              className={cn('h-color-D30', styles.text)}
            >
              {companyName}
            </Typography.Text>
          </Space>
        </Space>

        <OrderPay
          className="h-ml-8"
          paymentUrl={paymentUrl}
          price={price}
          company={company}
          isProlongation={isProlongation}
          isFromPopup={false}
          saleType={SALE_TYPE}
          isOrderReady={isOrderReady}
        />
      </Space>
    </Card>,
    document.body,
  );
};
