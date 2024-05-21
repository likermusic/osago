import { Space, Typography } from '@sravni/react-design-system';
import cn from 'classnames';

import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';

import type { IPropositionCardFailed } from '../../types';

import styles from './PropositionCardFailed.module.scss';

export const PropositionCardFailed: FC<IPropositionCardFailed> = ({ className, children, subtitle }) => (
  <DeviceSizedCard className={cn(className, styles.card)}>
    <Space
      size={12}
      align="center"
    >
      <Space
        size={0}
        justify="center"
        direction="vertical"
      >
        {subtitle && (
          <Typography.Text
            size={12}
            className="h-color-D20"
          >
            {subtitle}
          </Typography.Text>
        )}
      </Space>
    </Space>

    {children}
  </DeviceSizedCard>
);
