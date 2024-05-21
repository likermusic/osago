import { Button } from '@sravni/react-design-system';

import { MoreBtnTexts } from './MoreBtn.texts';

interface IMoreBtn {
  onClick: () => void;
}

export const MoreBtn: FC<IMoreBtn> = ({ className, onClick }) => (
  <Button
    className={className}
    onClick={onClick}
    variant="secondary"
  >
    {MoreBtnTexts.btnText}
  </Button>
);
