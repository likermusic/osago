import { Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { useAppSelector } from 'shared/lib/redux';

import { seoCoeffsSelector } from 'entities/metadata';

import styles from './SeoCoeffs.module.scss';

const { Heading } = Typography;

export const SeoCoeffs: FC = ({ className }) => {
  const isMobile = useIsMobile();

  const coeffsBlock = useAppSelector(seoCoeffsSelector)?.text?.[0];
  if (!coeffsBlock) return null;

  return (
    <div className={cn(styles.wrapper, className)}>
      <Heading
        level={isMobile ? 2 : 3}
        className="h-color-D80"
      >
        {coeffsBlock?.title}
      </Heading>
      <div
        className={styles.seoWrapper}
        dangerouslySetInnerHTML={{ __html: coeffsBlock?.text }}
      />
    </div>
  );
};
