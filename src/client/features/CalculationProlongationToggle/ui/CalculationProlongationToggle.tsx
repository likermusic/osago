import { RadioButton } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';
import cn from 'classnames';
import { useMemo } from 'react';

import type { FlowType } from 'shared/config/FlowType';
import { sendEventLandingClick } from 'shared/lib/sendGAEvents';

import styles from './CalculationProlongationToggle.module.scss';
import { toggleOptions } from './config';

interface CalculationProlongationToggleProps {
  value?: FlowType;
  onChange?: (value: FlowType) => void;
  shouldShowBadge?: boolean;
}

export const CalculationProlongationToggle: FC<CalculationProlongationToggleProps> = ({
  value,
  onChange,
  shouldShowBadge,
}) => {
  const isPhone = useIsPhone();

  const radioButtonClickHandler = (newValue: string | number) => {
    onChange?.(newValue as FlowType);

    sendEventLandingClick(newValue as FlowType);
  };

  const options = useMemo(() => toggleOptions(isPhone), [isPhone]);

  return (
    <RadioButton
      size={36}
      options={options}
      value={value?.toString()}
      onChange={radioButtonClickHandler}
      className={cn(styles.toggleWidth, {
        [styles.prolongationsBadge]: shouldShowBadge,
      })}
    />
  );
};
