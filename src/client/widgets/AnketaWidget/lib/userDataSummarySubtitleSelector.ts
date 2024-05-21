import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';
import { createSelector } from 'reselect';

import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';
import { pluralizeDrivers } from 'shared/lib/pluralize';

import { selectCarInfo, selectCarParamsLabels } from 'entities/carInfo';
import { selectDriversCount, selectMultiDrive } from 'entities/drivers';

import { AnketaWidgetTexts } from '../ui/AnketaWidget.texts';

export const userDataSummarySubtitleSelector = createSelector(
  [(state: Store) => selectCarParamsLabels(state, selectCarInfo(state).data), selectMultiDrive, selectDriversCount],
  (carLabels, isMultidrive, driversCount) => {
    const car = [carLabels.brand, carLabels.model, carLabels.year].join(' ');
    const drivers = isMultidrive
      ? AnketaWidgetTexts.unlimited
      : `${driversCount}\u00A0${pluralizeDrivers(driversCount)}`;
    return concatWithPrefix(concatWithPrefix(car, carLabels.power, TEXT_DOT_SEPARATOR), drivers, TEXT_DOT_SEPARATOR);
  },
);
