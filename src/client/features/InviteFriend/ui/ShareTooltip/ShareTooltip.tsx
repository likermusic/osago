import { Card, Sheet, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile, useOutsideClick } from '@sravni/react-utils';
import { useRef } from 'react';

import { InviteFriendTexts } from '../InviteFriend.texts';
import { ShareContent } from '../ShareContent/ShareContent';

interface IShareTooltipProps {
  isVisible: boolean;
  onClose: () => void;
  onCopyClick: () => void;
}

export const ShareTooltip: FC<IShareTooltipProps> = ({ className, isVisible, onClose, onCopyClick }) => {
  const isMobile = useIsMobile();
  const tooltipRef = useRef<HTMLDivElement>(null);
  useOutsideClick(tooltipRef, onClose);

  if (!isVisible) return null;

  return isMobile ? (
    <Sheet
      visible={isVisible}
      onClose={onClose}
    >
      <Sheet.Header title={InviteFriendTexts.shareText} />
      <Sheet.Content>
        <ShareContent onCopyClick={onCopyClick} />
      </Sheet.Content>
    </Sheet>
  ) : (
    <Card
      className={className}
      shadow
      size={16}
      ref={tooltipRef}
    >
      <Space
        direction="vertical"
        size={8}
      >
        <Typography.Text
          strong
          size={14}
        >
          {InviteFriendTexts.shareText}
        </Typography.Text>

        <ShareContent onCopyClick={onCopyClick} />
      </Space>
    </Card>
  );
};
