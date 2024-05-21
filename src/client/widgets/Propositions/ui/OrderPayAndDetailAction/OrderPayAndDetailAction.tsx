import { Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { setActiveElementFlag } from 'shared/lib/activeElementClickInterceptor';

import { OrderPay } from 'features/OrderPay';

import { PropositionDetailWithPayBtn } from 'widgets/Propositions';

import type { IOrderActionTypes } from '../../types';

import styles from './OrderPayAndDetailAction.module.scss';

/*
 * для вставки в слот actionChildren в компонент заказа
 */
export const OrderPayAndDetailAction: FC<IOrderActionTypes> = (props) => {
  const isMobile = useIsMobile();

  const { isProlongation } = props;

  return (
    <Space
      direction={isMobile ? 'row-reverse' : 'horizontal'}
      size={12}
      onClick={setActiveElementFlag}
    >
      <OrderPay
        {...props}
        className={styles.payFeature}
        isFromPopup={false}
        isProlongation={!!isProlongation}
      />

      <PropositionDetailWithPayBtn {...props} />
    </Space>
  );
};
