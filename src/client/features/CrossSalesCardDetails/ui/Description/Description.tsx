import { Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import type { CrossTypes } from 'shared/config/cross';
import { IconCenter } from 'shared/ui/IconCenter';

import { getPaymentValue, getDateValue } from './config';
import styles from './Description.module.scss';
import { DescriptionTexts } from './Description.texts';

const { Heading, Text } = Typography;

interface IDescription {
  advice: string;
  insuranceEntity: string;

  cards: Array<{
    id: string;
    name: string;
    description: string;
    number: number;
    icon: string;
  }>;
  date: string;
  limits: Array<{
    title: string;
    limit: number;
  }>;
  type: CrossTypes;
}

export const Description: FC<IDescription> = ({ advice, insuranceEntity, cards, className, date, limits, type }) => {
  const isMobile = useIsMobile();
  return (
    <Space
      className={cn(styles.container, className)}
      direction="vertical"
      size={isMobile ? 16 : 24}
    >
      <div>
        <Text
          className="h-color-D60 h-mb-4"
          size={12}
        >
          {DescriptionTexts[type].title}
        </Text>
        <Text
          size={16}
          strong
        >
          {insuranceEntity}
        </Text>
      </div>

      <Space
        size={12}
        wrap
      >
        {cards?.map((card) => (
          <Card
            color="dark"
            className={styles.card}
            size={isMobile ? 16 : 24}
            key={card.id}
          >
            <IconCenter
              background="white"
              className="h-mb-8"
            >
              <img
                src={`${card.icon}.svg`}
                className={styles.cardIcon}
                alt="Card"
              />
            </IconCenter>

            <Text
              size={14}
              strong
            >
              {card.name}
            </Text>
          </Card>
        ))}
      </Space>

      {limits?.map((limit) => (
        <Space
          key={limit.title}
          justify="space-between"
        >
          <Text size={14}>{limit.title}</Text>
          <Heading level={6}>{getPaymentValue(limit.limit)}</Heading>
        </Space>
      ))}

      <Space justify="space-between">
        <Text size={14}>{DescriptionTexts[type].date}</Text>
        <Heading level={5}>{getDateValue(date)}</Heading>
      </Space>

      <Card
        color="green"
        size={isMobile ? 16 : 24}
      >
        <Text size={14}>{advice}</Text>
      </Card>
    </Space>
  );
};
