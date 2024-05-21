import { LoaderStatuses } from '../../../types';

export const getAlertColor = (status: LoaderStatuses) => {
  switch (status) {
    case LoaderStatuses.finished:
      return 'green';
    case LoaderStatuses.error:
      return 'red';
    default:
      return 'dark';
  }
};

export const getIconColor = (status: LoaderStatuses) => {
  switch (status) {
    case LoaderStatuses.finished:
      return 'green';
    case LoaderStatuses.error:
      return 'red';
    default:
      return undefined;
  }
};
