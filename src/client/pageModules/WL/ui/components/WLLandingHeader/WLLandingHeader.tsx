import { Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { OptimizedPicture } from 'shared/ui/OptimizedPicture';

import AutoPNG from '../../../assets/Auto.png';
import AutoSVG from '../../../assets/Auto.svg';

import styles from './WLLandingHeader.module.scss';
import { WLLandingHeaderTexts } from './WLLandingHeader.texts';

export const WLLandingHeader = () => {
  const isMobile = useIsMobile();

  return (
    <Space
      direction="horizontal"
      align="center"
    >
      <Space
        direction="vertical"
        size={isMobile ? 8 : 16}
        className={styles.textContainer}
      >
        <Typography.Heading
          className={styles.title}
          level={2}
        >
          {WLLandingHeaderTexts.title}
        </Typography.Heading>

        <Typography.Text
          className={styles.text}
          size={isMobile ? 14 : 16}
        >
          {WLLandingHeaderTexts.subtitle}
        </Typography.Text>
      </Space>

      <div className={styles.car}>
        <OptimizedPicture
          img={AutoPNG}
          alt={WLLandingHeaderTexts.altImage}
          width={355}
          className={styles.pngCar}
        />
        <AutoSVG className={styles.svgCar} />
      </div>
    </Space>
  );
};
