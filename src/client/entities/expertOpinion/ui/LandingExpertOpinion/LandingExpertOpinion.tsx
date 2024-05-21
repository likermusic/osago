import { Avatar, Card, Icon, Space, Typography } from '@sravni/react-design-system';
import { Check } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import React from 'react';

import { OptimizedPicture } from 'shared/ui/OptimizedPicture';

import ExpertAvatar from '../../assets/ExpertAvatar.png';

import styles from './LandingExpertOpinion.module.scss';
import { LandingExpertOpinionTexts } from './LandingExpertOpinion.texts';

const { Text, Heading } = Typography;

export const LandingExpertOpinion = () => {
  const isMobile = useIsMobile();
  return (
    <Card className={cn(styles.container, { [styles.mobile]: isMobile })}>
      <Space direction="vertical">
        <Heading
          level={isMobile ? 2 : 3}
          className={cn(styles.headContainer)}
        >
          {LandingExpertOpinionTexts.head}
        </Heading>

        <div>
          <Space
            size={12}
            align="center"
            className="h-mb-16"
          >
            <Avatar size={52}>
              <OptimizedPicture
                img={ExpertAvatar}
                alt={LandingExpertOpinionTexts.imgAlt}
                width={52}
                height={52}
                cropWidth={300}
                cropHeight={300}
                isJpeg
              />
            </Avatar>
            <div>
              <Heading
                level={5}
                className={styles.title}
              >
                {LandingExpertOpinionTexts.title}
                <Icon
                  className={styles.expertIcon}
                  size={16}
                  icon={<Check />}
                />
              </Heading>
              <Text
                size={12}
                className="h-color-D60"
              >
                {LandingExpertOpinionTexts.subtitle}
              </Text>
            </div>
          </Space>
        </div>

        <Text
          size={14}
          className="h-color-D60 h-mb-16"
        >
          {LandingExpertOpinionTexts.description}
        </Text>

        <Text
          className="h-color-D80"
          size={14}
        >
          {LandingExpertOpinionTexts.text}
        </Text>
      </Space>
    </Card>
  );
};
