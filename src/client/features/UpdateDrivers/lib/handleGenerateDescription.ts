import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import {
  concatWithPrefix,
  formatDocumentNumber,
  getPluralYear,
  getDateDifferenceInFullYearsFromNow,
} from '@sravni/cosago-react-library/lib/utils';

import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';
import { removeUnderscores, replaceSpacesToUnbreakableGap } from 'shared/lib/formatters';

import { getDriverKbmDescription } from 'entities/KbmDiscount';

import { AccordionModalFormTexts } from '../ui/AccordionModalForm/AccordionModalForm.texts';

interface IHandleGenerateDescription {
  driverIndex: number;
  isMultiDrive: boolean;
  birthday?: string;
  experienceStartDate?: string;
  licenseNumber?: string;
  isExtendedData?: boolean;
  shouldShowDriverKbm?: boolean;
  kbm?: Nullable<number>;
  vehicleType: VehicleType;
}

export const handleGenerateDescription = ({
  driverIndex,
  isMultiDrive,
  birthday = '',
  experienceStartDate = '',
  licenseNumber = '',
  isExtendedData,
  shouldShowDriverKbm,
  kbm,
  vehicleType,
}: IHandleGenerateDescription) => {
  if (isMultiDrive) {
    return AccordionModalFormTexts.multiDriveSubtitle(vehicleType);
  }

  const driver = `Водитель ${driverIndex}`;

  if (isExtendedData) {
    let description = driver;

    if (birthday) {
      description = concatWithPrefix(description, removeUnderscores(birthday), TEXT_DOT_SEPARATOR);
    }

    if (licenseNumber) {
      description = concatWithPrefix(
        description,
        `ВУ: ${formatDocumentNumber(removeUnderscores(licenseNumber))}`,
        TEXT_DOT_SEPARATOR,
      );
    }

    if (experienceStartDate) {
      description = concatWithPrefix(
        description,
        `Стаж с ${removeUnderscores(experienceStartDate)}`,
        TEXT_DOT_SEPARATOR,
      );
    }

    return description;
  }

  const experience = getDateDifferenceInFullYearsFromNow(removeUnderscores(experienceStartDate));
  const experienceText = replaceSpacesToUnbreakableGap(
    experience ? concatWithPrefix('стаж', getPluralYear(experience || 0), ' ') : undefined,
  );

  const birthdayText = removeUnderscores(birthday);

  const commonDescription = concatWithPrefix(
    concatWithPrefix(driver, birthdayText, TEXT_DOT_SEPARATOR),
    experienceText,
    TEXT_DOT_SEPARATOR,
  );

  if (shouldShowDriverKbm) {
    return concatWithPrefix(commonDescription, getDriverKbmDescription(kbm), TEXT_DOT_SEPARATOR);
  }

  return commonDescription;
};
