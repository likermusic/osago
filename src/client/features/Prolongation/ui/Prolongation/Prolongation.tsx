import { Space, Avatar, Button, Typography, Badge, Card } from '@sravni/react-design-system';
import React from 'react';

import type { IPolicy } from 'entities/policies';

import styles from './Prolongation.module.scss';

const { Text } = Typography;

interface ProlongationProps extends IPolicy {
  buttonText: string;
  isMobile: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Prolongation: FC<ProlongationProps> = ({
  AvatarIcon,
  title,
  subtitle,
  badges,
  buttonText,
  isMobile,
  onClick,
}) => (
  <Card
    size={16}
    className={styles.container}
  >
    <Space
      direction="vertical"
      justify="center"
      className={styles.content}
    >
      <Space
        size={12}
        align="center"
      >
        {typeof AvatarIcon === 'string' ? (
          <Avatar
            size={36}
            src={AvatarIcon}
          />
        ) : (
          AvatarIcon
        )}

        <div>
          {title && (
            <Text
              size={12}
              className="h-color-D60 h-mb-2"
            >
              {title}
            </Text>
          )}
          <Text
            size={16}
            strong
          >
            {subtitle}
          </Text>
        </div>
      </Space>

      {badges && (
        <Space
          size={4}
          wrap
          className={styles.badgesBlock}
        >
          {badges.map((badge, index) => (
            <Badge
              // используем index так как все поля необязательные, а сортировки нет
              //  eslint-disable-next-line react/no-array-index-key
              key={index}
              color={badge.color}
              variant={badge.variant}
              text={badge.text}
              className="h-mr-8"
            />
          ))}
        </Space>
      )}
    </Space>

    <Button
      variant="primary"
      color="gray"
      size={44}
      block={isMobile}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  </Card>
);
