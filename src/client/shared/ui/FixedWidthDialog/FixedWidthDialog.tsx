import { Dialog } from '@sravni/react-design-system';
import type { DialogProps } from '@sravni/react-design-system/dist/types/components/Dialog/types/Dialog.types';
import cn from 'classnames';

import styles from './FixedWidthDialog.module.scss';

type FixedWidthDialogProps = DialogProps;

export const FixedWidthDialog: FC<FixedWidthDialogProps> = ({ children, className, ...props }) => (
  <Dialog
    {...props}
    className={cn(styles.fixedWidth, className)}
  >
    {children}
  </Dialog>
);
