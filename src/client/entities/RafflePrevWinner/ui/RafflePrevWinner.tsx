import { UI } from '@sravni/cosago-react-library/lib/components';
import { Button, Card, Space, Typography } from '@sravni/react-design-system';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import { useEffect } from 'react';

import { useGetUrlQueryReplacer } from 'shared/lib';
import { useDeeplink } from 'shared/lib/useDeeplink';

import CatImg from '../assets/cat.svg';

import styles from './RafflePrevWinner.module.scss';
import { RafflePrevWinnerTexts } from './RafflePrevWinner.texts';

export const RafflePrevWinner: FC = ({ className }) => {
  const isMobile = useIsMobile();
  const [isModalVisible, setModalVisible] = useBoolean();
  const {
    params: { raffleModalType },
  } = useDeeplink();
  const replaceQuery = useGetUrlQueryReplacer();

  useEffect(() => {
    if (raffleModalType === 'prevWinner') {
      setModalVisible.on();
    }
    // setModalVisible в зависимостях не дает закрыться модалке
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raffleModalType]);

  useEffect(() => {
    if (raffleModalType) replaceQuery({ raffleModalType: '' });
  }, [raffleModalType, replaceQuery]);

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        color="blue"
      >
        <Typography.Heading
          className={styles.title}
          level={isMobile ? 6 : 4}
        >
          {RafflePrevWinnerTexts.title}
        </Typography.Heading>
        <CatImg className={styles.img} />

        <Button
          variant="primary"
          onClick={setModalVisible.on}
        >
          {RafflePrevWinnerTexts.btnTitle}
        </Button>
      </Card>

      <UI.Popup
        visible={isModalVisible}
        closable
        fullscreen
        onClose={setModalVisible.off}
        title={RafflePrevWinnerTexts.videoTitle}
      >
        <iframe
          title={RafflePrevWinnerTexts.videoTitle}
          className={styles.iframe}
          src={RafflePrevWinnerTexts.videoUrl}
          allowFullScreen
        />

        <Space justify="end">
          <Button
            onClick={setModalVisible.off}
            block={isMobile}
            variant="primary"
            size={52}
            className={styles.closeButton}
          >
            {RafflePrevWinnerTexts.closeButton}
          </Button>
        </Space>
      </UI.Popup>
    </>
  );
};
