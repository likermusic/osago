import { Space, Typography } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';

import { OfferTag } from 'shared/ui';

import type { IPropositionHeaderWithDate } from '../../types';
import { PriceBlock } from '../PriceBlock/PriceBlock';

import styles from './PriceBlockWithTags.module.scss';
import { PriceBlockWithTagsTexts } from './PriceBlockWithTags.texts';

export const PriceBlockWithTags: FC<Pick<IPropositionHeaderWithDate, 'searchPrice' | 'price' | 'tags'>> = ({
  className,
  searchPrice,
  price,
  tags,
}) => {
  const isPhone = useIsPhone();

  return (
    <div className={className}>
      <Space
        justify={isPhone ? 'space-between' : 'end'}
        align="center"
        size={8}
        wrap
      >
        {isPhone && <Typography.Heading level={4}>{PriceBlockWithTagsTexts.title}</Typography.Heading>}

        <PriceBlock
          price={price}
          searchPrice={searchPrice}
          className={styles.priceBlock}
        />
      </Space>

      {!!tags?.length && (
        <Space
          size={8}
          justify={isPhone ? 'end' : 'start'}
          wrap={isPhone}
        >
          {tags.map((tag) => (
            <OfferTag
              key={String(tag.title) + String(tag.text)}
              {...tag}
            />
          ))}
        </Space>
      )}
    </div>
  );
};
