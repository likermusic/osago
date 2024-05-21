import { withoutPropagation } from '@sravni/cosago-react-library/lib/utils';
import { Button } from '@sravni/react-design-system';
import cn from 'classnames';

import styles from './OpenModalBtn.module.scss';
import { OpenModalBtnTexts } from './OpenModalBtn.texts';

interface IOpenModalBtn {
  onClick: () => void;
}

export const OpenModalBtn: FC<IOpenModalBtn> = ({ className, onClick }) => (
  <Button
    className={cn(className, styles.btn)}
    color="blue"
    onClick={withoutPropagation(onClick)}
    variant="text"
  >
    {OpenModalBtnTexts.btnText}
  </Button>
);
