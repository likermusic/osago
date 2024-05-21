import { PersonFormFields } from 'shared/lib/sendGAEvents/config';
import type { UserCommonFields } from 'shared/types';

import type {
  CrossStatusesType,
  DisplayLinkStatusesType,
  IDateFilter,
  IEventFieldsDriversValueChange,
  IEventFieldsValueChange,
  IEventInsuranceInfo,
  IEventMoveToPayment,
  IEventNewSubmitSummary,
  IEventPolicyDraft,
  IEventProductCardMoreClick,
  IPropositionEvent,
  ISelectProduct,
  IShowPaymentLink,
  Messenger,
  ProlongationActionType,
  TDataTypeSummaryModalOpen,
  TEntryRemoveDriver,
  TEntrySummaryModalOpen,
  TSendEventFailedPropositionsVisibilityButtonLabel,
  TSendEventProlongationForwardingResultLabel,
  TSummaryDataVisibilityValue,
} from './events';
import {
  eventShowCategoryAlert,
  eventClickEsiaLoginButton,
  eventEsiaLoginError,
  eventShowEsiaLogin,
  eventAddDriverForm,
  eventAuthSmsCode,
  eventAuthStatus,
  eventCalculation,
  eventCopyInviteLink,
  eventCrossPayment,
  eventCrossSelection,
  eventCrossShow,
  eventDateFilterInForwardingProposition,
  eventFailedPropositionsVisibilityButton,
  eventFieldsDriversValueChange,
  eventFieldsValueChange,
  eventInfoBlock,
  eventInsuranceInfo,
  eventLanding,
  eventLandingClick,
  eventLandingShowPolicies,
  eventLoadFailurePage,
  eventLoadInviteFriendLink,
  eventLoadSuccessPage,
  eventMoveToCrossPayment,
  eventMoveToEdit,
  eventMoveToPayment,
  eventNewSubmitSummary,
  eventOrderResult,
  eventPolicyDraft,
  eventProductCardMoreClick,
  eventProlongation,
  eventProlongationForwardingResult,
  eventPropositionAlerts,
  eventPropositions,
  eventRaffleBanner,
  eventRaffleLanding,
  eventRemoveDriver,
  eventResendSmsCode,
  eventRetryOrderAfterError,
  eventSelectProduct,
  eventShareButtonClick,
  eventShareLinkClick,
  eventShowAuthCard,
  eventShowPaymentLink,
  eventSortingPropositionsChange,
  eventSubmitCarInfo,
  eventSubmitContactsForm,
  eventSubmitDriverForm,
  eventSubmitInsurerForm,
  eventSubmitOtpCode,
  eventSubmitOwnerForm,
  eventSubmitSendSmsCode,
  eventSummaryDataModalOpen,
  eventSummaryDataVisibility,
  eventChooseCategoryField,
  eventShowCategoryField,
  eventShowKbmField,
  eventGetKbmFieldInfo,
  eventKbmFieldClick,
  eventKbmFieldDefaultModalClick,
  eventLandingVehicleSwitcher,
  eventStartGetKbmFieldInfo,
} from './events';
import { sendEventToGA } from './sendEventToGA';

export const sendEventCrossShow = (status: CrossStatusesType, numberOfOffers?: number) =>
  sendEventToGA(eventCrossShow(status, numberOfOffers));

export const sendEventCrossSelection = (companyName: string, crossName: string, price: number) =>
  sendEventToGA(eventCrossSelection(companyName, crossName, price));

export const sendEventMoveToCrossPayment = (companyName: string, crossName: string, price: number) =>
  sendEventToGA(eventMoveToCrossPayment(companyName, crossName, price));

export const sendEventCrossPayment = (companyName: string, crossName: string, price: number) =>
  sendEventToGA(eventCrossPayment(companyName, crossName, price));

export const sendEventLoadSuccessPage = (companyName?: string, price?: number) =>
  sendEventToGA(eventLoadSuccessPage(companyName, price));

export const sendEventLoadInviteFriendLink = (status: DisplayLinkStatusesType) =>
  sendEventToGA(eventLoadInviteFriendLink(status));

export const sendEventCopyInviteLink = () => sendEventToGA(eventCopyInviteLink());

export const sendEventShareLinkClick = (messenger: Messenger) => sendEventToGA(eventShareLinkClick(messenger));

export const sendEventShareButtonClick = () => sendEventToGA(eventShareButtonClick());

export const sendEventLoadFailurePage = (companyName?: string, price?: number) =>
  sendEventToGA(eventLoadFailurePage(companyName, price));

export const sendEventProlongation = (actionType: ProlongationActionType, isUserAuthorized: boolean) =>
  sendEventToGA(eventProlongation(actionType, isUserAuthorized));

export const sendEventInfoBlock = (
  elementType: 'Баннер' | 'Сохранение' | 'Телефон' | 'Чат',
  value: 'Плитка' | 'Подробнее' | 'Клик' | 'Отправка',
) => sendEventToGA(eventInfoBlock(elementType, value));

// заказ на расчете
export const sendEventSummaryDataVisibility = (action: TSummaryDataVisibilityValue) =>
  sendEventToGA(eventSummaryDataVisibility(action));

