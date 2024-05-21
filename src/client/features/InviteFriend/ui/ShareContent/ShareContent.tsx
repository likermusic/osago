import { Space, Button, Typography } from '@sravni/react-design-system';
import { Copy } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { useAppSelector } from 'shared/lib/redux';

import { inviteLinkSelector } from '../../model/inviteFriend.selectors';
import { InviteFriendTexts } from '../InviteFriend.texts';

import { ShareMediasConfig } from './ShareContent.config';
import styles from './ShareContent.module.scss';

interface IShareContentProps {
  onCopyClick: () => void;
}

export const ShareContent: FC<IShareContentProps> = ({ onCopyClick }) => {
  const isMobile = useIsMobile();
  const inviteLink = useAppSelector(inviteLinkSelector);

  if (!inviteLink) return null;

  return (
    <Space
      size={12}
      justify="center"
      align="center"
    >
      {ShareMediasConfig.map(({ Logo, title, getLink, sendEvent }) => (
        <Typography.Link
          key={title}
          className={styles.shareLink}
          href={getLink(inviteLink)}
          target="__blank"
          onClick={sendEvent}
        >
          <Logo className={styles.shareContainer} />
          {isMobile && <Typography.Text size={12}>{title}</Typography.Text>}
        </Typography.Link>
      ))}
      <span className={styles.shareLink}>
        <Button
          className={cn(styles.shareContainer, styles.copyIconBtn)}
          color="gray"
          variant="secondary"
          onClick={onCopyClick}
        >
          <Copy className={styles.copyIcon} />
        </Button>
        {isMobile && <Typography.Text size={12}>{InviteFriendTexts.copy}</Typography.Text>}
      </span>
    </Space>
  );
};
