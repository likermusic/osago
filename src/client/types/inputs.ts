import type { MaskInputProps } from '@sravni/react-design-system/dist/types/components/MaskInput';
import type { SelectOption } from '@sravni/react-design-system/dist/types/types/Select.types';

export type CustomSelectValue<Data = Record<string, any>> = {
  value: SelectOption['value'];
  label?: SelectOption['label'];
  data?: Data;
};

export type CustomSelectOption = {
  data?: Record<string, any>;
} & SelectOption;

export type CustomInput = {
  maskPlaceholder?: string;
  autoFocus?: boolean;
} & MaskInputProps;
