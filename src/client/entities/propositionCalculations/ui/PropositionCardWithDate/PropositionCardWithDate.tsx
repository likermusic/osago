import { Card } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import type { IPropositionCardWithDate } from '../../types';
import { PropositionHeaderWithDate } from '../PropositionHeaderWithDate/PropositionHeaderWithDate';

import styles from './PropositionCardWithDate.module.scss';

export const PropositionCardWithDate: FC<IPropositionCardWithDate> = (props) => {
  const {
    price,
    startDate,
    company,
    children,
    headerActionChildren,
    className,
    isSectionSponsor,
    absoluteTags,
    searchPrice,
    headerBadge,
    isActive,
    onCardClick,
    actionChildren,
    tags,
  } = props;
  const isMobile = useIsMobile();

  return (
    <Card
      size={isMobile ? 16 : 24}
      className={cn(className, styles.card, 'h-cursor-pointer', {
        [styles.sponsor]: isSectionSponsor,
        [styles.active]: isActive,
      })}
      onClick={onCardClick}
    >
      {absoluteTags && <div className={styles.absoluteTags}>{absoluteTags}</div>}

      <PropositionHeaderWithDate
        company={company}
        price={price}
        searchPrice={searchPrice}
        startDate={startDate}
        headerActionChildren={headerActionChildren}
        headerBadge={headerBadge}
        actionChildren={actionChildren}
        tags={tags}
      />

      {children}
    </Card>
  );
};
