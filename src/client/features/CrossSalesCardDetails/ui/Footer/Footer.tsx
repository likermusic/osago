import { Button, Space, Typography } from '@sravni/react-design-system';

import type { CrossTypes } from 'shared/config/cross';
import { formatPrice } from 'shared/lib/formatters';

import { LoaderStatuses } from '../../types';
import { Loader } from '../Loader';

import styles from './Footer.module.scss';
import { FooterTexts } from './Footer.texts';

const { Heading } = Typography;

interface IFooter {
  onClick: () => void;
  price: number;
  status: LoaderStatuses;
  type: CrossTypes;
}

export const Footer: FC<IFooter> = ({ onClick, price, status, type }) => (
  <div className={styles.container}>
    {(status === LoaderStatuses.loading || status === LoaderStatuses.finished || status === LoaderStatuses.error) && (
      <Loader
        status={status}
        type={type}
        className={styles.loader}
      />
    )}

    <Space
      align="center"
      justify="space-between"
    >
      <Heading
        level={3}
        className={styles.price}
      >
        {formatPrice(price)}
      </Heading>
      <Button
        className={styles.cardButton}
        variant="primary"
        color="gray"
        onClick={onClick}
        size={52}
        disabled={status === LoaderStatuses.loading}
      >
        {FooterTexts.button[status]}
      </Button>
    </Space>
  </div>
);
