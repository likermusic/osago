import { Alert, Divider, Typography } from '@sravni/react-design-system';
import React from 'react';

import type { IBonusInfoBody } from 'shared/types/BonusesDescription';

import styles from './BonusDetailsBody.module.scss';

type IBonusDetailsDesktopBody = Omit<
  IBonusInfoBody,
  'logoUrl' | 'fullRulesLinkUrl' | 'description' | 'shortDescription'
>;

export const BonusDetailsBody: FC<IBonusDetailsDesktopBody> = ({ className, alertText, aboutText, infoList }) => (
  <div className={className}>
    <Alert color="green">{alertText}</Alert>

    <Typography.Text className={styles.wrapper}>{aboutText}</Typography.Text>

    {infoList?.map(({ title, description }) => (
      <div key={title}>
        <Divider className={styles.wrapper} />
        <Typography.Text strong>{title}</Typography.Text>
        <Typography.Text>
          {description.length <= 1 ? (
            <Typography.Text>{description?.[0]}</Typography.Text>
          ) : (
            <Typography.UnorderedList>
              {description?.map((text) => (
                <Typography.ListItem key={text}>{text}</Typography.ListItem>
              ))}
            </Typography.UnorderedList>
          )}
        </Typography.Text>
      </div>
    ))}
  </div>
);
