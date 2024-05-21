import { UI } from '@sravni/cosago-react-library/lib/components';
import { Button } from '@sravni/react-design-system';
import { Car } from '@sravni/react-icons';
import { useBoolean, useIsMobile } from '@sravni/react-utils';

import { CustomRouter } from 'shared/config/router';
import { AnketaScrollingLabels } from 'shared/lib/usePageScroll';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams';
import { PolicyStartDateModal } from '../PolicyStartDateModal';

import { AccordionModalFormTexts } from './AccordionModalForm.texts';

export const AccordionModalForm: FC<TAccordionProps> = ({
  isOpen,
  shouldForceOpenPopup,
  isFormForceOpened,
  onFormSubmit,
  shouldHideDividers,
}) => {
  const isMobile = useIsMobile();
  const [shouldShowEditPopup, setShouldShowEditPopup] = useBoolean();

  const { title, logoLink, companyName } = useAccordionHeaderParams();

  const isEditPopupVisible = shouldShowEditPopup || (shouldForceOpenPopup && isFormForceOpened);

  const redirectToPropositions = () => {
    CustomRouter.push('propositions');
  };

  return (
    <>
      <UI.CustomAccordion.Item
        withDivider={!shouldHideDividers}
        onEditButtonClick={setShouldShowEditPopup.on}
        icon={logoLink}
        defaultIcon={<Car />}
        isOpen={isOpen}
        title={title}
        description={<UI.FormSubtitle id={AnketaScrollingLabels.PolcyInfo}>{companyName}</UI.FormSubtitle>}
        scrollIntoView={isOpen}
        withEdit
      />

      <PolicyStartDateModal
        isDialogOpen={isEditPopupVisible}
        onDialogClose={setShouldShowEditPopup.off}
        onDataChanged={onFormSubmit}
        withAdditionalButton
        additionalButton={
          <Button
            color="blue"
            variant={isMobile ? 'text' : 'secondary'}
            onClick={redirectToPropositions}
          >
            {AccordionModalFormTexts.redirectToPropositionsBtn}
          </Button>
        }
      />
    </>
  );
};
