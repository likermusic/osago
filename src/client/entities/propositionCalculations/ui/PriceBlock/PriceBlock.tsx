import { Skeleton, Typography } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';
import cn from 'classnames';

import { formatPrice } from 'shared/lib/formatters';

import type { IPropositionHeaderMain } from '../../types';

import styles from './PriceBlock.module.scss';

export const PriceBlock: FC<Pick<IPropositionHeaderMain, 'searchPrice' | 'price'>> = ({
  searchPrice,
  className,
  price,
}) => {
  const isEqualPrice = searchPrice === price;
  const isPhone = useIsPhone();

  return (
    <div className={cn(styles.price, className)}>
      {price ? (
        <Typography.Heading level={isPhone ? 3 : 4}>{formatPrice(price)}</Typography.Heading>
      ) : (
        <Skeleton.Paragraph width={80} />
      )}

      {!!searchPrice && !isEqualPrice && (
        <Typography.Text
          className={cn('h-color-D60', styles.oldPrice)}
          size={12}
        >
          {formatPrice(searchPrice)}
        </Typography.Text>
      )}
    </div>
  );
};
