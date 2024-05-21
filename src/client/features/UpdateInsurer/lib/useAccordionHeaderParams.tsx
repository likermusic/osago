import { useMemo } from 'react';

import { formatPersonDataDescription } from 'shared/lib/formatters';
import type { UserCommonFields } from 'shared/types';

export const useAccordionHeaderParams = (
  data: Nullable<UserCommonFields>,
  isOpen: boolean,
  isExtendedData?: boolean,
) => {
  const { title = 'Страхователь', description = '' } = useMemo(() => {
    if (!data || isOpen || !data.fullName?.value) {
      return {};
    }

    return {
      title: data.fullName?.label || '',
      description: formatPersonDataDescription(
        'Страхователь',
        data.birthday,
        data.passportNumber,
        data.passportIssueDate,
        String(data.registrationAddress?.value),
        data.registrationAddressFlat,
        isExtendedData,
      ),
    };
  }, [data, isOpen, isExtendedData]);

  return [title, description] as const;
};
