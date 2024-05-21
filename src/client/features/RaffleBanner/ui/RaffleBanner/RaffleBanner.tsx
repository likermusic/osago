import { Button, Space, Typography, Card, Badge } from '@sravni/react-design-system';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import imageOtp from 'shared/assets/image/Raffle3/WinCarOTP.png';
import { CustomRouter } from 'shared/config/router';
import { useAppSelector } from 'shared/lib/redux';
import { useCountdown } from 'shared/lib/useCountdown';

import { RaffleCountdownTimerTexts } from 'entities/RaffleCountdownTimer/ui/RaffleCountdownTimer.texts';
import { isWLExcludeOtpSelector, isWLOtpSelector } from 'entities/whiteLabels';

import { InformationRaffleModal } from '../InformationRaffleModal';

import style from './RaffleBanner.module.scss';
import { raffleBannerTexts } from './RaffleBanner.texts';

interface IRaffleBanner {
  config: {
    textButton: string;
    textTitleDesktop: string;
    textTitleMobile: string;
    textSubtitleDesktop: string;
    textSubtitleMobile: string;
    imageDesktop: string;
    imageMobile: string;
  };
  variant?: 'default' | 'infoModal' | 'fixPosition';
  className?: string;
  onLinkClick?: () => void;
  onBtnClick?: () => void;
  shouldShowTimer?: boolean;
}

export const RaffleBanner: FC<IRaffleBanner> = ({
  config,
  variant,
  className,
  onBtnClick,
  onLinkClick,
  shouldShowTimer,
}) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useBoolean(false);
  const isWlExcludeOtp = useAppSelector(isWLExcludeOtpSelector);
  const isWlOtp = useAppSelector(isWLOtpSelector);
  const countdownText = useCountdown(RaffleCountdownTimerTexts.endTitle, RaffleCountdownTimerTexts.endDate, {
    isWithoutMinutes: true,
  });

  if (isWlExcludeOtp) return null;

  const {
    textButton,
    textTitleMobile,
    textTitleDesktop,
    textSubtitleMobile,
    textSubtitleDesktop,
    imageDesktop,
    imageMobile,
  } = config;

  const onClick = () => {
    if (variant === 'infoModal') {
      onBtnClick?.();
      setIsVisible.on();
    } else {
      onLinkClick?.();
      CustomRouter.push('win3cars');
    }
  };

  const getImageSrc = () => {
    if (isWlOtp && imageOtp) {
      return isMobile ? imageMobile : imageOtp;
    }
    return isMobile ? imageMobile : imageDesktop;
  };

  const getImagePosition = () => {
    if (isWlOtp) {
      return style.imagePositionOtp;
    }
    return style.imagePosition;
  };
  return (
    <>
      <Card
        size={isMobile ? 16 : 24}
        className={isWlOtp ? cn(style.wrapperOtp, className) : cn(style.wrapper, className)}
        onClick={onClick}
      >
        <Space direction={isMobile ? 'vertical' : 'horizontal'}>
          <Space
            direction="vertical"
            justify="center"
          >
            {shouldShowTimer && (
              <Badge
                color="orange"
                variant="primary"
                text={countdownText}
                className="h-mb-4"
              />
            )}
            <Typography.Heading
              level={4}
              className="h-mb-4"
            >
              {isMobile ? textTitleMobile : textTitleDesktop}
            </Typography.Heading>
            {isMobile ? (
              <Typography.Text>{textSubtitleMobile}</Typography.Text>
            ) : (
              <Typography.Heading level={4}>{textSubtitleDesktop}</Typography.Heading>
            )}
          </Space>
          <Space
            className={isMobile ? 'h-mt-12' : ''}
            direction={isMobile ? 'row-reverse' : 'horizontal'}
            align="center"
            justify={isMobile ? 'end' : 'space-around'}
          >
            <img
              src={getImageSrc()}
              alt={raffleBannerTexts.imageAltText}
              width={isMobile ? 213 : 230}
              className={variant === 'fixPosition' || variant === 'infoModal' ? getImagePosition() : style.imageWrapper}
            />
            <Button
              variant={isWlOtp ? 'primary' : 'secondary'}
              size={isMobile ? 36 : 44}
            >
              {textButton}
            </Button>
          </Space>
        </Space>
      </Card>

      {variant === 'infoModal' && (
        <InformationRaffleModal
          isVisible={isVisible}
          onClose={setIsVisible.off}
        />
      )}
    </>
  );
};
