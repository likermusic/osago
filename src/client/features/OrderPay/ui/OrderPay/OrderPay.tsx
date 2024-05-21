import { Button, Typography } from '@sravni/react-design-system';
import type { ButtonProps } from '@sravni/react-design-system/lib/Button';

import type { TSaleType } from 'shared/lib/sendGAEvents/events';
import type { ICompanyPropositionInfo } from 'shared/types';

import { useGetAnalyticEventsForOrder } from 'entities/order';

import { OrderPayTexts } from './OrderPay.texts';

export interface IOrderPay {
  paymentUrl: Nullable<string>;
  size?: ButtonProps['size'];
  isOrderReady: boolean;

  // для аналитики
  price: Nullable<number>;
  company: ICompanyPropositionInfo;
  isProlongation: boolean;
  isFromPopup: boolean;
  saleType: TSaleType;
}

export const OrderPay: FC<IOrderPay> = (props) => {
  const { paymentUrl, company, saleType, isProlongation, isOrderReady, className, size, price, isFromPopup } = props;

  const isLoading = !isOrderReady || !paymentUrl;

  const { sendMoveToPaymentAnalyticEvent } = useGetAnalyticEventsForOrder({
    price,
    company,
    isProlongation,
    saleType,
    isFromPopup,
  });

  const ButtonComponent = (
    <Button
      variant="primary"
      size={size}
      loading={isLoading}
      block
      onClick={sendMoveToPaymentAnalyticEvent}
    >
      {OrderPayTexts.btnPay}
    </Button>
  );

  return isLoading ? (
    <div className={className}>{ButtonComponent}</div>
  ) : (
    <Typography.Link
      target="_blank"
      href={paymentUrl}
      className={className}
    >
      {ButtonComponent}
    </Typography.Link>
  );
};
