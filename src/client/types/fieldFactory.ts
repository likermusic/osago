import type { Forms } from './clientForms';

export interface FieldFactoryProps {
  type: Forms.FieldName;
  label?: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  isMobileFlow?: boolean;
  onSideActionComplete?: (actionName: string, payload?: unknown) => void;
  onBlur?: () => void;
}
