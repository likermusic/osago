import { Card, Divider, Space } from '@sravni/react-design-system';
import type { Dispatch, SetStateAction } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { getDiscountPercentByKbm } from 'entities/KbmDiscount';

import { getMaxKbm } from '../../lib/getMaxKbm';
import { maxDriversKbmSelector } from '../../model/KbmDiscountModal.selectors';
import type { IKbmDiscountDriver } from '../../types';
import { Driver } from '../Driver/Driver';
import { KbmAlert } from '../KbmAlert/KbmAlert';
import { TotalKbmDiscount } from '../TotalKbmDiscount/TotalKbmDiscount';

import styles from './ModalContent.module.scss';
import { ModalContentTexts } from './ModalContent.texts';

const isDriverTheOnlyChecked = (drivers: IKbmDiscountDriver[], driverKey: string) => {
  const selectedDrivers = drivers.filter((driver) => driver.isSelected);
  return selectedDrivers.length < 2 && !!selectedDrivers.find((driver) => driver.keyInDrivers === driverKey);
};
const getKbmFinalText = (kbm: number) => {
  const discountPercent = getDiscountPercentByKbm(kbm);
  if (kbm > 1) return ModalContentTexts.allowance(discountPercent);

  return ModalContentTexts.discount(discountPercent);
};

interface IModalContentProps {
  kbmDrivers: IKbmDiscountDriver[];
  defaultKmb?: number;
  isMultiDrive: boolean;
  setKbmDrivers: Dispatch<SetStateAction<IKbmDiscountDriver[]>>;
}

export const ModalContent: FC<IModalContentProps> = ({
  isMultiDrive,
  className,
  kbmDrivers,
  setKbmDrivers,
  defaultKmb = 0,
}) => {
  const maxKbm = useAppSelector(maxDriversKbmSelector);
  const maxSelectedKbm = getMaxKbm(kbmDrivers.filter((driver) => driver.isSelected)) || defaultKmb;

  const onDriverSwitchChange = (driverKey: string) => {
    setKbmDrivers((prevState) => [
      ...prevState.map((driver) => ({
        ...driver,
        isSelected: driver.keyInDrivers === driverKey ? !driver.isSelected : driver.isSelected,
      })),
    ]);
  };

  return (
    <Space
      className={className}
      direction="vertical"
      size={16}
    >
      {!isMultiDrive && <KbmAlert drivers={kbmDrivers} />}

      <Card
        className={styles.driversCard}
        color="dark"
        size={16}
      >
        {!isMultiDrive && (
          <Space
            size={16}
            direction="vertical"
          >
            {kbmDrivers.map((driver, index) => (
              <Driver
                key={driver.keyInDrivers}
                driverIndex={index}
                driver={driver}
                onDriverSwitchChange={onDriverSwitchChange}
                isSwitchDisabled={isDriverTheOnlyChecked(kbmDrivers, driver.keyInDrivers)}
                hasMaxKbm={driver.kbm === maxKbm}
                shouldShowSwitcher={!driver.isInsurer && kbmDrivers.length > 1}
              />
            ))}
          </Space>
        )}

        {!isMultiDrive && <Divider className={styles.divider} />}

        <TotalKbmDiscount
          title={ModalContentTexts.title}
          coeff={`${ModalContentTexts.kbm} ${maxSelectedKbm}`}
          coeffSubtitle={getKbmFinalText(maxSelectedKbm)}
        />
      </Card>
    </Space>
  );
};
