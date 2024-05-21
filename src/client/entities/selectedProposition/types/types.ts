export interface SelectedPropositionState {
  price: Nullable<number>;
  productId: Nullable<number>;
  activeCompanyId: Nullable<number>;
  searchId: Nullable<string>;
  // когда данные квери изменилась на саммари мы не знаем точную цену и выводим отдельный текст
  isDataChangedOnSummary?: boolean;
}

export interface IMappedSelectedPropositionInfo {
  price: Nullable<number>;
  activeCompanyId: Nullable<number>;
}
