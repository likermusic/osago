import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import type { BadgeProps } from '@sravni/react-design-system/dist/types/components/Badge';
import type { ReactNode } from 'react';

type TPolicyStatuses = 'negative' | 'positive';
export type TPolicyDate = {
  description: string;
  status: TPolicyStatuses;
  endDate: string;
  remainingDays: number;
};

export interface IPolicy {
  AvatarIcon: ReactNode;
  badges?: BadgeProps[];
  subtitle: string;
  title?: string;
}

export interface IPolicyClick extends IPolicy {
  orderHash: string;
  regNumber: Nullable<string>;
  vehicleType: VehicleType;
}

export interface StatePolicies {
  result: IPolicyClick[];
}
