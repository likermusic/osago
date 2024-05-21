import { UI } from '@sravni/cosago-react-library/lib/components';
import { Car } from '@sravni/react-icons';
import { useBoolean } from '@sravni/react-utils';
import type { FC } from 'react';
import { useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataModalOpen } from 'shared/lib/sendGAEvents';
import { AnketaScrollingLabels } from 'shared/lib/usePageScroll';
import type { IFormHeader } from 'shared/types/IFormHeader';
import { AnketaFormPopup } from 'shared/ui';

import { selectCarInfo } from 'entities/carInfo';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams/useAccordionHeaderParams';
import { Form } from '../Form/Form';

export type TCarInfoAccordionProps = TAccordionProps & {
  shouldRestoreAdditionalData?: boolean;
};

export const AccordionModalForm: FC<TCarInfoAccordionProps> = ({
  isOpen,
  shouldForceOpenPopup,
  isFormForceOpened,
  shouldHideDividers,
  onFormSubmit,
  isLoading,
  shouldRestoreAdditionalData,
  isExtendedData,
}) => {
  const { data, isFullFilled } = useAppSelector(selectCarInfo);
  const [shouldShowEditPopup, setShouldShowEditPopup] = useBoolean();
  const [header, setHeader] = useState<IFormHeader>();

  const [title, icon, description] = useAccordionHeaderParams(data, isOpen, isExtendedData);

  const isAccordionOpen = !isFullFilled && isOpen;
  const isEditPopupVisible = shouldShowEditPopup || (shouldForceOpenPopup && isFormForceOpened);

  return (
    <>
      <UI.CustomAccordion.Item
        withDivider={!shouldHideDividers}
        onEditButtonClick={() => {
          setShouldShowEditPopup.on();
          sendEventSummaryDataModalOpen('Авто', 'Плитка');
        }}
        icon={icon}
        defaultIcon={<Car />}
        isOpen={isAccordionOpen}
        disabled={!isOpen && !isFullFilled}
        withEdit={!isOpen && isFullFilled}
        title={title}
        description={
          <UI.FormSubtitle
            className="h-preline"
            id={AnketaScrollingLabels.CarInfo}
          >
            {description}
          </UI.FormSubtitle>
        }
        scrollIntoView={isAccordionOpen}
      >
        <Form
          onFormSubmit={onFormSubmit}
          setHeader={setHeader}
          isFormForceOpened={isFormForceOpened}
          isLoading={isLoading}
          shouldRestoreAdditionalData={shouldRestoreAdditionalData}
        />
      </UI.CustomAccordion.Item>

      <AnketaFormPopup
        isFormForceOpened={isFormForceOpened}
        FormElement={Form}
        onFormSubmit={onFormSubmit}
        onClose={setShouldShowEditPopup.off}
        isLoading={isLoading}
        isOpen={isEditPopupVisible}
        {...header}
        setHeader={setHeader}
      />
    </>
  );
};
