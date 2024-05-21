import { Space, Typography } from '@sravni/react-design-system';

import { getKbmDiscountInfo, CIRCLE_CONFIG } from '../../lib';
import { KbmCircle } from '../KbmCircle';

import { getKbmDiscountInfoByStatuses } from './KbmDiscountInfo.texts';

export const KbmDiscountInfo: FC<{ kbm: number }> = ({ className, kbm }) => {
  const { circleOffset, discountPercent, status } = getKbmDiscountInfo(kbm);
  const { title, subtitle, color } = getKbmDiscountInfoByStatuses(discountPercent, status);

  return (
    <Space
      align="center"
      className={className}
    >
      <KbmCircle
        kbmValue={kbm}
        circumference={CIRCLE_CONFIG.CIRCUMFERENCE}
        offset={circleOffset || 0}
        statusBarClassName={`h-color-${color}`}
      />

      <div className="h-ml-16">
        {discountPercent && (
          <Typography.Text
            className="h-mb-2"
            size={14}
            strong
          >
            {title}
          </Typography.Text>
        )}
        <Typography.Text
          className="h-color-D60"
          size={12}
        >
          {subtitle}
        </Typography.Text>
      </div>
    </Space>
  );
};
