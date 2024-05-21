import { UI } from '@sravni/cosago-react-library/lib/components';
import { Button, FormControl, Icon, Space, TextInput } from '@sravni/react-design-system';
import { ArrowRight } from '@sravni/react-icons';
import cn from 'classnames';
import { useCallback, useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { promocodeSelector } from 'entities/propositionCalculations';

import { PromocodeTexts } from '../../lib/Promocode.texts';

import styles from './PromocodeInputModal.module.scss';

interface IPromocodeInputModalProps {
  isVisible: boolean;
  onClose: () => void;
  disabled: boolean;
  error: string;
  onSubmit: (code: string) => void;
}

export const PromocodeInputModal: FC<IPromocodeInputModalProps> = ({
  isVisible,
  onClose,
  disabled,
  error,
  onSubmit,
  className,
}) => {
  const promocode = useAppSelector(promocodeSelector);
  const [value, setValue] = useState(promocode || '');

  const onPromoInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  const onFormSubmit = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(value);
    },
    [onSubmit, value],
  );

  return (
    <UI.Popup
      className={className}
      visible={isVisible}
      onClose={onClose}
      title={PromocodeTexts.modalTitle}
    >
      <form onSubmit={onFormSubmit}>
        <FormControl invalid={!!error}>
          <Space className={styles.inputWrapper}>
            <TextInput
              className={cn(styles.input, 'h-text-left')}
              disabled={disabled}
              label={PromocodeTexts.inputLabel}
              onChange={onPromoInputChange}
              value={value}
            />
            <Button
              className={styles.btn}
              color="gray"
              loading={disabled}
              variant="primary"
              size={60}
            >
              <Icon icon={<ArrowRight />} />
            </Button>
          </Space>
          <FormControl.HelperText className="h-text-left">{error}</FormControl.HelperText>
        </FormControl>
      </form>
    </UI.Popup>
  );
};
