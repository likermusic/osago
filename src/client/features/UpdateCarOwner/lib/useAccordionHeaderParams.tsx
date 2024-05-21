import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';
import { useMemo } from 'react';

import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';
import { formatPersonDataDescription } from 'shared/lib/formatters';
import { useAppSelector } from 'shared/lib/redux';

import { selectVehicleType } from 'entities/carInfo';
import { selectInsurer } from 'entities/insurer';
import type { OwnerCommonFields } from 'entities/owner';

import { useAccordionHeaderParamsTexts } from './useAccordionHeaderParams.texts';

export const useAccordionHeaderParams = (
  data: Nullable<OwnerCommonFields>,
  isOpen: boolean,
  isExtendedData?: boolean,
) => {
  const insurer = useAppSelector(selectInsurer);
  const vehicleType = useAppSelector(selectVehicleType);

  const { title = useAccordionHeaderParamsTexts.getHeaderDefaultTitle(vehicleType), description = '' } = useMemo(() => {
    if (isOpen || !data?.fullName?.value) {
      return {};
    }

    return {
      title: data.fullName?.label || '',
      description: formatPersonDataDescription(
        insurer.isActive ? 'Собственник ' : concatWithPrefix('Собственник', 'Страхователь', TEXT_DOT_SEPARATOR),
        data.birthday,
        data.passportNumber,
        data.passportIssueDate,
        String(data.registrationAddress?.value),
        data.registrationAddressFlat,
        isExtendedData,
      ),
    };
  }, [data, insurer.isActive, isOpen, isExtendedData]);

  return [title, description] as const;
};
