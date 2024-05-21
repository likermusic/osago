import { Avatar, Dialog } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { FixedWidthDialog } from 'shared/ui/FixedWidthDialog';

import { Body } from './Body';
import { Footer } from './Footer';
import { PropositionDetailPopupTexts } from './PropositionDetailPopup.texts';

type TCompany = {
  companyName: string;
  logoLink: string;
};

interface IExtendedInformationPopup extends Omit<React.ComponentProps<typeof Body>, 'isMobile'> {
  // Информация о страховой компании
  company: TCompany;
  // Функция для закрытия модального окна
  onClose: () => void;
  // Флаг, отвечающий за видимость модального окна
  visible: boolean;
}

export const PropositionDetailPopup: FC<IExtendedInformationPopup> = ({
  children,
  company,
  onClose,
  visible,
  description,
}) => {
  const isMobile = useIsMobile();
  return (
    <FixedWidthDialog
      fullscreen={isMobile}
      onClose={onClose}
      visible={visible}
    >
      <Dialog.Header
        title={company.companyName}
        subtitle={PropositionDetailPopupTexts.subtitle}
        icon={
          <Avatar
            size={52}
            src={company.logoLink}
          />
        }
      />

      <Dialog.Content>
        <Body description={description} />
      </Dialog.Content>

      <Dialog.Footer className="h-shadow-backward h-pt-16">
        <Footer price={description.price.all}>{children}</Footer>
      </Dialog.Footer>
    </FixedWidthDialog>
  );
};
