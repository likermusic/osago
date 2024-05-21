import { UI } from '@sravni/cosago-react-library/lib/components';
import { IdentityCard } from '@sravni/react-icons';
import { useBoolean } from '@sravni/react-utils';
import type { FC } from 'react';
import { useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataModalOpen } from 'shared/lib/sendGAEvents';
import { AnketaScrollingLabels } from 'shared/lib/usePageScroll';
import type { IFormHeader } from 'shared/types/IFormHeader';
import { AnketaFormPopup } from 'shared/ui';

import { selectOwner } from 'entities/owner';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams';
import { Form } from '../Form/Form';

export const AccordionModalForm: FC<TAccordionProps> = ({
  isOpen,
  isFormForceOpened,
  onFormSubmit,
  shouldForceOpenPopup,
  shouldHideDividers,
  isLoading,
  isExtendedData,
  esiaLoginBlock,
}) => {
  const { data, isFullFilled } = useAppSelector(selectOwner);
  const [shouldShowEditPopup, setShouldShowEditPopup] = useBoolean();
  const [header, setHeader] = useState<IFormHeader>();

  const [title, description] = useAccordionHeaderParams(data, isOpen, isExtendedData);

  const isAccordionOpen = !isFullFilled && isOpen;
  const isEditPopupVisible = shouldShowEditPopup || (shouldForceOpenPopup && isFormForceOpened);

  return (
    <>
      <UI.CustomAccordion.Item
        withDivider={!shouldHideDividers}
        onEditButtonClick={() => {
          setShouldShowEditPopup.on();
          sendEventSummaryDataModalOpen('Собственник', 'Плитка');
        }}
        icon={<IdentityCard />}
        isOpen={isOpen}
        disabled={!isOpen && !isFullFilled}
        withEdit={!isOpen && isFullFilled}
        title={title}
        description={
          <UI.FormSubtitle
            className="h-preline"
            id={AnketaScrollingLabels.CarOwner}
          >
            {description}
          </UI.FormSubtitle>
        }
        scrollIntoView={isAccordionOpen}
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
        isLoading={isLoading}
        onClose={setShouldShowEditPopup.off}
        isOpen={isEditPopupVisible}
        icon={<IdentityCard />}
        setHeader={setHeader}
        {...header}
      />
    </>
  );
};
