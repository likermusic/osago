import { Button } from '@sravni/react-design-system';
import type { MouseEventHandler } from 'react';

import { ApplyButtonText } from './ApplyButton.texts';

export const ApplyButton: FC<{ onClick?: MouseEventHandler<HTMLButtonElement>; block?: boolean }> = ({
  block,
  onClick,
  className,
}) => (
  <Button
    block={block}
    variant="primary"
    color="gray"
    onClick={onClick}
    className={className}
  >
    {ApplyButtonText}
  </Button>
);
