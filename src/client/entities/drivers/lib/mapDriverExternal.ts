import { Documents, FormFields } from '@sravni/cosago-react-library/lib/constants';
import { parseFullName } from '@sravni/cosago-react-library/lib/utils';

import { formatDate } from 'commonUtils/formatters';

import { getDocumentSeriesNumberObj } from 'shared/lib/getDocumentSeriesNumberObj';
import { mapUser } from 'shared/lib/normalizers/mapUser';

import type { DriversCommonFields } from 'entities/drivers';

export const mapDriverExternal = (driver: DriversCommonFields) => {
  const mappedDriver = mapUser(driver);
  const prevName: Nullable<ReturnType<typeof parseFullName>> = driver.prevLastName
    ? parseFullName({ value: driver.prevLastName })
    : null;

  return {
    ...mappedDriver,
    license: {
      ...getDocumentSeriesNumberObj(driver.licenceNumber, Documents.EParticipantDocuments.DRIVING_LICENSE),
      date: formatDate.toServerFromClient(driver.experienceStartDate),
    },
    previousInfo:
      driver.hasPreviousLicence === FormFields.ConfirmChoice.yes && driver.prevLastName && driver.prevLicenceNumber
        ? {
            lastName: prevName?.lastName || mappedDriver.lastName,
            // У бэка стоит валидация на обязательные поля firstName и middleName(хотя поле называется предыдущая фамилия)
            firstName: prevName?.firstName || mappedDriver.firstName,
            middleName: prevName?.middleName || mappedDriver.middleName,
            license: getDocumentSeriesNumberObj(
              driver.prevLicenceNumber,
              Documents.EParticipantDocuments.DRIVING_LICENSE,
            ),
          }
        : {},
  };
};
