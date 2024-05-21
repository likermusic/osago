import { Space, Icon, Card, Avatar } from '@sravni/react-design-system';
import { Shield, ProductsSearch, TimerSpeed } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';
import type { FC } from 'react';
import React from 'react';

import { selectors } from 'shared/lib/qa';
import { AppStores } from 'shared/ui/AppStores';
import { OptimizedPicture } from 'shared/ui/OptimizedPicture';
import { TitleWithDescription } from 'shared/ui/TitleWithDescription';

import phone from '../../assets/landingAppPhone.png';

import styles from './OurApp.module.scss';
import { ourAppTexts } from './OurApp.texts';

const { steps, caption, description } = ourAppTexts;

export const OurApp: FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <Card
      size={40}
      data-qa={selectors.landing.appInstall}
    >
      <Space>
        <Space
          direction="vertical"
          size={32}
          className={styles.content}
        >
          <TitleWithDescription
            verticalGap={8}
            description={description}
            title={caption}
            titleLevel={2}
            descriptionSize={16}
          />

          <Space
            size={24}
            direction="vertical"
          >
            <Space size={12}>
              <Avatar>
                <Icon icon={<TimerSpeed />} />
              </Avatar>

              <TitleWithDescription
                titleLevel={5}
                descriptionSize={12}
                title={steps.fast.caption}
                description={steps.fast.description}
              />
            </Space>

            <Space size={12}>
              <Avatar>
                <Icon icon={<Shield />} />
              </Avatar>

              <TitleWithDescription
                titleLevel={5}
                descriptionSize={12}
                title={steps.keepInTouch.caption}
                description={steps.keepInTouch.description}
              />
            </Space>

            <Space size={12}>
              <Avatar>
                <Icon icon={<ProductsSearch />} />
              </Avatar>

              <TitleWithDescription
                titleLevel={5}
                descriptionSize={12}
                title={steps.others.caption}
                description={steps.others.description}
              />
            </Space>
          </Space>

          <AppStores />
        </Space>

        <div className={styles.phoneIconWrapper}>
          <OptimizedPicture
            img={phone}
            alt={description}
            imgClassName={styles.phoneIcon}
            height={395}
            isJpeg
          />
        </div>
      </Space>
    </Card>
  );
};
