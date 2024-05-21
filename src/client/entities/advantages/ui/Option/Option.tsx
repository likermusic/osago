import { Card, Space } from '@sravni/react-design-system';
import type { SpaceProps } from '@sravni/react-design-system/dist/types/components/Space';
import { useIsMobile } from '@sravni/react-utils';
import * as React from 'react';

import { TitleWithDescription } from 'shared/ui/TitleWithDescription';
import { TitleWithIconAndDescription } from 'shared/ui/TitleWithIconAndDescription';

type OptionItem = {
  title: string;
  titleLevel?: 2 | 3 | 4;
  description: string;
  isHorizontal?: boolean;
  size?: SpaceProps['size'];
  reverse?: boolean;
  className?: string;
  titleWithIcon?: boolean;
  isWL: boolean;
  IconElement?: React.ForwardRefExoticComponent<React.HTMLAttributes<SVGSVGElement>>;
};

export const Option: FC<OptionItem> = ({
  title,
  description,
  IconElement,
  isHorizontal,
  titleLevel = 4,
  className,
  reverse = false,
  size,
  isWL,
  children,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card
      className={className}
      size={isMobile ? 16 : 32}
    >
      <Space
        direction={isHorizontal ? 'horizontal' : 'vertical'}
        size={size}
        justify="space-between"
      >
        {reverse && !IconElement && children}

        {IconElement ? (
          <TitleWithIconAndDescription
            title={title}
            description={description}
            titleLevel={titleLevel}
            size={isMobile ? 8 : 16}
            IconElement={IconElement}
            isWL={isWL}
          />
        ) : (
          <TitleWithDescription
            title={title}
            description={description}
            titleLevel={titleLevel}
            verticalGap={isMobile ? 8 : 16}
            descriptionSize={14}
          />
        )}

        {!reverse && !IconElement && children}
      </Space>
    </Card>
  );
};
