import { Avatar, Button, Card, Icon, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import scrollToElement from 'scroll-to-element';

import { CustomRouter } from 'shared/config/router';

import type { TRaffleHowToConfig } from '../types';

import styles from './RaffleHowTo.module.scss';
import { RaffleHowToTexts } from './RaffleHowTo.texts';

export type TRaffleHowToProps = {
  config: TRaffleHowToConfig;
};

export const RaffleHowTo: FC<TRaffleHowToProps> = ({ className, config }) => {
  const isMobile = useIsMobile();
  const { steps, scrollToId } = config;

  const onBottomBtnClick = () => {
    scrollToElement(`#${scrollToId}`);
  };

  return (
    <Space
      className={cn(styles.wrapper, className)}
      direction="vertical"
      align="center"
    >
      <Typography.Heading
        level={2}
        className="h-mb-24 h-text-center"
      >
        {RaffleHowToTexts.title}
      </Typography.Heading>

      <Space
        size={isMobile ? 16 : 24}
        direction="vertical"
        align="center"
        className="h-mb-32"
      >
        {steps.map(({ IconComponent, title, subtitle, linkAtStartOfTitle }) => (
          <Card
            key={subtitle}
            color="dark"
            className={styles.card}
            size={16}
          >
            <Space
              align="center"
              size={isMobile ? 16 : 24}
            >
              <Avatar className={styles.avatar}>
                <Icon
                  className={styles.icon}
                  color="gray"
                  icon={<IconComponent />}
                />
              </Avatar>

              <Space
                direction="vertical"
                justify="center"
                size={isMobile ? 2 : 4}
              >
                <Typography.Heading level={5}>
                  {linkAtStartOfTitle && (
                    <Typography.Link onClick={() => CustomRouter.push(linkAtStartOfTitle.url)}>
                      {linkAtStartOfTitle.text}
                    </Typography.Link>
                  )}
                  {title}
                </Typography.Heading>

                <Typography.Text
                  className="h-color-D60"
                  size={14}
                  strong
                >
                  {subtitle}
                </Typography.Text>
              </Space>
            </Space>
          </Card>
        ))}
      </Space>

      <Button
        onClick={onBottomBtnClick}
        size={52}
      >
        {RaffleHowToTexts.bottomBtn}
      </Button>
    </Space>
  );
};
