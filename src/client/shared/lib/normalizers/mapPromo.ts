import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';
import { isDefined } from '@sravni/react-utils';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import type { IBonus, TInfoItem } from 'shared/types/BonusesDescription';
import { IPromoTypes } from 'shared/types/BonusesDescription';

const PROMO_NAME_RECORD: Record<IPromoTypes, string> = {
  [IPromoTypes.ivi]: 'Ivi',
  [IPromoTypes.yandexHealth]: 'YandexHealth',
  [IPromoTypes.els24]: 'Els24',
  [IPromoTypes.astroVolga]: 'AstroVolga',
  [IPromoTypes.fitService]: 'FitService',
  [IPromoTypes.svyaznoyOsago]: 'SvyaznoyOsago',
  [IPromoTypes.svyaznoyNative]: 'SvyaznoyNative',
  [IPromoTypes.fire]: 'Fire',
  [IPromoTypes.okko]: 'Okko',
  [IPromoTypes.sber]: 'Sber',
  [IPromoTypes.ndflka]: 'NDFLka',
  [IPromoTypes.gazprom]: 'Gazprom',
  [IPromoTypes.rgsGiftBase]: 'RgsGiftBase',
  [IPromoTypes.rgsGiftExtended]: 'RgsGiftExtended',
};

const convertBackendKeyToFrontend = (backendKey: string | undefined) =>
  Object.entries(PROMO_NAME_RECORD).find(([, backendPromoName]) => backendPromoName === backendKey)?.[0] as
    | IPromoTypes
    | undefined;

export const mapPromo = (
  promos: PropositionCalculations.GetCalculations['offers'][0]['company']['hidden']['promo'],
): IBonus[] =>
  promos?.promos
    ?.map((promo) => {
      const frontendName = convertBackendKeyToFrontend(promo?.code ?? undefined);
      return frontendName
        ? {
            advertText: concatWithPrefix(
              promo.about?.advertisingName ?? undefined,
              promo.about?.advertisingToken ?? undefined,
              ' – ',
            ),
            detail: {
              aboutText: promo.description ?? undefined,
              alertText: promo.subDescription ?? undefined,
              fullRulesLinkUrl: promo.ruleUrl ?? '',
              infoList: promo.data?.filter((item): item is TInfoItem => !!item.title && !!item.description) ?? [],
              logoUrl: promo.logoUrl ?? '',
              shortDescription: promo?.title ?? '',
            },
            logoBigLink: promo.logoBigUrl ?? '',
            name: frontendName,
            subtitle: promo.shortPromoInfo ?? '',
            title: promo.about?.name ?? '',
          }
        : undefined;
    })
    .filter(isDefined) ?? [];
