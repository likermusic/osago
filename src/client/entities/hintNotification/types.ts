import type { SliceStateFromReducer } from 'shared/types';

import type { hintNotificationSlice } from './model/hintNotifications.slice';

export interface IHintNotification {
  type: 'info';
  message: string;
  title?: string;
  position: number;
}

export type IHintNotificationState = SliceStateFromReducer<typeof hintNotificationSlice>;
export interface IHint {
  text: string;
  title?: string;
}

export type TFormHintsNullableAndDifferFromType<
  fields,
  THintsDifferFromType extends string,
  TNullableHints extends string,
> = Record<keyof Omit<fields, THintsDifferFromType | TNullableHints>, IHint> &
  Record<THintsDifferFromType, Record<string, IHint>> &
  Record<TNullableHints, null>;

export type TFormHintsNullable<fields, TNullableHints extends string> = Record<
  keyof Omit<fields, TNullableHints>,
  IHint
> &
  Record<TNullableHints, null>;

export interface IHintWrapperProps {
  isMobileFlow: boolean;
  shouldShowMobileHint?: boolean;
  shouldShowDesktopHint?: boolean;
  hintText: string;
  hintTitle?: string;
  shouldShowOverControl?: boolean;
}
