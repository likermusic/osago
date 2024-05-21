import { Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import { capitalizeFirstLetter } from 'shared/lib/formatters';
import { useAppSelector } from 'shared/lib/redux';

import { InvitationIcon } from '../../assets/InvitationIcon';
import { invitationSelectors } from '../../model/invitation.selectors';

import styles from './Invitation.module.scss';

const recommended = 'рекомендует';

export const Invitation: FC = () => {
  const firstname = useAppSelector(invitationSelectors.invitationSelector);

  if (!firstname) {
    return null;
  }

  return (
    <Space align="end">
      <Typography.Heading
        level={4}
        className={styles.headingStyle}
      >{`${capitalizeFirstLetter(firstname)} ${recommended}`}</Typography.Heading>

      <InvitationIcon />
    </Space>
  );
};
