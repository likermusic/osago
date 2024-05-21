import { useMemo, useState } from 'react';

import { convertToNumber } from 'shared/lib/convertToNumber/convertToNumber';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventDateFilterInForwardingProposition } from 'shared/lib/sendGAEvents';
import { sortStringDates } from 'shared/lib/sortStringDates';

import {
  DATE_VALUE_ALL,
  forwardingPropositionsMappedByDateAndSortedSelector,
  forwardingPropositionsSelector,
  getOtherOptionsForPolicyDatePicker,
} from 'entities/order';

import { ForwardingPropositionsListTexts } from '../ui/ForwardingPropositionsList/ForwardingPropositionsList.texts';

const DEFAULT_OPTION = {
  label: ForwardingPropositionsListTexts.allDates,
  value: DATE_VALUE_ALL,
};

export const useGetForwardingPropositionsList = () => {
  const forwardingPropositionsMappedByDate = useAppSelector(forwardingPropositionsMappedByDateAndSortedSelector);

  const dates = useMemo(
    () => sortStringDates(Object.keys(forwardingPropositionsMappedByDate)),
    [forwardingPropositionsMappedByDate],
  );
  const defaultDateValue = dates[0];
  const [activeKey, setActiveKey] = useState(defaultDateValue);

  const shouldShowDatePicker = dates.length > 1;
  const forwardingPropositions = useAppSelector(forwardingPropositionsSelector);

  const currentPropositions =
    activeKey === DATE_VALUE_ALL ? forwardingPropositions : forwardingPropositionsMappedByDate[activeKey];

  const onChange = (value: string | number) => {
    setActiveKey(String(value));
    sendEventDateFilterInForwardingProposition({
      filterType: String(value === DATE_VALUE_ALL ? ForwardingPropositionsListTexts.allDates : value),
      companiesValue: convertToNumber(currentPropositions?.length),
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(
    () => [DEFAULT_OPTION, ...getOtherOptionsForPolicyDatePicker(dates, forwardingPropositionsMappedByDate)],
    [dates, forwardingPropositionsMappedByDate],
  );

  return {
    shouldShowDatePicker,
    currentPropositions,
    defaultDateValue,
    options,
    forwardingPropositions,
    dates,
    onChange,
  };
};
