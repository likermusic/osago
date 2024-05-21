import { Avatar, Button, Card, Divider, Space, Typography } from '@sravni/react-design-system';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import * as React from 'react';

import { formatDate } from 'commonUtils/formatters';

import type { CrossTypes } from 'shared/config/cross';
import { formatPrice } from 'shared/lib/formatters';
import { sendEventCrossSelection } from 'shared/lib/sendGAEvents';

import type { ICrossCalculationsProposition } from 'entities/cross';

import { CrossSalesCardDetails } from 'features/CrossSalesCardDetails';

import styles from './CrossSalesCard.module.scss';
import { CrossSalesCardTexts } from './CrossSalesCard.texts';

const { Heading, Text } = Typography;

interface ICrossSalesCardProps {
  icon: string;
  companyName: string;
  proposition: ICrossCalculationsProposition;
}

export const CrossSalesCard: FC<ICrossSalesCardProps> = ({
  icon,
  companyName,
  className,
  proposition: { hash, product, price, limits, startDate, insuranceEntity, type },
}) => {
  const [isCardDetailsShown, setCardDetailsShown] = useBoolean(false);
  const isMobile = useIsMobile();
  return (
    <div className={className}>
      <Card
        className={styles.cardWrapper}
        size={isMobile ? 16 : 24}
      >
        <Space
          align="center"
          size={12}
        >
          <Avatar src={`${icon}.svg`} />
          <div>
            <Text
              className="h-mb-2"
              size={16}
              strong
            >
              {product.name}
            </Text>
            {insuranceEntity && (
              <Text
                className="h-color-D60"
                size={12}
              >
                {insuranceEntity}
              </Text>
            )}
          </div>
        </Space>
        <Space
          direction="vertical"
          size={16}
        >
          <Text size={14}>{product.description}</Text>
          {product?.properties?.map((item) => (
            <Space
              key={item.id}
              size={12}
              align="center"
            >
              <img
                className={styles.infoIcon}
                src={`${item.icon}.svg`}
                alt={CrossSalesCardTexts.infoImgAlt}
              />
              <Space direction="vertical">
                <Text
                  className="h-mb-2"
                  size={14}
                  strong
                >
                  {item.name}
                </Text>
                <Text
                  className="h-color-D60"
                  size={12}
                >
                  {item.description}
                </Text>
              </Space>
            </Space>
          ))}
        </Space>
        <div className={styles.cardFooter}>
          <Divider className={styles.divider} />

          <Space
            justify="space-between"
            align="center"
          >
            <Heading level={4}>{formatPrice(price)}</Heading>
            <Button
              className={styles.cardButton}
              variant="primary"
              color="gray"
              onClick={() => {
                setCardDetailsShown.toggle();
                sendEventCrossSelection(companyName, product.name, price);
              }}
            >
              {CrossSalesCardTexts.cardButton}
            </Button>
          </Space>
        </div>
      </Card>

      {isCardDetailsShown && (
        <CrossSalesCardDetails
          advice={product.recommendation}
          insuranceEntity={insuranceEntity}
          avatarSrc={`${icon}.svg`}
          cards={product.risks}
          date={formatDate.toClientFromServer(startDate)}
          documents={product.documents}
          exceptions={product.restrictions}
          hash={hash}
          onClose={setCardDetailsShown.toggle}
          limits={limits}
          price={price}
          steps={product.actions}
          subtitle={companyName}
          title={product.name}
          type={type as CrossTypes}
        />
      )}
    </div>
  );
};
