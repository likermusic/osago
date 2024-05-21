import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import { useMobileFlowSequenceControl } from '@sravni/cosago-react-library/lib/hooks';
import type { FC } from 'react';
import { useMemo } from 'react';

import { useFormTriggerWhenFormForcedOpen } from 'shared/lib/useFormTriggerWhenFormForcedOpen/useFormTriggerWhenFormForcedOpen';

import { MultiDrive } from '../fields';

import { MultidriveAlert } from './MultidriveAlert';

type TDriversAdditionalFields = {
  onChangeMultiDrive: (isMultiDrive: boolean) => void;
  isFormForceOpened: boolean;
};

type Props = Widgets.FormComponentProps<{}, TDriversAdditionalFields>;

const DriversFormView: FC<Props> = ({
  isDialog,
  onSubmit,
  submitButtonText,
  FieldConstructor,
  isLoading,
  additionalProps,
}) => {
  const { onChangeMultiDrive, isFormForceOpened } = additionalProps || {};

  useFormTriggerWhenFormForcedOpen(isFormForceOpened);

  const currentMobileFields = useMemo(() => [], []);

  const controls = useMobileFlowSequenceControl(currentMobileFields, undefined, undefined, false);

  return (
    <Widgets.FormWithMobileFlowWidget
      onSubmit={onSubmit}
      controlElement={FieldConstructor}
      mobileFlowTitle=""
      isDialog={isDialog}
      isLoading={isLoading}
      mobileFlowControls={controls}
      submitButtonText={submitButtonText}
    >
      <UI.Form.Block>
        <UI.Form.Row colWidths={[12]}>
          <MultiDrive
            isMultiDrive
            onChangeMultiDrive={onChangeMultiDrive}
          />
        </UI.Form.Row>

        <UI.Form.Row colWidths={[12]}>
          <MultidriveAlert />
        </UI.Form.Row>
      </UI.Form.Block>
    </Widgets.FormWithMobileFlowWidget>
  );
};
export const DriversInfoMultiDriveViewHoc = Widgets.formProviderHOC<{}, TDriversAdditionalFields>(DriversFormView);
