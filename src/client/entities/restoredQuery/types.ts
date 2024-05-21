import type { TFrontQuery } from 'commonTypes/TFrontQuery';

export type RestoredQueryReducer = {
  data: Nullable<Partial<TFrontQuery>>;
  // Флаг используется, чтобы при восстановлении данных в форму на лендинге, при последующем переходе с лендинга на анкету не стирались только что заполненные данные анкеты
  shouldResetAnketa: boolean;
};