export const sendEventSummaryDataModalOpen = (dataType: TDataTypeSummaryModalOpen, entry: TEntrySummaryModalOpen) =>
  sendEventToGA(eventSummaryDataModalOpen(dataType, entry));

export const sendEventCarFieldsValueChange = (eventData: IEventFieldsValueChange) =>
  sendEventToGA(eventFieldsValueChange(eventData));

export const sendEventDriversCarFieldsValueChange = (eventData: IEventFieldsDriversValueChange) =>
  sendEventToGA(eventFieldsDriversValueChange(eventData));

export const sendEventRemoveDriver = (driverNum: number, entry: TEntryRemoveDriver) =>
  sendEventToGA(eventRemoveDriver(driverNum, entry));

export const sendEventSortingPropositionsChange = (sortingType: string) =>
  sendEventToGA(eventSortingPropositionsChange(sortingType));

export const sendEventNewSubmitSummaryClick = (eventData: IEventNewSubmitSummary) =>
  sendEventToGA(eventNewSubmitSummary(eventData));

export const sendEventProductCardMoreClick = (eventData: IEventProductCardMoreClick) =>
  sendEventToGA(eventProductCardMoreClick(eventData));

/**
 * События должны отправляться только один раз для каждого типа
 */
export const sendInsuranceInfoClick = () => {
  const typesSent = new Set();
  return (eventData: IEventInsuranceInfo) => {
    const type = eventData.type || eventData.giftName;

    if (type && !typesSent.has(type)) {
      sendEventToGA(eventInsuranceInfo(eventData));
      type && typesSent.add(type);
    }
  };
};

/**
 * События должны отправляться только один раз для каждого типа
 */
export const sendEventPropositionAlerts = () => {
  const typesSent = new Set();
  return (color: string, companyName: string, title: string) => {
    const alertId = color + companyName + title;

    if (!typesSent.has(alertId)) {
      sendEventToGA(eventPropositionAlerts(color, companyName));
      alertId && typesSent.add(alertId);
    }
  };
};

export const sendEventPolicyDraft = (eventData: IEventPolicyDraft) => sendEventToGA(eventPolicyDraft(eventData));

export const sendEventMoveToPayment = (eventData: IEventMoveToPayment) => sendEventToGA(eventMoveToPayment(eventData));
export const sendEventDateFilterInForwardingProposition = (eventData: IDateFilter) =>
  sendEventToGA(eventDateFilterInForwardingProposition(eventData));
export const sendEventShowPaymentLink = (eventData: IShowPaymentLink) => sendEventToGA(eventShowPaymentLink(eventData));
export const sendEventProlongationForwardingResult = (
  eventLabel: TSendEventProlongationForwardingResultLabel,
  forwardingAmountInfo: string,
) => sendEventToGA(eventProlongationForwardingResult(eventLabel, forwardingAmountInfo));
export const sendEventOrderResult = (eventLabel: TSendEventProlongationForwardingResultLabel) =>
  sendEventToGA(eventOrderResult(eventLabel));
export const sendEventFailedPropositionsVisibilityButton = (
  eventLabel: TSendEventFailedPropositionsVisibilityButtonLabel,
  eventValue: number,
) => sendEventToGA(eventFailedPropositionsVisibilityButton(eventLabel, eventValue));
export const sendEventSelectProduct = (eventData: ISelectProduct) => sendEventToGA(eventSelectProduct(eventData));
export const sendEventPropositionsShow = (eventData: IPropositionEvent) => sendEventToGA(eventPropositions(eventData));
export const sendEventMoveToEdit = () => sendEventToGA(eventMoveToEdit());
export const sendEventRetryOrderAfterError = () => sendEventToGA(eventRetryOrderAfterError());
export const sendEventLanding = (...args: Parameters<typeof eventLanding>) => sendEventToGA(eventLanding(...args));
export const sendEventLandingVehicleSwitcher = (...args: Parameters<typeof eventLandingVehicleSwitcher>) =>
  sendEventToGA(eventLandingVehicleSwitcher(...args));
export const sendEventShowAuthCard = (...args: Parameters<typeof eventShowAuthCard>) =>
  sendEventToGA(eventShowAuthCard(...args));
export const sendEventLandingClick = (...args: Parameters<typeof eventLandingClick>) =>
  sendEventToGA(eventLandingClick(...args));
export const sendEventLandingShowPolicies = (...args: Parameters<typeof eventLandingShowPolicies>) =>
  sendEventToGA(eventLandingShowPolicies(...args));
export const sendEventCalculation = (...args: Parameters<typeof eventCalculation>) =>
  sendEventToGA(eventCalculation(...args));
export const sendEventAddDriverForm = (...args: Parameters<typeof eventAddDriverForm>) =>
  sendEventToGA(eventAddDriverForm(...args));
export const sendEventSubmitDriverForm = (...args: Parameters<typeof eventSubmitDriverForm>) =>
  sendEventToGA(eventSubmitDriverForm(...args));
