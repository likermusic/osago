import { UI } from '@sravni/cosago-react-library/lib/components';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { ICustomSelectOption, IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import { useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { FieldAction } from 'shared/config/FieldAction';
import {
  mapClientCarNumbersToOptions,
  mapClientMotorcycleNumbersToOptions,
} from 'shared/lib/localStorageMethods/mapClientCarNumbersToOptions';
import { sendEventLandingClick } from 'shared/lib/sendGAEvents';

import styles from './CarNumberInput.module.scss';

export const CarNumberInput = (props: IFieldFactoryProps) => {
  const { type, onSideActionComplete } = props;
  const { formState, setValue, watch } = useFormContext();
  const error = formState.errors?.carNumber?.message?.toString();
  const vehicleType = watch('vehicleType');
  const handleRunDebouncedSideEffect = useDebouncedCallback((action: FieldAction, number?: string | number) => {
    onSideActionComplete?.(action, number);
  }, 100);

  const handleSideEffect = (car: Nullable<ICustomSelectOption>) => {
    setValue(type, car?.label);
    handleRunDebouncedSideEffect(FieldAction.ProfileApplied, car?.value);
  };

  const options = useMemo(
    () => (vehicleType === 'motorcycle' ? mapClientMotorcycleNumbersToOptions() : mapClientCarNumbersToOptions()),
    [vehicleType],
  );

  return (
    <div onFocus={() => sendEventLandingClick('GRZ')}>
      <UI.VehicleNumberWidget
        {...props}
        onApplyFromList={handleSideEffect}
        error={error}
        useFloatErrorPopup
        className={styles.carNumberWidget}
        options={options}
        isMobileFlow={false}
        vehicleType={vehicleType}
      />
    </div>
  );
};
