import { Button } from '@sravni/react-design-system';

export const RightBtn: FC<{ onClick?: () => void; disabled?: boolean; isLoading?: boolean }> = ({
  onClick,
  children,
  disabled,
  className,
  isLoading,
}) => (
  <Button
    className={className}
    variant="primary"
    size={52}
    onClick={onClick}
    disabled={disabled}
    loading={isLoading}
  >
    {children}
  </Button>
);
