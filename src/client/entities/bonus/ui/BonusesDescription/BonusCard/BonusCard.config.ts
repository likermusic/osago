import type { CardColor } from '@sravni/react-design-system/dist/types/components/Card/types/Card.types';

import { IPromoTypes } from 'shared/types/BonusesDescription';

export const BONUS_COLOR: Record<IPromoTypes, CardColor> = {
  [IPromoTypes.fitService]: 'orange',
  [IPromoTypes.ivi]: 'red',
  [IPromoTypes.yandexHealth]: 'orange',
  [IPromoTypes.astroVolga]: 'light',
  [IPromoTypes.els24]: 'light',
  [IPromoTypes.gazprom]: 'blue',
  [IPromoTypes.svyaznoyOsago]: 'blue',
  [IPromoTypes.svyaznoyNative]: 'blue',
  [IPromoTypes.fire]: 'blue',
  [IPromoTypes.okko]: 'blue',
  [IPromoTypes.sber]: 'blue',
  [IPromoTypes.ndflka]: 'blue',
  [IPromoTypes.rgsGiftBase]: 'blue',
  [IPromoTypes.rgsGiftExtended]: 'blue',
};
