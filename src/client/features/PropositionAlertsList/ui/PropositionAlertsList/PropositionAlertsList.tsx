import { Alert, Space } from '@sravni/react-design-system';
import type { SpaceProps } from '@sravni/react-design-system/lib/Space';
import React from 'react';

import type { IDetailAlert } from 'shared/types/IAlert';

import { DisableUpsaleAlert } from '../DisableUpsaleAlert';

export interface IAlertsList {
  // Массив алертов
  alerts: IDetailAlert[];
  // Управление свойствами Space
  spaceProps?: SpaceProps;
  // Флаг отвечающий за включение кликабельности для алертов
  isActive?: boolean;
  // Хеш заказа
  orderHash?: Nullable<string>;
  // Коллбек отказа от апсейла заказа
  startNewOrder?: () => void;
}

export const PropositionAlertsList: FC<IAlertsList> = ({
  alerts,
  isActive,
  startNewOrder,
  orderHash,
  spaceProps = {},
  className,
}) => {
  const { size = 16, direction = 'vertical', ...restSpaceProps } = spaceProps;

  return alerts && alerts?.length > 0 ? (
    <Space
      {...restSpaceProps}
      direction={direction}
      size={size}
      className={className}
    >
      {alerts.map((alert, i) =>
        alert.action === 'DisableUpsale' && isActive && orderHash && startNewOrder ? (
          <DisableUpsaleAlert
            // уникальный title может быть ReactNode поэтому нельзя его использовать
            /* eslint-disable-next-line react/no-array-index-key */
            key={i}
            orderHash={orderHash}
            startNewOrder={startNewOrder}
            alertProps={alert}
          />
        ) : (
          <Alert
            // уникальный title может быть ReactNode поэтому нельзя его использовать
            /* eslint-disable-next-line react/no-array-index-key */
            key={i}
            title={alert.title}
            subtitle={alert.subtitle}
            color={alert.color}
            variant={alert.variant}
          />
        ),
      )}
    </Space>
  ) : null;
};
