import { Button, Icon } from '@sravni/react-design-system';
import { User } from '@sravni/react-icons';
import React from 'react';

import { AddDriverButtonTexts } from './AddDriverButton.texts';

type TProps = {
  onClick: () => void;
};

const AddDriverButton: FC<TProps> = ({ onClick }) => (
  <Button
    data-qa="drivers-add-new-one"
    onClick={onClick}
    type="submit"
    variant="secondary"
    size={52}
  >
    <Icon icon={<User />} />
    {AddDriverButtonTexts.btnText}
  </Button>
);

export default AddDriverButton;
