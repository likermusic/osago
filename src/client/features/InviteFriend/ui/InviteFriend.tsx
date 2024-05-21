import {
  Badge,
  Button,
  Card,
  Icon,
  NotificationManager,
  Space,
  TextInput,
  Typography,
} from '@sravni/react-design-system';
import { Copy, Share } from '@sravni/react-icons';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import { throttle } from 'lodash';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventCopyInviteLink, sendEventShareButtonClick } from 'shared/lib/sendGAEvents';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import InviteFriendImg from '../assets/inviteFriend.svg';
import { useGetInviteLink } from '../model/inviteFriend.query';
import { inviteLinkSelector, isInviteLinkLoadingSelector } from '../model/inviteFriend.selectors';

import styles from './InviteFriend.module.scss';
import { InviteFriendTexts } from './InviteFriend.texts';
import { ShareTooltip } from './ShareTooltip/ShareTooltip';

export const InviteFriend: FC<{ orderHash?: string | string[] }> = ({ className, orderHash }) => {
  const isMobile = useIsMobile();
  const [isTooltipVisible, setTooltip] = useBoolean();
  const [isCopyClicked, setIsCopyClicked] = useBoolean();
  const [isShareClicked, setIsShareClicked] = useBoolean();
  useGetInviteLink(orderHash);

  const inviteLink = useAppSelector(inviteLinkSelector);
  const isInviteLinkLoading = useAppSelector(isInviteLinkLoadingSelector) || !inviteLink;

  const copyInviteLink = throttle(async () => {
    try {
      await navigator.clipboard.writeText(inviteLink || '');

      NotificationManager.show(InviteFriendTexts.successNotification, '', '', 5000, 'success');

      if (isMobile && isTooltipVisible) setTooltip.off();

      if (!isCopyClicked) {
        sendEventCopyInviteLink();
        setIsCopyClicked.on();
      }
    } catch (err) {
      NotificationManager.show(InviteFriendTexts.errorCopyLinkNotification, '', '', 5000, 'info');

      sendSentryClientErrorOnce(true, 'Ошибка при копировании ссылки на success page в InviteFriend', {
        level: 'log',
        error: JSON.stringify(err),
      });
    }
  }, 1000);

  const onShareButtonClick = async () => {
    try {
      if (navigator.share && isMobile) {
        await navigator.share({
          title: InviteFriendTexts.shareTextForWebApi,
          url: `https://${inviteLink}`,
        });
      } else {
        setTooltip.on();
      }
    } catch (err) {
      // Все ошибки, кроме ошибки, которая происходит при закрытии модалки шаринга(AbortError), тк это по сути не ошибка
      if (!err.toString().includes('AbortError')) {
        NotificationManager.show(InviteFriendTexts.errorSharingLinkNotification, '', '', 5000, 'info');

        sendSentryClientErrorOnce(true, 'Ошибка при шаринге ссылки на success page в InviteFriend', {
          level: 'log',
          error: JSON.stringify(err),
        });
      }
    }

    if (!isShareClicked) {
      sendEventShareButtonClick();
      setIsShareClicked.on();
    }
  };

  return (
    <Card
      color="green"
      variant="primary"
      className={cn(className, styles.card)}
      size={isMobile ? 16 : 24}
    >
      <Space
        direction="vertical"
        size={16}
        className={styles.content}
      >
        <div>
          <Typography.Heading level={5}>{InviteFriendTexts.title}</Typography.Heading>
          <Typography.Text
            size={12}
            className="h-color-D60"
          >
            {InviteFriendTexts.subtitle}
          </Typography.Text>
        </div>

        <Space
          direction="vertical"
          size={8}
        >
          <Space size={8}>
            <Badge
              text={1}
              variant="primary"
            />
            <Typography.Text size={12}>{InviteFriendTexts.step1}</Typography.Text>
          </Space>
          <Space size={8}>
            <Badge
              text={2}
              variant="primary"
            />
            <Typography.Text size={12}>{InviteFriendTexts.step2}</Typography.Text>
          </Space>
        </Space>

        <Space className={styles.copyWrapper}>
          <>
            <TextInput
              className={styles.copyInput}
              type="url"
              label={isInviteLinkLoading ? InviteFriendTexts.loadingText : InviteFriendTexts.inputLabel}
              disabled={isInviteLinkLoading}
              loading={isInviteLinkLoading}
              value={inviteLink || ''}
              background="light"
              icon={<Copy color="black" />}
              readOnly
              onClick={copyInviteLink}
            />

            <Button
              className={styles.shareButton}
              variant="primary"
              disabled={isInviteLinkLoading}
              onClick={onShareButtonClick}
            >
              {isMobile ? InviteFriendTexts.shareBtn : <Icon icon={<Share />} />}
            </Button>
            <ShareTooltip
              isVisible={isTooltipVisible}
              onClose={setTooltip.off}
              className={styles.tooltip}
              onCopyClick={copyInviteLink}
            />
          </>
        </Space>
      </Space>

      <InviteFriendImg className={styles.inviteImg} />
    </Card>
  );
};
