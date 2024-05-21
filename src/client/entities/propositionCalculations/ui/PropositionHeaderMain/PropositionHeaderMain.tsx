import { Badge, Space } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';

import { RateWithTitle } from 'shared/ui/RateWithTitle';

import type { IPropositionHeaderMain } from '../../types';
import { AdvantagesBlock } from '../AdvantagesBlock/AdvantagesBlock';
import { CompanyNameBlock } from '../CompanyNameBlock/CompanyNameBlock';
import { LogoBlock } from '../LogoBlock/LogoBlock';
import { PriceBlock } from '../PriceBlock/PriceBlock';

import styles from './PropositionHeaderMain.module.scss';

const RATE_AMOUNT = 1;

export const PropositionHeaderMain: FC<IPropositionHeaderMain> = (props) => {
  const { company, advantages, headerActionChildren, price, searchPrice, headerBadge, className } = props;
  const { averageRating } = company || {};
  const isPhone = useIsPhone();

  return (
    <Space
      size={16}
      direction="vertical"
    >
      <Space
        // wrap={isMobile}
        className={className}
        size={12}
        align="center"
        justify="start"
      >
        <LogoBlock company={company} />

        <Space
          justify="space-between"
          direction="vertical"
          className={styles.companyText}
        >
          <CompanyNameBlock company={company} />

          {!!averageRating && (
            <RateWithTitle
              size={16}
              // по дизайну сейчас показываем одну звездочку
              defaultValue={RATE_AMOUNT}
              value={RATE_AMOUNT}
              count={RATE_AMOUNT}
              textProps={{ size: 12 }}
              allowHalf
            >
              {averageRating}
            </RateWithTitle>
          )}
        </Space>

        {!isPhone && (
          <AdvantagesBlock
            advantages={advantages}
            className={styles.advantages}
          />
        )}

        <Space
          size={16}
          align="center"
          className={styles.rightContainer}
        >
          <Space
            direction="vertical"
            justify="center"
            align="end"
            className={styles.priceWithHeader}
          >
            <PriceBlock
              price={price}
              searchPrice={searchPrice}
            />

            {headerBadge && <Badge {...headerBadge} />}
          </Space>
          {headerActionChildren}
        </Space>
      </Space>
      {isPhone && (
        <AdvantagesBlock
          advantages={advantages}
          className={styles.advantages}
        />
      )}
    </Space>
  );
};
