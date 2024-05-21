import { Button } from '@sravni/react-design-system';
import { useBoolean } from '@sravni/react-utils';
import React from 'react';

import PdfIcon from 'shared/assets/icons/pdfIcon.svg';

import { PolicyPopup } from '../PolicyPopup/PolicyPopup';

interface PolicyDraftProps {
  policyHref: string;
  title: string;
  handleClick?: () => void;
}

export const PolicyDraft: FC<PolicyDraftProps> = ({ policyHref, title, className, handleClick, children }) => {
  const [isVisible, setVisible] = useBoolean(false);

  const handleOpen = () => {
    handleClick?.();
    setVisible.on();
  };

  return (
    <>
      <Button
        block
        color="gray"
        onClick={handleOpen}
        variant="secondary"
        className={className}
      >
        <PdfIcon
          width={20}
          height={20}
        />
        {title}
      </Button>

      <PolicyPopup
        isVisible={isVisible}
        title={title}
        onClose={setVisible.off}
        policyHref={policyHref}
      >
        {children}
      </PolicyPopup>
    </>
  );
};
