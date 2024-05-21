import { Space, Switch, Typography } from '@sravni/react-design-system';
import cn from 'classnames';

import { sendEventRemoveDriver } from 'shared/lib/sendGAEvents';

import type { IKbmDiscountDriver } from '../../types';

import { getDiscountTextByKbm } from './Driver.texts';

interface IDriverProps {
  driver: IKbmDiscountDriver;
  onDriverSwitchChange: (driverId: string) => void;
  hasMaxKbm: boolean;
  isSwitchDisabled: boolean;
  driverIndex: number;
  shouldShowSwitcher: boolean;
}

export const Driver: FC<IDriverProps> = ({
  driver,
  onDriverSwitchChange,
  driverIndex,
  isSwitchDisabled,
  hasMaxKbm,
  shouldShowSwitcher,
}) => {
  const { fullName, kbm, isSelected, keyInDrivers } = driver;
  const { colorHelper, label } = getDiscountTextByKbm(isSelected, kbm, hasMaxKbm);

  return (
    <Space
      align="center"
      justify="space-between"
    >
      <div>
        <Typography.Text
          className={cn({ 'h-color-D20': !isSelected })}
          strong
        >
          {fullName}
        </Typography.Text>
        <Typography.Text size={12}>
          <span className={cn({ 'h-color-D60': isSelected, 'h-color-D20': !isSelected })}>КБМ – {kbm}</span>
          {'; '}
          <span className={colorHelper}>{label}</span>
        </Typography.Text>
      </div>
      {shouldShowSwitcher && (
        <Switch
          checked={isSelected}
          onChange={() => {
            onDriverSwitchChange(keyInDrivers);
            sendEventRemoveDriver(driverIndex, 'КБМ');
          }}
          disabled={isSwitchDisabled}
        />
      )}
    </Space>
  );
};
