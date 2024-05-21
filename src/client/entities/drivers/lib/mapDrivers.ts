import { FormFields } from '@sravni/cosago-react-library/lib/constants';
import { formatDateString } from '@sravni/cosago-react-library/lib/utils';

import { getPersonFullName } from 'shared/lib';
import type { TDriverForMapping } from 'shared/types/TQuerySupportedForMapping';

import type { DriversCommonFields } from 'entities/drivers';
import {
  FormFieldsValidationSchemaLimitedUpdateDrivers,
  FormFieldsValidationSchemaMultiDrive,
  generateEmptyDriver,
} from 'entities/drivers';
import { getLicenseFromSeriesAndNumber } from 'entities/drivers/lib/getLicenseFromSeriesAndNumber';

export const mapDrivers = (
  drivers: TDriverForMapping[] | null,
  isMultiDrive: boolean,
  category: string | undefined,
  isFullFilled?: boolean,
): Form.MultipleFormsData<DriversCommonFields> =>
  drivers && drivers.length > 0
    ? drivers.reduce<Form.MultipleFormsData<DriversCommonFields>>((result, cur, index) => {
        const { fullName, firstName, lastName, middleName, birthDate, previousInfo, license } = cur;

        const driverName = getPersonFullName({
          fullName,
          lastName,
          middleName,
          firstName,
        });
        const prevLastName = previousInfo?.lastName;

        const prevLicenceNumber = getLicenseFromSeriesAndNumber(
          previousInfo?.license?.series,
          previousInfo?.license?.number,
        );

        const isPreviousLicenseExist = prevLicenceNumber || prevLastName;

        const data = {
          experienceStartDate: license?.date ? formatDateString(license?.date) : '',
          prevLicenceNumber,
          licenceNumber: getLicenseFromSeriesAndNumber(license?.series, license?.number),
          prevLastName: prevLastName || null,
          fullName: driverName ? { value: driverName, label: driverName } : null,
          birthday: birthDate ? formatDateString(birthDate) : '',
          // восстанавливаем прошлые права только если в них есть значения
          hasPreviousLicence:
            previousInfo?.license && isPreviousLicenseExist
              ? FormFields.ConfirmChoice.yes
              : FormFields.ConfirmChoice.no,
        };

        const validationSchema = isMultiDrive
          ? FormFieldsValidationSchemaMultiDrive
          : FormFieldsValidationSchemaLimitedUpdateDrivers(category);

        result[index] = {
          // мы оставляем заполненным первого водителя, если мультидрайв и в данном случае тут тоже надо сделать true, когда форма валидна
          isFullFilled: isFullFilled !== undefined ? isFullFilled : validationSchema.isValidSync(data),
          data,
        };

        return result;
      }, {})
    : generateEmptyDriver(isMultiDrive);
