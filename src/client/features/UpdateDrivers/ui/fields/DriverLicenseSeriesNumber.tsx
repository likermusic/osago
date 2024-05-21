import { UI } from '@sravni/cosago-react-library/lib/components';
import { Documents, Masks } from '@sravni/cosago-react-library/lib/constants';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import {
  removeSpaces,
  replaceLatinSymbolsToCyrillicWithUppercase,
  getDocumentSeriesNumber,
} from '@sravni/cosago-react-library/lib/utils';
import React from 'react';

import type { DriversCommonFields } from 'entities/drivers';

const transformInput = (value: DriversCommonFields['licenceNumber'] | DriversCommonFields['prevLicenceNumber']) =>
  getDocumentSeriesNumber(
    replaceLatinSymbolsToCyrillicWithUppercase(value ?? ''),
    Documents.EParticipantDocuments.DRIVING_LICENSE,
  )
    .join(' ')
    .trim();

export const DriverLicenseSeriesNumber: FC<IFieldFactoryProps> = (props) => {
  const { type, label } = props;
  const { trigger } = useFormContext<DriversCommonFields>();

  const handleBlur = () => {
    trigger(type as keyof DriversCommonFields);
  };

  return (
    <div onBlur={handleBlur}>
      <UI.ControlledMaskInput
        name={type}
        label={label}
        mask={Masks.DRIVING_LICENSE}
        transformInput={transformInput}
        transformOutput={removeSpaces}
        inputMode="numeric"
      />
    </div>
  );
};
