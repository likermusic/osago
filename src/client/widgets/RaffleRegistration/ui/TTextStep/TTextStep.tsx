import { Button, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import CatImg from '../../assets/successCat.svg';
import type { TTextStepProps } from '../../types';

import styles from './TTextStep.module.scss';
import { CLOSE_BTN_TITLE } from './TTextStep.texts';

export const TTextStep: FC<TTextStepProps> = ({ title, subtitle, isSubtitleBold, linkText, onClose }) => {
  const isMobile = useIsMobile();

  return (
    <Space
      direction="vertical"
      align="center"
      size={isMobile ? 8 : 12}
      className="h-text-center"
    >
      <CatImg
        width={isMobile ? 137 : 167}
        height={isMobile ? 80 : 119}
      />

      <Typography.Heading level={3}>{title}</Typography.Heading>

      <div>
        <Typography.Text
          className={cn(!isSubtitleBold && 'h-color-D60', isMobile ? 'h-mb-8' : 'h-mb-12')}
          size={14}
        >
          {subtitle}
          {linkText && <Typography.Link onClick={onClose}>{linkText}</Typography.Link>}
        </Typography.Text>
      </div>

      {isMobile && (
        <Button
          className={cn('h-mt-16', styles.btn)}
          variant="primary"
          size={52}
          onClick={onClose}
        >
          {CLOSE_BTN_TITLE}
        </Button>
      )}
    </Space>
  );
};
