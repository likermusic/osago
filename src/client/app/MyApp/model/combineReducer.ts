import { baseRTKApi } from 'shared/api/baseApi';

/**
 * Этот файл участвует в формировании типов на сервере
 * Поэтому импорты тут не должны вести на вьюхи, только на редьюсеры в моделях
 * иначе сервак может развалиться
 * */
import { appConfigSlice } from 'entities/appConfig/model/appConfig.slice';
import { authSmsSlice } from 'entities/authSms/model/authSms.slice';
import { carInfoSlice } from 'entities/carInfo/model/carInfo.slice';
import { contactsSlice } from 'entities/contacts/model/contacts.slice';
import { crossSlice } from 'entities/cross/model/cross.slice';
import { driversSlice } from 'entities/drivers/model/drivers.slice';
import { hintNotificationSlice } from 'entities/hintNotification/model/hintNotifications.slice';
import { insuranceCompaniesSlice } from 'entities/insuranceCompanies/model/insuranceCompanies.slice';
import { insurerSlice } from 'entities/insurer/model/insurer.slice';
import { invitationSlice } from 'entities/invitation/model/invitation.slice';
import { locationSlice } from 'entities/locations/model/location.slice';
import { metadataSlice } from 'entities/metadata/model/metadata.slice';
import { orderSlice } from 'entities/order/model/order.slice';
import { ownerSlice } from 'entities/owner/model/owner.slice';
import { peopleSlice } from 'entities/people/model/people.slice';
import { policiesSlice } from 'entities/policies/model/policies.slice';
import { policyDraftSlice } from 'entities/PolicyDraft/model/policyDraft.slice';
import { policyInfoSlice } from 'entities/PolicyInfo/model/policyInfo.slice';
import { calculationPreviousSlice } from 'entities/previousCalculations/model/calculationPrevious.slice';
import { prolongationSlice } from 'entities/prolongation/model/prolongation.slice';
import { propositionCalculationsSlice } from 'entities/propositionCalculations/model/propositionCalculations.slice';
import { purchasedPolicySlice } from 'entities/purchasedPolicy/model/purchasedPolicy.slice';
import { restoredQuerySlice } from 'entities/restoredQuery/model/restoredQuery.slice';
import { reviewsSlice } from 'entities/reviews/model/reviews.slice';
import { selectedPropositionSlice } from 'entities/selectedProposition/model/selectedProposition.slice';
import { siteSettingsSlice } from 'entities/siteSettings/model/siteSettings.slice';
import { userSlice } from 'entities/user/model/user.slice';
import { whiteLabelSlice } from 'entities/whiteLabels/model/whiteLabels.model';

import { inviteFriendSlice } from 'features/InviteFriend/model/inviteFriend.slice';

import { raffleRegistrationSlice } from 'widgets/RaffleRegistration/model/RaffleRegistration.slice';

export const reducers = {
  order: orderSlice.reducer,
  siteSettings: siteSettingsSlice.reducer,
  metadata: metadataSlice.reducer,
  user: userSlice.reducer,
  locations: locationSlice.reducer,
  purchasedPolicy: purchasedPolicySlice.reducer,
  cross: crossSlice.reducer,
  authSms: authSmsSlice.reducer,
  previousCalculations: calculationPreviousSlice.reducer,
  propositionCalculations: propositionCalculationsSlice.reducer,
  invitation: invitationSlice.reducer,
  insuranceCompanies: insuranceCompaniesSlice.reducer,
  policies: policiesSlice.reducer,
  reviews: reviewsSlice.reducer,
  carInfo: carInfoSlice.reducer,
  restoredQuery: restoredQuerySlice.reducer,
  drivers: driversSlice.reducer,
  hintNotification: hintNotificationSlice.reducer,
  owner: ownerSlice.reducer,
  insurer: insurerSlice.reducer,
  contacts: contactsSlice.reducer,
  people: peopleSlice.reducer,
  prolongation: prolongationSlice.reducer,
  appConfig: appConfigSlice.reducer,
  whiteLabel: whiteLabelSlice.reducer,
  policyInfo: policyInfoSlice.reducer,
  inviteFriend: inviteFriendSlice.reducer,
  policyDraft: policyDraftSlice.reducer,
  selectedProposition: selectedPropositionSlice.reducer,
  raffleRegistration: raffleRegistrationSlice.reducer,
  [baseRTKApi.reducerPath]: baseRTKApi.reducer,
};
