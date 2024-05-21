import { Badge, Space, Typography } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';

import { getDateWithText } from 'shared/lib/getDateWithText';

import type { IPropositionHeaderWithDate } from '../../types';
import { LogoBlock } from '../LogoBlock/LogoBlock';
import { PriceBlockWithTags } from '../PriceBlockWithTags/PriceBlockWithTags';

import styles from './PropositionHeaderWithDate.module.scss';

export const PropositionHeaderWithDate: FC<IPropositionHeaderWithDate> = (props) => {
  const { company, startDate, headerActionChildren, price, tags, searchPrice, headerBadge, className, actionChildren } =
    props;
  const isPhone = useIsPhone();

  return (
    <Space
      className={className}
      size={[12, 16]}
      align="center"
      justify="start"
    >
      <LogoBlock company={company} />

      <Space
        justify="space-between"
        direction="vertical"
        className={styles.companyText}
      >
        <Typography.Text
          size={16}
          strong
          className={styles.startDate}
          nowrap
          as="p"
        >
          {getDateWithText(startDate)}
        </Typography.Text>

        <Typography.Text
          as="span"
          size={12}
        >
          {company?.companyName && `От ${company?.companyName} на 1 год`}
        </Typography.Text>
      </Space>

      <Space
        size={16}
        align="center"
        className={styles.rightContainer}
      >
        <Space
          justify="center"
          align="center"
          size={16}
        >
          {!isPhone && (
            <PriceBlockWithTags
              price={price}
              searchPrice={searchPrice}
              tags={tags}
            />
          )}
          {actionChildren}

          {headerBadge && <Badge {...headerBadge} />}
        </Space>
        {headerActionChildren}
      </Space>
    </Space>
  );
};
