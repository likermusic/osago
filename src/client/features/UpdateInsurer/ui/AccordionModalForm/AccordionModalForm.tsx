import { UI } from '@sravni/cosago-react-library/lib/components';
import { ShieldSafety } from '@sravni/react-icons';
import { useBoolean } from '@sravni/react-utils';
import type { FC } from 'react';
import { useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataModalOpen } from 'shared/lib/sendGAEvents';
import { AnketaScrollingLabels } from 'shared/lib/usePageScroll';
import type { IFormHeader } from 'shared/types/IFormHeader';
import { AnketaFormPopup } from 'shared/ui';

import { selectInsurer } from 'entities/insurer';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams';
import { Form } from '../Form/Form';

export const AccordionModalForm: FC<TAccordionProps> = ({
  isOpen,
  isFormForceOpened,
  onFormSubmit,
  onPopupClose,
  shouldForceOpenPopup,
  shouldHideDividers,
  isLoading,
  isExtendedData,
  esiaLoginBlock,
}) => {
  const { data, isFullFilled } = useAppSelector(selectInsurer);
  const [shouldShowEditPopup, setShouldShowEditPopup] = useBoolean();
  const [header, setHeader] = useState<IFormHeader>();

  const [title, description] = useAccordionHeaderParams(data, isOpen, isExtendedData);

  const isAccordionOpen = !isFullFilled && isOpen;
  const isEditPopupVisible = shouldShowEditPopup || (shouldForceOpenPopup && isFormForceOpened);

  return (
    <>
      <UI.CustomAccordion.Item
        onEditButtonClick={() => {
          setShouldShowEditPopup.on();
          sendEventSummaryDataModalOpen('Страхователь', 'Плитка');
        }}
        scrollIntoView={isAccordionOpen}
        icon={<ShieldSafety />}
        isOpen={isAccordionOpen}
        disabled={!isOpen && !isFullFilled}
        withEdit={!isOpen && isFullFilled}
        title={title}
        description={
          <UI.FormSubtitle
            className="h-preline"
            id={AnketaScrollingLabels.CarInsurer}
          >
            {description}
          </UI.FormSubtitle>
        }
        withDivider={!shouldHideDividers}
      >
        {esiaLoginBlock}
        <Form
          isFormForceOpened={isFormForceOpened}
          onFormSubmit={onFormSubmit}
          setHeader={setHeader}
          isLoading={isLoading}
        />
      </UI.CustomAccordion.Item>

      <AnketaFormPopup
        isFormForceOpened={isFormForceOpened}
        FormElement={Form}
        onFormSubmit={onFormSubmit}
        onClose={() => {
          onPopupClose?.();
          setShouldShowEditPopup.off();
        }}
        isOpen={isEditPopupVisible}
        icon={<ShieldSafety />}
        setHeader={setHeader}
        {...header}
      />
    </>
  );
};
