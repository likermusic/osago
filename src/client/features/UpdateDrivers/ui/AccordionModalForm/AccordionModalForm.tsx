import { UI } from '@sravni/cosago-react-library/lib/components';
import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';
import { Space } from '@sravni/react-design-system';
import { Plus, User, Users } from '@sravni/react-icons';
import { useBoolean } from '@sravni/react-utils';
import type { FC } from 'react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendEventAddDriverForm, sendEventRemoveDriver, sendEventSummaryDataModalOpen } from 'shared/lib/sendGAEvents';
import { AnketaScrollingLabels } from 'shared/lib/usePageScroll';
import type { IFormHeader } from 'shared/types/IFormHeader';

import { selectVehicleType } from 'entities/carInfo';
import {
  driversSlice,
  selectDriverData,
  selectDriverIndex,
  selectDrivers,
  selectDriversCount,
  selectIsPossibleToAddDriver,
  selectIsPossibleToDeleteDriver,
} from 'entities/drivers';

import { generateTitle } from '../../lib/generateTitle';
import { handleGenerateDescription } from '../../lib/handleGenerateDescription';
import { selectShouldShowAddMoreBtn } from '../../lib/selectShouldShowAddMoreBtn';
import { AddDriverLinkButton } from '../AddDriverLinkButton/AddDriverLinkButton';
import { Form } from '../Form';
import { FormPopup } from '../FormPopup/FormPopup';
import { FormWithSwitchers } from '../FormWithSwitchers';

import { AccordionModalFormTexts } from './AccordionModalForm.texts';

type TDriverAccordionProps = TAccordionProps & {
  multipartFormId: string;
  isSummary?: boolean;
  shouldShowDriverKbm?: boolean;
};

