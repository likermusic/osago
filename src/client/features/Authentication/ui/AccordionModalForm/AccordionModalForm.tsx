import { UI } from '@sravni/cosago-react-library/lib/components';
import { Email } from '@sravni/react-icons';
import { useAbTestingSdk, useBoolean } from '@sravni/react-utils';
import type { FC } from 'react';
import { useState } from 'react';

import { B_VARIANT_VALUE, TEST_ANKETA_CONTACT_NUMBER } from 'shared/config/anketaContactAb';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataModalOpen } from 'shared/lib/sendGAEvents';
import { AnketaScrollingLabels } from 'shared/lib/usePageScroll';
import type { IFormHeader } from 'shared/types/IFormHeader';
import { AnketaFormPopup } from 'shared/ui';

import { selectContacts } from 'entities/contacts';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams';
import { Form } from '../Form/Form';

export const AccordionModalForm: FC<TAccordionProps> = ({
  isOpen,
  isFormForceOpened,
  onFormSubmit,
  shouldHideDividers,
  shouldForceOpenPopup,
  isLoading,
  esiaLoginBlock,
}) => {
  const { isFullFilled, data } = useAppSelector(selectContacts);
  const [shouldShowEditPopup, setShouldShowEditPopup] = useBoolean();
  const [header, setHeader] = useState<IFormHeader>();

  const isEditPopupVisible = shouldShowEditPopup || (shouldForceOpenPopup && isFormForceOpened);

  const [title, description] = useAccordionHeaderParams(data, isOpen);

  const isAccordionOpen = !isFullFilled && isOpen;

  const abTestingSdk = useAbTestingSdk();
  const isBVariant = abTestingSdk.checkExperimentVariant(TEST_ANKETA_CONTACT_NUMBER, B_VARIANT_VALUE);

  return (
    <>
      <UI.CustomAccordion.Item
        onEditButtonClick={() => {
          setShouldShowEditPopup.on();
          sendEventSummaryDataModalOpen('Контакты', 'Плитка');
        }}
        icon={<Email />}
        withDivider={isBVariant ? !shouldHideDividers : isFullFilled && !shouldHideDividers}
        isOpen={isOpen}
        scrollIntoView={isAccordionOpen}
        disabled={!isOpen && !isFullFilled}
        withEdit={!isOpen && isFullFilled}
        title={title}
        description={<UI.FormSubtitle id={AnketaScrollingLabels.Contacts}>{description}</UI.FormSubtitle>}
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
        onFormSubmit={onFormSubmit}
        FormElement={Form}
        onClose={setShouldShowEditPopup.off}
        isOpen={isEditPopupVisible}
        icon={<Email />}
        setHeader={setHeader}
        isLoading={isLoading}
        {...header}
      />
    </>
  );
};
