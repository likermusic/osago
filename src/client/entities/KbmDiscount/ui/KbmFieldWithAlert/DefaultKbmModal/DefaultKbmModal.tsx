import { UI } from '@sravni/cosago-react-library/lib/components';
import { Button, Typography } from '@sravni/react-design-system';

import styles from './DefaultKbmModal.module.scss';
import { DefaultKbmModalTexts } from './DefaultKbmModal.texts';

export const DefaultKbmModal: FC<{ visible: boolean; onClose: () => void; onPreviousLicenseClick: () => void }> = ({
  visible,
  onClose,
  onPreviousLicenseClick,
}) => (
  <UI.Popup
    visible={visible}
    onClose={onClose}
    title={DefaultKbmModalTexts.title}
    desktopSize="small"
    controls={
      <Button
        className={styles.btn}
        variant="primary"
        size={52}
        onClick={onClose}
      >
        {DefaultKbmModalTexts.btn}
      </Button>
    }
  >
    <Typography.Text size={14}>
      <Typography.OrderedList className="h-text-left">
        {DefaultKbmModalTexts.text}

        {DefaultKbmModalTexts.opts.map(({ text, link }) => (
          <Typography.ListItem key={text}>
            {text}

            {!!link && <Typography.Link onClick={onPreviousLicenseClick}>{link}</Typography.Link>}
          </Typography.ListItem>
        ))}

        <span className="h-mt-16">{DefaultKbmModalTexts.after}</span>
      </Typography.OrderedList>
    </Typography.Text>
  </UI.Popup>
);
