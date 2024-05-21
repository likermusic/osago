import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import { cleanFullNameString } from '@sravni/cosago-react-library/lib/utils';
import { FormControl, Icon, TextInput } from '@sravni/react-design-system';
import { Cross } from '@sravni/react-icons';
import { useState } from 'react';

export const PrevLastName: FC<IFieldFactoryProps> = ({ type, ...props }) => {
  const { setValue, watch, getFieldState, clearErrors, trigger } = useFormContext();
  const formValue = watch(type);
  const [currentValue, setCurrentValue] = useState(formValue);
  const { error } = getFieldState(type);

  // Сделано не через ControlledTextInput, чтобы сетить значение в форму на onBlur, чтобы не дудосить бэк запросами кбм на каждый onChange
  return (
    <FormControl invalid={!!error?.message}>
      <TextInput
        {...props}
        value={currentValue}
        icon={
          !!currentValue && (
            <Icon
              icon={<Cross />}
              className="h-cursor-pointer"
              onClick={() => {
                setCurrentValue('');
                setValue(type, '');
              }}
            />
          )
        }
        autoFocus={!formValue}
        name={type}
        type="text"
        onFocus={() => {
          if (error?.message) clearErrors(type);
        }}
        onChange={(e) => {
          setCurrentValue(cleanFullNameString(e.currentTarget.value));
        }}
        onBlur={(e) => {
          setValue(type, e.currentTarget.value);
          trigger(type);
        }}
      />
      {error?.message && <FormControl.HelperText>{error?.message}</FormControl.HelperText>}
    </FormControl>
  );
};
