import { Dialog, Space, Button, Alert } from '@sravni/react-design-system';

import { useAppSelector } from 'shared/lib/redux';
import { FixedWidthDialog } from 'shared/ui/FixedWidthDialog';

import { selectVehicleType } from 'entities/carInfo';

import { nonNumberTexts } from './nonNumber.texts';

interface NonNumberDialogProps {
  visible?: boolean;
  handleClose?: () => void;
  handleNext?: () => void;
}

export const NonNumberDialog: FC<NonNumberDialogProps> = ({ visible, handleClose, handleNext }) => {
  const vehicleType = useAppSelector(selectVehicleType);

  return (
    <FixedWidthDialog
      visible={visible}
      onClose={handleClose}
    >
      <Dialog.Header
        title={nonNumberTexts.title}
        subtitle={nonNumberTexts.subtitle}
      />
      <Dialog.Content>
        <Alert
          variant="secondary"
          color="orange"
        >
          {nonNumberTexts.prompt(vehicleType)}
        </Alert>
      </Dialog.Content>
      <Dialog.Footer>
        <Space justify="space-between">
          <Button
            color="blue"
            variant="text"
            onClick={handleClose}
          >
            {nonNumberTexts.backBtn}
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
          >
            {nonNumberTexts.continueBtn}
          </Button>
        </Space>
      </Dialog.Footer>
    </FixedWidthDialog>
  );
};