export const sendEventSubmitOwnerForm = (...args: Parameters<typeof eventSubmitOwnerForm>) =>
  sendEventToGA(eventSubmitOwnerForm(...args));
export const sendEventSubmitInsurerForm = (...args: Parameters<typeof eventSubmitInsurerForm>) =>
  sendEventToGA(eventSubmitInsurerForm(...args));
export const sendEventSubmitContactsForm = (...args: Parameters<typeof eventSubmitContactsForm>) =>
  sendEventToGA(eventSubmitContactsForm(...args));
export const sendEventSubmitOtpCode = (...args: Parameters<typeof eventSubmitOtpCode>) =>
  sendEventToGA(eventSubmitOtpCode(...args));
export const sendEventSubmitCarInfo = (...args: Parameters<typeof eventSubmitCarInfo>) =>
  sendEventToGA(eventSubmitCarInfo(...args));
export const sendEventSubmitSendSmsCode = (...args: Parameters<typeof eventSubmitSendSmsCode>) =>
  sendEventToGA(eventSubmitSendSmsCode(...args));
export const sendEventAuthSmsCode = (...args: Parameters<typeof eventAuthSmsCode>) =>
  sendEventToGA(eventAuthSmsCode(...args));
export const sendEventResendSmsCode = (...args: Parameters<typeof eventResendSmsCode>) =>
  sendEventToGA(eventResendSmsCode(...args));
export const sendEventAuthStatus = (...args: Parameters<typeof eventAuthStatus>) =>
  sendEventToGA(eventAuthStatus(...args));
export const sendEventRaffleBanner = (...args: Parameters<typeof eventRaffleBanner>) =>
  sendEventToGA(eventRaffleBanner(...args));
export const sendEventRaffleLanding = (...args: Parameters<typeof eventRaffleLanding>) =>
  sendEventToGA(eventRaffleLanding(...args));

export const sendEventEsiaShowLogin = (...args: Parameters<typeof eventShowEsiaLogin>) =>
  sendEventToGA(eventShowEsiaLogin(...args));

export const sendEventClickEsiaLoginButton = (...args: Parameters<typeof eventClickEsiaLoginButton>) =>
  sendEventToGA(eventClickEsiaLoginButton(...args));

export const sendEventEsiaLoginError = (...args: Parameters<typeof eventEsiaLoginError>) =>
  sendEventToGA(eventEsiaLoginError(...args));

export const sendEventEsiaFieldsValueChange = (
  fields: Record<string, IEventFieldsValueChange['newValue']>,
  eventAction: IEventFieldsValueChange['eventAction'],
) => {
  Object.keys(fields).forEach((fieldName) => {
    sendEventToGA(
      eventFieldsValueChange({
        eventAction,
        previousValue: '',
        newValue: fields[fieldName],
        fieldName,
        placement: 'Госуслуги',
      }),
    );
  });
};

export const sendEventEsiaPersonValueChange = (
  fields: UserCommonFields & { policyHolder?: string },
  eventAction: IEventFieldsValueChange['eventAction'],
) => {
  const user: Record<keyof typeof PersonFormFields, string> = {
    [PersonFormFields.birthday]: fields.birthday,
    [PersonFormFields.fullName]: fields.fullName?.value?.toString() ?? '',
    [PersonFormFields.passportIssueDate]: fields.passportIssueDate,
    [PersonFormFields.passportNumber]: fields.passportNumber,
    [PersonFormFields.registrationAddress]: fields.registrationAddress?.value.toString() ?? '',
    [PersonFormFields.registrationAddressFlat]: fields.registrationAddressFlat,
  };

  if (fields.policyHolder) {
    user[PersonFormFields.policyHolder] = fields.policyHolder ?? '';
  }

  sendEventEsiaFieldsValueChange(user, eventAction);
};

export const sendEventShowCategoryAlert = (...args: Parameters<typeof eventShowCategoryAlert>) =>
  sendEventToGA(eventShowCategoryAlert(...args));

export const sendEventShowCategoryField = (...args: Parameters<typeof eventShowCategoryField>) =>
  sendEventToGA(eventShowCategoryField(...args));

export const sendEventChooseCategoryField = (...args: Parameters<typeof eventChooseCategoryField>) =>
  sendEventToGA(eventChooseCategoryField(...args));

export const sendEventShowKbmField = (...args: Parameters<typeof eventShowKbmField>) =>
  sendEventToGA(eventShowKbmField(...args));

export const sendEventGetKbmFieldInfo = (...args: Parameters<typeof eventGetKbmFieldInfo>) =>
  sendEventToGA(eventGetKbmFieldInfo(...args));

export const sendEventKbmFieldClick = (...args: Parameters<typeof eventKbmFieldClick>) =>
  sendEventToGA(eventKbmFieldClick(...args));

export const sendEventKbmFieldDefaultModalClick = (...args: Parameters<typeof eventKbmFieldDefaultModalClick>) =>
  sendEventToGA(eventKbmFieldDefaultModalClick(...args));

export const sendEventStartGetKbmFieldInfo = (...args: Parameters<typeof eventStartGetKbmFieldInfo>) =>
  sendEventToGA(eventStartGetKbmFieldInfo(...args));
