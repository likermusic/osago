import { Badge, Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { useAppSelector } from 'shared/lib/redux';

import { isWLOtpSelector } from 'entities/whiteLabels';

import style from './Awards.module.scss';
import { awards } from './Awards.texts';

export const Awards = () => {
  const isMobile = useIsMobile();

  const isWlOtp = useAppSelector(isWLOtpSelector);

  return (
    <Space
      className={cn(style.awardsWrapper, 'h-mt-24 h-text-center')}
      direction="horizontal"
      justify="center"
      wrap={!isMobile}
    >
      {awards.map(({ awardStyle, badgeText, name, image, imageAlt }) => (
        <Card
          className={cn(
            isWlOtp ? style[`${awardStyle}Otp`] : style[awardStyle],
            style.award,
            isMobile ? 'h-mr-16' : '',
          )}
          size={16}
          key={awardStyle}
        >
          <Space
            direction="vertical"
            align="center"
          >
            <Typography.Heading level={isMobile ? 4 : 5}>{name}</Typography.Heading>
            {awardStyle === 'awardCar' || awardStyle === 'awardMillion' ? (
              <Badge
                text={badgeText}
                color="green"
                variant="primary"
                className="h-mt-8"
              />
            ) : (
              <Typography.Heading
                level={5}
                className={cn(style.subtitle, 'h-mb-16')}
              >
                {badgeText}
              </Typography.Heading>
            )}
            <img
              src={image}
              alt={imageAlt}
              width={awardStyle === 'awardIphones' ? 190 : 230}
              className={cn(style.awardImage, style.awardImageWrapper)}
            />
          </Space>
        </Card>
      ))}
    </Space>
  );
};
