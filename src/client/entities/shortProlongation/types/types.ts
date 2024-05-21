import type { ReactNode } from 'react';

export enum Option {
  CalculatorImg = 'CalculatorImg',
  CatImg = 'CatImg',
  CoinsImg = 'CoinsImg',
  FilesImg = 'FilesImg',
  PhoneImg = 'PhoneImg',
}

export type TIcons = Record<Option, ReactNode>;
