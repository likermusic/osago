import { UI } from '@sravni/cosago-react-library/lib/components';
import { FormControl, Icon, Spinner, TextInput, Tooltip } from '@sravni/react-design-system';
import { Tooltip as IconTooltip } from '@sravni/react-icons';

import { sendEventKbmFieldClick } from 'shared/lib/sendGAEvents';
import type { TKbmFieldWithAlert } from 'shared/types/TKbmFieldWithAlert';

import { getKbmDiscountInfo } from '../../lib';

import { KbmFieldAlert } from './KbmFieldAlert';
import styles from './KbmFieldWithAlert.module.scss';
import { KbmFieldWithAlertTexts, getKbmDiscountInfoByFieldStatuses } from './KbmFieldWithAlert.texts';

type TKbmFieldWithAlertProps = Partial<TKbmFieldWithAlert> & { setPreviousLicenseYes: () => void };

export const KbmFieldWithAlert: FC<TKbmFieldWithAlertProps> = ({ value, status = 'noData', setPreviousLicenseYes }) => {
  const { discountPercent, status: kbmStatus } = getKbmDiscountInfo(value);
  const { fieldTitle, hint, alertInfo } = getKbmDiscountInfoByFieldStatuses(value, discountPercent, kbmStatus, status);

  return (
    // Form.Row внутри формы, тк он строит колонки по чилдренам(если нужно кастомизировать, добавьте колонки пропсами)
    <UI.Form.Row colWidths={[4, 8]}>
      <Tooltip
        content={KbmFieldWithAlertTexts.tooltipInfo}
        placement="bottom-end"
      >
        <FormControl>
          <TextInput
            onClick={sendEventKbmFieldClick}
            background="light"
            className={styles.input}
            readOnly
            value={fieldTitle}
            icon={status === 'loading' ? <Spinner /> : <Icon icon={<IconTooltip />} />}
            label={fieldTitle ? KbmFieldWithAlertTexts.label : KbmFieldWithAlertTexts.labelShort}
          />
          {hint && <FormControl.HelperText className={styles.helperText}>{hint}</FormControl.HelperText>}
        </FormControl>
      </Tooltip>

      <KbmFieldAlert
        setPreviousLicenseYes={setPreviousLicenseYes}
        alertInfo={alertInfo}
      />
    </UI.Form.Row>
  );
};
