import { Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import type { IPropositionHeaderMain } from '../../types';

export const AdvantagesBlock: FC<Pick<IPropositionHeaderMain, 'advantages'>> = ({ advantages, className }) => {
  const isMobile = useIsMobile();

  return advantages?.length ? (
    <Space
      className={className}
      justify="start"
      size={isMobile ? 12 : 16}
    >
      {advantages.map(({ title, description }) => (
        <div key={title}>
          <Typography.Text
            className="h-color-D60"
            size={12}
          >
            {title}
          </Typography.Text>
          <Typography.Text
            size={14}
            strong
          >
            {description}
          </Typography.Text>
        </div>
      ))}
    </Space>
  ) : null;
};
