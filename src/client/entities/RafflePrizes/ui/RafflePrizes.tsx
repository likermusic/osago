import { Badge, Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import type { TConfig } from '../types';

import styles from './RafflePrizes.module.scss';

export type TRafflePrizesProps = {
  config: TConfig;
};

export const RafflePrizes: FC<TRafflePrizesProps> = ({ config, className }) => {
  const isMobile = useIsMobile();

  return (
    <Space
      direction="vertical"
      size={isMobile ? 16 : 24}
      className={cn(styles.wrapper, className)}
    >
      <Typography.Heading
        level={2}
        className="h-text-center"
      >
        {config.title}
      </Typography.Heading>

      <Space
        size={isMobile ? 16 : [16, 24]}
        direction={isMobile ? 'vertical' : 'horizontal'}
        wrap
        align={isMobile ? 'center' : undefined}
        justify="center"
      >
        {config.prizes.map(({ title, subtitle, color, img }) => (
          <Card
            key={title}
            color={color}
            className={styles.card}
            size={16}
          >
            <Typography.Heading
              level={4}
              className="h-mb-8"
            >
              {title}
            </Typography.Heading>

            {subtitle.type === 'badge' && (
              <Badge
                text={subtitle.value}
                variant="primary"
                color="green"
                className="h-mb-12"
              />
            )}
            {subtitle.type === 'text' && (
              <Typography.Heading
                level={5}
                className="h-color-D60 h-mb-12"
              >
                {subtitle.value}
              </Typography.Heading>
            )}

            <img
              src={img.url}
              alt={title}
              width={img.width}
              height={img.height}
            />
          </Card>
        ))}
      </Space>
    </Space>
  );
};
