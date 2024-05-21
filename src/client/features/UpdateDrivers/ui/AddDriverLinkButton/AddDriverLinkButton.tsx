import { withoutPropagation } from '@sravni/cosago-react-library/lib/utils';
import { Button } from '@sravni/react-design-system';

import { AddDriverLinkButtonTexts } from './AddDriverLinkButton.texts';

interface IAddDriverLinkButton {
  onClick: () => void;
}

export const AddDriverLinkButton: FC<IAddDriverLinkButton> = ({ onClick }) => (
  <Button
    onClick={withoutPropagation(onClick)}
    variant="outlined"
    size={36}
  >
    {AddDriverLinkButtonTexts.btnText}
  </Button>
);
