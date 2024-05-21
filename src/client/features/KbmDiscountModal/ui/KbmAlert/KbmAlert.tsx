import { Alert, Typography } from '@sravni/react-design-system';

import { getKbmAlert } from '../../lib/getKbmAlert';
import type { IKbmDiscountDriver } from '../../types';

import styles from './KbmAlert.module.scss';

type TKbmAlert = {
  drivers: IKbmDiscountDriver[];
  className?: string;
};
export const KbmAlert: FC<TKbmAlert> = ({ drivers, className }) => {
  const alertText = getKbmAlert(drivers);

  return alertText?.firstText ? (
    <Alert
      color="orange"
      className={className}
    >
      <Typography.Text>
        {alertText.firstText}
        {alertText.names && <span className={styles.bold}>{alertText.names}</span>}
        {alertText.secondText}
      </Typography.Text>
    </Alert>
  ) : null;
};