export const AccordionModalForm: FC<TDriverAccordionProps> = ({
  isOpen,
  multipartFormId,
  isFormForceOpened,
  isSummary,
  shouldHideDividers,
  shouldForceOpenPopup,
  onFormSubmit,
  isLoading,
  isExtendedData,
  esiaLoginBlock,
  shouldShowDriverKbm,
}) => {
  const dispatch = useAppDispatch();
  const [isOpenPopup, setIsOpenPopup] = useBoolean();
  const [isOpenAddPopup, setIsOpenAddPopup] = useBoolean();
  const allDrivers = useAppSelector(selectDrivers);
  const driversCount = useAppSelector(selectDriversCount);
  const { isMultiDrive, multipleFormsData: driversSet } = allDrivers;
  const isCurrentDriverFullFilled = driversSet[multipartFormId]?.isFullFilled;
  const currentDriverData = useAppSelector(selectDriverData(multipartFormId));
  const driverIndex = useAppSelector(selectDriverIndex(multipartFormId));
  const isPossibleToAdd = useAppSelector(selectIsPossibleToAddDriver(multipartFormId));
  const isPossibleToDelete = useAppSelector(selectIsPossibleToDeleteDriver);
  const shouldShowAddMoreButton = useAppSelector(
    selectShouldShowAddMoreBtn(multipartFormId, isCurrentDriverFullFilled, isSummary),
  );
  const vehicleType = useAppSelector(selectVehicleType);

  const [header, setHeader] = useState<IFormHeader>();
  const isEditPopupVisible = isOpenPopup || (shouldForceOpenPopup && isFormForceOpened);
  const sendAnalytic = useGetSendAnalytics();

  const title = generateTitle(isMultiDrive, currentDriverData);
  const isFirst = driverIndex === 0;
  const driverNumber = driverIndex + 1;

  const handleAddNewDriver = () => {
    dispatch(driversSlice.actions.addDriver());

    sendAnalytic('osago_contact_step_edit_drivers');
    sendEventAddDriverForm(driverNumber);
  };

  const handleDeleteDriver = (isDialog: boolean) => (driverId: string) => {
    dispatch(driversSlice.actions.removeDriver({ driverId }));
    onFormSubmit?.(driverId, isDialog);
    sendAnalytic('osago_contact_step_edit_drivers');
    sendEventRemoveDriver(driverIndex, 'Кнопка');
  };

  const isAccordionOpen = !isCurrentDriverFullFilled && isOpen;

  const FormToRender = isSummary ? Form : FormWithSwitchers;

  return (
    <>
      <Space
        align="start"
        direction="vertical"
        size={16}
      >
        <UI.CustomAccordion.Item
          withDivider={!shouldHideDividers}
          onEditButtonClick={() => {
            setIsOpenPopup.on();
            sendEventSummaryDataModalOpen('Водители', 'Плитка');
          }}
          icon={<User />}
          isOpen={isAccordionOpen}
          scrollIntoView={isAccordionOpen}
          withEdit={!isOpen && isCurrentDriverFullFilled}
          disabled={!isOpen && !isCurrentDriverFullFilled}
          title={!isOpen && title ? title : concatWithPrefix('Водитель', driverNumber.toString(), ' ')}
          description={
            <UI.FormSubtitle
              className="h-preline"
              id={`${AnketaScrollingLabels.Driver}${driverIndex}`}
            >
              {title &&
                !isOpen &&
                handleGenerateDescription({
                  driverIndex: driverNumber,
                  isMultiDrive,
                  birthday: currentDriverData?.birthday,
                  experienceStartDate: currentDriverData?.experienceStartDate,
                  licenseNumber: currentDriverData?.licenceNumber,
                  isExtendedData,
                  shouldShowDriverKbm,
                  kbm: currentDriverData.kbm?.value,
                  vehicleType,
                })}
            </UI.FormSubtitle>
          }
        >
          {!isSummary && isFirst && !isMultiDrive && esiaLoginBlock}

          <FormToRender
            isFormForceOpened={isFormForceOpened}
            driverId={multipartFormId}
            isPossibleToAddDriver={isPossibleToAdd}
            onAddDriver={handleAddNewDriver}
            isLoading={isLoading}
            isPossibleToDeleteDriver={isPossibleToDelete}
            onDeleteDriver={handleDeleteDriver(false)}
            isFirstDriver={isFirst}
            driverIndex={driverNumber}
            driversAmount={driversCount}
            onFormSubmit={onFormSubmit}
            setHeader={setHeader}
            shouldShowDriverKbm={shouldShowDriverKbm}
          />
        </UI.CustomAccordion.Item>

        {isSummary && !isMultiDrive && isPossibleToAdd && (
          <AddDriverLinkButton
            onClick={() => {
              setIsOpenAddPopup.on();
              sendEventAddDriverForm(driverNumber);
              sendAnalytic('osago_contact_step_edit_drivers');
            }}
          />
        )}
      </Space>

      <FormPopup
        isFormForceOpened={isFormForceOpened}
        isFirstDriver={isFirst}
        onFormSubmit={onFormSubmit}
        onClose={setIsOpenPopup.off}
        isOpen={isEditPopupVisible}
        isLoading={isLoading}
        onDeleteDriver={handleDeleteDriver(true)}
        isPossibleToDeleteDriver={isPossibleToDelete}
        multipartFormId={multipartFormId}
        shouldShowSwitchers={!isSummary}
        driverIndex={driverIndex}
        driversAmount={driversCount}
        setHeader={setHeader}
        {...header}
        icon={<User />}
        shouldShowDriverKbm={shouldShowDriverKbm}
      />

      <FormPopup
        isFormForceOpened={isFormForceOpened}
        isFirstDriver={false}
        onClose={setIsOpenAddPopup.off}
        isOpen={isOpenAddPopup}
        onFormSubmit={onFormSubmit}
        isPossibleToDeleteDriver={false}
        multipartFormId={null}
        isLoading={isLoading}
        shouldShowSwitchers={!isSummary}
        driverIndex={driverNumber}
        driversAmount={driversCount}
        setHeader={setHeader}
        icon={<User />}
        shouldShowDriverKbm={shouldShowDriverKbm}
      />

      {shouldShowAddMoreButton && (
        <Space
          className="h-cursor-pointer"
          onClick={handleAddNewDriver}
        >
          <UI.CustomAccordion.Item
            dataQa="drivers-add-new-one-wrapper"
            title={AccordionModalFormTexts.addAnotherDriverAnketa}
            description=""
            icon={<Users />}
            rightCustomIcon={<Plus />}
            isOpen={false}
            onRightCustomIconButtonClick={handleAddNewDriver}
          />
        </Space>
      )}
    </>
  );
};
