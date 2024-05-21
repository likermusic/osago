import { Badge, Icon } from '@sravni/react-design-system';
import type { BadgeColor } from '@sravni/react-design-system/dist/types/components/Badge/types/Badge.types';
import type { IconProps } from '@sravni/react-design-system/dist/types/components/Icon/types/Icon.types';
import cn from 'classnames';
import React from 'react';

import { TooltipWithStopPropagation } from '../TooltipWithStopPropagation';

import styles from './TooltipBadge.module.scss';

interface IBadgeWithScroll {
  /* Цвет Badge*/
  color: BadgeColor;
  /* Текст внутри Badge*/
  title: string | undefined;
  /* Иконка  внутри Badge*/
  icon?: React.ReactNode;
  /* Цвет иконки */
  iconColor?: IconProps['color'];
  /* Вариант Badge */
  variant?: 'primary' | 'secondary';
  /* Есть ли тултип, текст тултипа определяется пропсом text */
  isTooltip?: boolean;
  /* Текст внутри Tooltip */
  text: string | undefined;
  /* Футер Tooltip */
  footer?: React.ReactNode;
  /* Ширина Tooltip */
  width?: number;
}

export const TooltipBadge: FC<IBadgeWithScroll> = (props) => {
  const { title, text, className, color, iconColor, icon, variant, isTooltip = false, footer, width } = props;

  const BadgeElement = (
    <Badge
      className={cn(className, styles.scroll)}
      color={color}
      variant={variant}
      text={
        <>
          {icon && (
            <Icon
              color={iconColor}
              icon={icon}
              size={16}
            />
          )}
          {title}
        </>
      }
    />
  );
  return isTooltip ? (
    <TooltipWithStopPropagation
      content={text}
      footer={footer}
      width={width}
    >
      {BadgeElement}
    </TooltipWithStopPropagation>
  ) : (
    BadgeElement
  );
};
