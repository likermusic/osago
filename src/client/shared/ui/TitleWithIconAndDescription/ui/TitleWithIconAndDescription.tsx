import { Icon, Space, Typography } from '@sravni/react-design-system';
import type { SpaceProps } from '@sravni/react-design-system/dist/types/components/Space';
import type { HeadingProps } from '@sravni/react-design-system/dist/types/components/Typography';
import cn from 'classnames';
import * as React from 'react';

import styles from './TitleWithIconAndDescription.module.scss';

export type TitleWithDescriptionProps = {
  title: string;
  description: string | JSX.Element;
  className?: string;
  titleLevel?: HeadingProps['level'];
  size?: SpaceProps['size'];
  IconElement: React.ForwardRefExoticComponent<React.HTMLAttributes<SVGSVGElement>>;
  isWL: boolean;
};
export const TitleWithIconAndDescription: FC<TitleWithDescriptionProps> = ({
  description,
  title,
  className,
  IconElement,
  titleLevel = 3,
  size = 16,
  isWL,
}) => (
  <Space
    direction="vertical"
    className={className}
    size={size}
  >
    <Space
      size={12}
      justify="space-between"
      align="center"
    >
      <Typography.Heading
        className="h-color-D80"
        level={titleLevel}
      >
        {title}
      </Typography.Heading>

      <Icon
        size={28}
        color="gray"
        className={isWL ? styles.iconWrapperWL : ''}
      >
        <IconElement className={cn(styles.icon, isWL ? styles.iconWL : '')} />
      </Icon>
    </Space>

    <Typography.Text size={14}>{description}</Typography.Text>
  </Space>
);
