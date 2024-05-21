import { Button } from '@sravni/react-design-system';

export const LeftBtn: FC<{ onClick?: () => void }> = ({ children, className, onClick }) => (
  <Button
    className={className}
    variant="outlined"
    size={52}
    onClick={onClick}
  >
    {children}
  </Button>
);
