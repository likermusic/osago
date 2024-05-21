import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';
import type { TQuerySupportedForMapping } from 'shared/types/TQuerySupportedForMapping';

import { selectContactsData, setContactsData } from 'entities/contacts';
import { setDrivers } from 'entities/drivers';
import { setInsurerData } from 'entities/insurer';
import { setOwnerData } from 'entities/owner';
import { mapPolicyInfo, setPolicyInfo } from 'entities/PolicyInfo';
import { setPromocode } from 'entities/propositionCalculations';
import { updateSelectedPropositionPartial } from 'entities/selectedProposition';
import { saveRestoredUserId } from 'entities/user';

import {
  isTRestoreCalculationQueryResponse,
  isTRestoreOrderQuery,
  mapCalculationQueryToFormContacts,
  mapCalculationQueryToFormDrivers,
  mapCalculationQueryToFormOwner,
  mapCalculationQueryToFormUser,
} from '../mapCalculationQueryToFormData';

export const updateFormStoreThunk =
  (data: TQuerySupportedForMapping): ThunkResult<void> =>
  (dispatch, getState) => {
    const owner = mapCalculationQueryToFormOwner(data);
    const insurer = mapCalculationQueryToFormUser(data.insurer || {});
    const contactsData = selectContactsData(getState());

    dispatch(setOwnerData({ data: owner }));
    dispatch(setInsurerData({ isActive: !comparePeopleWithFullNameAsObject(insurer, owner), values: insurer }));
    dispatch(setContactsData({ data: mapCalculationQueryToFormContacts(data, contactsData) }));
    dispatch(setDrivers(mapCalculationQueryToFormDrivers(data)));
    dispatch(
      setPolicyInfo(
        mapPolicyInfo({
          startDate: data.policyStartDate,
        }),
      ),
    );

    if (data?.userId || data?.insurer?.phone) {
      dispatch(
        saveRestoredUserId({
          sub: data?.userId ? data?.userId?.toString() : null,
          phone_number: data?.insurer?.phone ?? null,
        }),
      );
    }

    if (isTRestoreOrderQuery(data)) {
      // price: null потому что при восстановлении в квере цены нет мы берем ее из ручки restoreSelectedPropositionInfo
      dispatch(
        // активную компанию и цену берем из ручки v1/order/${encodeURI(orderHash)}/tehinfo?ignoreLastDnd=true
        // в восстановлении тут точно нет цены и может не быть актуальной компании по которой был последний заказ
        updateSelectedPropositionPartial({
          productId: data?.save?.productId ?? null,
          searchId: data?.save?.searchId ?? null,
          isDataChangedOnSummary: false,
        }),
      );
    }

    if (isTRestoreCalculationQueryResponse(data)) {
      dispatch(setPromocode(data?.benefitCode ?? null));
    }
  };
