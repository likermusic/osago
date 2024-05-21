import { Widgets } from '@sravni/cosago-react-library/lib/components';
import { Button, Space, Typography } from '@sravni/react-design-system';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import React from 'react';

import { FieldAction } from 'shared/config/FieldAction';
import { selectors } from 'shared/lib/qa';
import { sendEventCalculation } from 'shared/lib/sendGAEvents';

import type { CarNumberLandingFormFields } from 'entities/carInfo';

import { NonNumberDialog } from '../NonNumberDialog/NonNumberDialog';

import { CarNumberBlockTexts } from './CarNumberBlock.texts';
import styles from './CarNumberBlockContent.module.scss';

type AdditionalProps = {
  isSticky?: boolean;
  vehicleTypeUi: VehicleType;
  onSkipNumber: () => void;
  shouldShowNonNumberModal: boolean;
  closeNonNumberModal: () => void;
  nextNonNumberModal: () => void;
  btnCalculateTitle?: string;
};

export const CarNumberBlockContent = Widgets.formProviderHOC<CarNumberLandingFormFields, AdditionalProps>(
  ({ isLoading, FieldConstructor, NAMES, additionalProps, onSubmit, children }) => {
    const isMobile = useIsMobile();
    const {
      isSticky,
      onSkipNumber,
      shouldShowNonNumberModal,
      closeNonNumberModal,
      vehicleTypeUi,
      nextNonNumberModal,
      btnCalculateTitle = CarNumberBlockTexts.btnCalculateTitle,
    } = additionalProps || {};

    const [isSkipNumberLoading, setIsSkipNumberLoading] = useBoolean();

    const handleFieldAction = (action: string) => {
      if (action === FieldAction.ProfileApplied) {
        onSubmit();
      }
    };

    const handleClickSkipNumber = () => {
      setIsSkipNumberLoading.on();
      nextNonNumberModal?.();
      sendEventCalculation({
        eventLabel: 'Выбрать марку',
      });
    };

    const isMotorcyclePage = vehicleTypeUi === 'motorcycle';

    const shouldShowTitles = !isSticky;
    const shouldShowControllers = !(isMobile && isSticky);

    return (
      <>
        <form
          data-qa={selectors.landing.carNumber}
          onSubmit={onSubmit}
          className={cn(styles.carNumberForm)}
        >
          <Space
            size={isMobile ? 16 : 32}
            justify="space-around"
            align="center"
            direction={isMobile ? 'vertical' : 'horizontal'}
          >
            {shouldShowTitles && (
              <Space direction="vertical">
                {isMotorcyclePage && !isMobile && (
                  <Typography.Text
                    strong
                    size={16}
                  >
                    {CarNumberBlockTexts.captionTitleMotorcyclePage}
                  </Typography.Text>
                )}

                {!isMotorcyclePage && (
                  <FieldConstructor
                    type={NAMES.vehicleType}
                    onSideActionComplete={handleFieldAction}
                    isMobileFlow
                  />
                )}
              </Space>
            )}

            {children}

            <Space
              direction={isMobile ? 'vertical' : 'horizontal'}
              size={16}
              align={isMobile ? undefined : 'center'}
            >
              <FieldConstructor
                type={NAMES.carNumber}
                onSideActionComplete={handleFieldAction}
                isMobileFlow
              />

              {shouldShowControllers && (
                <Space
                  justify="end"
                  align="center"
                  direction={isMobile ? 'vertical' : 'horizontal'}
                >
                  <Button
                    loading={isLoading}
                    block={isMobile}
                    variant="primary"
                    type="submit"
                    size={60}
                  >
                    {btnCalculateTitle}
                  </Button>

                  <Button
                    block={isMobile}
                    type="reset"
                    color="blue"
                    variant="text"
                    loading={isSkipNumberLoading}
                    onClick={onSkipNumber}
                  >
                    {CarNumberBlockTexts.btnSkipNumberTitle}
                  </Button>
                </Space>
              )}
            </Space>
          </Space>
        </form>

        <NonNumberDialog
          visible={shouldShowNonNumberModal}
          handleClose={closeNonNumberModal}
          handleNext={handleClickSkipNumber}
        />
      </>
    );
  },
);
