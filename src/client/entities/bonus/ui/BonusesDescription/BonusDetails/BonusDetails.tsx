import { UI } from '@sravni/cosago-react-library/lib/components';
import { Button, Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import type { IBonusDetails } from 'shared/types/BonusesDescription';

import { BonusesDescriptionTexts } from '../BonusesDescription.texts';

import styles from './BonusDetails.module.scss';
import { BonusDetailsTexts } from './BonusDetails.texts';
import { BonusDetailsBody } from './BonusDetailsBody';

export const BonusDetails: FC<IBonusDetails> = ({ detail, visible, onClose }) => (
  <UI.Popup
    closable={false}
    controls={
      <>
        {detail.fullRulesLinkUrl && (
          <Typography.Link
            className={styles.ruleLink}
            href={detail.fullRulesLinkUrl}
            target="_blank"
          >
            {BonusDetailsTexts.bonusPopup.rulesLink}
          </Typography.Link>
        )}

        <Button
          className={styles.rightButton}
          variant="primary"
          color="gray"
          onClick={onClose}
        >
          {BonusDetailsTexts.bonusPopup.btnText}
        </Button>
      </>
    }
    desktopSize="small"
    onClose={onClose}
    title={
      <Space
        align="center"
        size={16}
      >
        {detail.logoUrl && (
          <img
            alt={BonusesDescriptionTexts.imgAlt}
            width={52}
            height={52}
            src={detail.logoUrl}
          />
        )}
        {detail.shortDescription}
      </Space>
    }
    visible={visible}
  >
    <BonusDetailsBody
      {...detail}
      className={styles.content}
    />
  </UI.Popup>
);
