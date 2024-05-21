import { useIsMobileOnly } from '@sravni/cosago-react-library/lib/hooks';
import { Button } from '@sravni/react-design-system';
import React from 'react';

import { RemoveDriverButtonTexts } from './RemoveDriverButton.texts';

type TProps = {
  onClick: () => void;
};

const RemoveDriverButton: FC<TProps> = ({ onClick }) => {
  const isMobile = useIsMobileOnly();

  return (
    <Button
      block={isMobile}
      data-qa="drivers-remove-driver"
      onClick={onClick}
      type="button"
      variant="outlined"
      color="red"
      size={52}
    >
      {RemoveDriverButtonTexts.btnText}
    </Button>
  );
};

export default RemoveDriverButton;
