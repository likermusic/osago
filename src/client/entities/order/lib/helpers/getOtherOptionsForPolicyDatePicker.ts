import { convertToNumber } from 'shared/lib/convertToNumber/convertToNumber';

import type { TForwardingPropositionsMappedByDate } from 'entities/order';
import { DATE_VALUE_ALL } from 'entities/order';

export const getOtherOptionsForPolicyDatePicker = (
  datesData: string[],
  propositions: TForwardingPropositionsMappedByDate,
) =>
  datesData
    .filter((date) => date !== DATE_VALUE_ALL)
    .map((date) => ({
      label: `с ${date}`,
      badgeText: String(convertToNumber(propositions?.[date]?.length)),
      value: date,
    }));
