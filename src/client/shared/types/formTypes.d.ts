interface IFormPopup {
  isDialog?: boolean;
  isLoading?: boolean;
  onClose?: () => void;
  onFormSubmit: (<T>(data?: T, isDialog?: boolean) => void) | undefined;
  setHeader: (newHeader: import('./IFormHeader').IFormHeader) => void;
  isFormForceOpened: boolean;
  shouldShowDriverKbm?: boolean;
}

type TAccordionProps = {
  isOpen: boolean;
  /*
   * Запускает валидацию при принудительном открытии шага
   */
  isFormForceOpened: boolean;
  /*
   * Нужно ли открывать попап если isFormForceOpened - тру
   */
  shouldForceOpenPopup: boolean;
  onPopupClose?: () => void;
  onFormSubmit?: IFormPopup['onFormSubmit'];
  isLoading?: boolean;
  shouldHideDividers?: boolean;
  isExtendedData?: boolean;

  // Фича аутентификации через Esia
  esiaLoginBlock?: JSX.Element;
};
