import { Space } from '@sravni/react-design-system';
import { MyCredits } from '@sravni/react-icons';
import React from 'react';

import { SravniAwardIcon } from 'shared/assets/icons/SravniAwardIcon';
import type { IAlerts, TAlertType } from 'shared/types';

import { CommonAlert } from './CommonAlert';
import { PresentModalBanner } from './PresentModalBanner';

const ALERT_ICON_RECORD: Record<TAlertType, React.ReactNode> = {
  sravniAward: <SravniAwardIcon />,
};

export const Alerts: FC<IAlerts> = ({ bonuses, className, detailAlerts }) => (
  <Space
    className={className}
    direction="vertical"
    size={16}
  >
    {detailAlerts.map((alert) =>
      alert.action === 'OpenPromoModal' ? (
        <PresentModalBanner
          alert={alert}
          bonuses={bonuses}
          key={alert.title}
        />
      ) : (
        <CommonAlert
          color={alert.color}
          key={alert.title}
          title={alert.title}
          subtitle={alert.subtitle}
          icon={alert.type ? ALERT_ICON_RECORD[alert.type] : <MyCredits />}
        />
      ),
    )}
  </Space>
);
