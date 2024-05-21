import { UI } from '@sravni/cosago-react-library/lib/components';
import { Badge, Button, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { usePropositionPageScroll } from 'shared/lib/usePageScroll';
import { LinkInText } from 'shared/ui';

import { SUMMARY_NAV_BLOCK_ID_MAP } from './NoPropositionsModal.config';
import styles from './NoPropositionsModal.module.scss';
import { NoPropositionsModalTexts } from './NoPropositionsModal.texts';

interface INoPropositionsModal {
  isVisible: boolean;
  onClose: () => void;
}

export const NoPropositionsModal: FC<INoPropositionsModal> = ({ isVisible, onClose }) => {
  const isMobile = useIsMobile();
  const { openSummaryBlockById, navigateToAnketa } = usePropositionPageScroll();

  const handleClickOnLink = (selectedTipId: string) => {
    const blockId = SUMMARY_NAV_BLOCK_ID_MAP[selectedTipId];
    if (!blockId) {
      navigateToAnketa();
    } else {
      openSummaryBlockById(blockId);
    }

    onClose();
  };

  return (
    <UI.Popup
      closable={false}
      desktopSize="small"
      onClose={onClose}
      visible={isVisible}
      title={NoPropositionsModalTexts.title}
    >
      <Space
        className="h-text-left"
        direction="vertical"
        size={40}
      >
        <Space
          direction="vertical"
          size={isMobile ? 16 : 24}
        >
          {NoPropositionsModalTexts.steps.map((step) => (
            <Space
              direction="vertical"
              key={step.idx}
              size={4}
            >
              <Space size={8}>
                <Badge
                  text={step.idx}
                  shape="circle"
                  variant="primary"
                />
                <Typography.Text
                  size={16}
                  strong
                >
                  {step.title}
                </Typography.Text>
              </Space>
              <Typography.Text size={12}>
                <LinkInText
                  linkId={step.idx.toString()}
                  text={step.subtitle}
                  linkPlace={step.linkPlace}
                  onLinkClicked={handleClickOnLink}
                />
              </Typography.Text>
            </Space>
          ))}
        </Space>

        <Button
          block={isMobile}
          className={styles.btn}
          onClick={onClose}
          size={52}
          variant="primary"
        >
          {NoPropositionsModalTexts.btnText}
        </Button>
      </Space>
    </UI.Popup>
  );
};
