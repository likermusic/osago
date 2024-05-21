import { removeSpaces } from '@sravni/cosago-react-library/lib/utils';
import { vehicleNumberScheme } from '@sravni/cosago-react-library/lib/validationSchemes';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import { useCallback, useEffect, useState } from 'react';

import type { FlowType } from 'shared/config/FlowType';
import { useAppSelector } from 'shared/lib/redux';
import { useDeeplink } from 'shared/lib/useDeeplink';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import {
  FormFieldsValidationSchemaCarNumberLanding,
  landingFormDefaultValue,
  selectVehicleType,
} from 'entities/carInfo';

import { AuthenticationFormPopup } from 'features/Authentication';
import { CalculationProlongationToggle } from 'features/CalculationProlongationToggle';
import { CarNumberBlockContent, FormFieldsControls, FormFields } from 'features/FillAutoDataByCarNumber';
import {
  ProlongationByCarNumber,
  useLoadProlongation,
  useRedirectToAnketa,
  useUnAuthRedirect,
} from 'features/NavigateWithProlongation';

type CarNumberFieldProps = {
  isSticky?: boolean;
  vehicleTypeUi?: VehicleType;
  isLoading?: boolean;
  flowType: FlowType;
  changeFlowType?: (value: FlowType) => void;
  btnCalculateTitle?: string;
  onSubmitCallback?: (values: CarNumberLandingFormFields) => void;
};

// FIXME: Возможно стоит явно выделить именно фичу (похоже на то, что весь ui должен лежать в entities)

export const CarNumberBlock = (props: CarNumberFieldProps) => {
  const {
    isSticky,
    isLoading,
    flowType,
    changeFlowType,
    vehicleTypeUi = 'car',
    btnCalculateTitle,
    onSubmitCallback,
  } = props;
  const isMobile = useIsMobile();
  const vehicleType = useAppSelector(selectVehicleType);

  const [currentFormValue, setCurrentFormValue] = useState<CarNumberLandingFormFields>(
    landingFormDefaultValue(vehicleType),
  );
  const [shouldShowNonNumberModal, setShouldShowNonNumberModal] = useBoolean(false);
  const [shouldShowAuthenticateModal, setShouldShowAuthenticateModal] = useBoolean(false);
  const handleUnAthRedirect = useUnAuthRedirect(currentFormValue);
  const redirectToAnketaWithAutoNumberIfExist = useRedirectToAnketa();

  const redirectToAnketa = useCallback(
    async (values: CarNumberLandingFormFields | null) => {
      redirectToAnketaWithAutoNumberIfExist(values ?? currentFormValue);
    },
    [redirectToAnketaWithAutoNumberIfExist, currentFormValue],
  );

  const { checkProlongationByNumber, isProlongationLoading, isProlongationExist, resetProlongation } =
    useLoadProlongation(redirectToAnketa);

  const handleStartCalculation = useCallback(
    async (values: CarNumberLandingFormFields) => {
      const cleanedCarNumber = removeSpaces(values.carNumber);
      const formValue = { ...values, carNumber: cleanedCarNumber };
      setCurrentFormValue(formValue);
      await checkProlongationByNumber(formValue);
      onSubmitCallback?.(values);
    },
    [checkProlongationByNumber, onSubmitCallback],
  );

  const { params } = useDeeplink();
  useEffect(() => {
    vehicleNumberScheme().isValidSync(params.platenumber) &&
      setCurrentFormValue({ ...landingFormDefaultValue(vehicleType), carNumber: params.platenumber });
  }, [params.platenumber, vehicleType]);

  const handleNextModal = useCallback(() => {
    setShouldShowNonNumberModal.off();

    redirectToAnketaWithAutoNumberIfExist(null);
  }, [redirectToAnketaWithAutoNumberIfExist, setShouldShowNonNumberModal]);

  const switchToAuthPopup = () => {
    setShouldShowAuthenticateModal.on();
    resetProlongation();
  };

  return (
    <>
      <CarNumberBlockContent
        isLoading={isLoading || isProlongationLoading}
        defaultData={currentFormValue}
        onDataChanged={handleStartCalculation}
        additionalProps={{
          isSticky,
          onSkipNumber: setShouldShowNonNumberModal.on,
          shouldShowNonNumberModal,
          closeNonNumberModal: setShouldShowNonNumberModal.off,
          nextNonNumberModal: handleNextModal,
          btnCalculateTitle,
          vehicleTypeUi,
        }}
        formFieldsControls={FormFieldsControls}
        formLabels={FormFields}
        validationSchema={FormFieldsValidationSchemaCarNumberLanding}
      >
        {isSticky && !isMobile && (
          <CalculationProlongationToggle
            value={flowType}
            onChange={changeFlowType}
          />
        )}
      </CarNumberBlockContent>

      {isProlongationExist && !shouldShowAuthenticateModal && (
        <ProlongationByCarNumber
          formValue={currentFormValue}
          onClose={resetProlongation}
          onNeedAuth={switchToAuthPopup}
        />
      )}

      <AuthenticationFormPopup
        isVisible={shouldShowAuthenticateModal}
        onAuthenticated={handleUnAthRedirect}
        onClose={setShouldShowAuthenticateModal.off}
      />
    </>
  );
};
