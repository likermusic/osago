import { Card, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { OfferTag } from 'shared/ui';

import type { IPropositionCardMain } from '../../types';
import { PropositionHeaderMain } from '../PropositionHeaderMain/PropositionHeaderMain';

import styles from './PropositionCardMain.module.scss';

export const PropositionCardMain: FC<IPropositionCardMain> = (props) => {
  const {
    price,
    advantages,
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
    tags,
  } = props;

  const isMobile = useIsMobile();

  return (
    <Card
      className={cn(className, styles.card, 'h-cursor-pointer', {
        [styles.sponsor]: isSectionSponsor,
        [styles.active]: isActive,
      })}
      onClick={onCardClick}
      size={isMobile ? 16 : 24}
    >
      {absoluteTags && <div className={styles.absoluteTags}>{absoluteTags}</div>}

      <PropositionHeaderMain
        company={company}
        price={price}
        advantages={advantages}
        searchPrice={searchPrice}
        headerActionChildren={headerActionChildren}
        headerBadge={headerBadge}
      />
      {!!tags?.length && (
        <Space size={8}>
          {tags.map((tag) => (
            <OfferTag
              key={String(tag.title) + String(tag.text)}
              {...tag}
            />
          ))}
        </Space>
      )}

      {children}
    </Card>
  );
};
