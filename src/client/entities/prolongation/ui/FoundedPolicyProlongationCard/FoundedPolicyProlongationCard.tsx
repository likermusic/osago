import { Avatar, Space, Typography } from '@sravni/react-design-system';

import type { IInfo } from '../../types';

import { ICONS } from './FoundedPolicyProlongationCard.config';

type TFoundedPolicyProlongationCard = {
  info?: IInfo[];
};

export const FoundedPolicyProlongationCard: FC<TFoundedPolicyProlongationCard> = ({ info, className }) => {
  if (!info) {
    return null;
  }

  return (
    <Space
      size={32}
      direction="vertical"
      className={className}
    >
      {info.map((item) => (
        <Space
          key={`${item.icon}_${item.title}`}
          align="center"
        >
          <Avatar
            className="h-mr-12"
            size={44}
          >
            {ICONS[item.icon]}
          </Avatar>

          <Space
            direction="vertical"
            size={2}
          >
            <Typography.Text
              size={16}
              strong
            >
              {item.title}
            </Typography.Text>

            {item.subtitle && (
              <Typography.Text
                size={14}
                className="h-color-D60"
              >
                {item.subtitle}
              </Typography.Text>
            )}
          </Space>
        </Space>
      ))}
    </Space>
  );
};
