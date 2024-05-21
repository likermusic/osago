import { Card } from '@sravni/react-design-system';
import type { CardProps } from '@sravni/react-design-system/dist/types/components/Card/types/Card.types';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import type { Ref } from 'react';
import { forwardRef } from 'react';

import styles from './DeviceSizedCard.module.scss';

interface IDeviceSizedCard extends CardProps {
  vertical?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export const DeviceSizedCard: FC<IDeviceSizedCard> = forwardRef(
  ({ className, children, vertical = false, ...props }, ref) => {
    const isMobile = useIsMobile();
    return (
      <Card
        ref={ref}
        className={cn({ [styles.vertical]: vertical }, className)}
        size={isMobile ? 16 : 24}
        {...props}
      >
        {children}
      </Card>
    );
  },
);
