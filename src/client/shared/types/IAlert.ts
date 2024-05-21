import type {
  AlertColor,
  AlertVariant,
} from '@sravni/react-design-system/dist/types/components/Alert/types/Alert.types';

export interface IAlert {
  title: string;
  subtitle: string;
  action: string | null;
}

export interface IDetailAlert extends IAlert {
  code?: string;
  color: AlertColor | undefined;
  variant?: AlertVariant | undefined;
  type?: 'sravniAward';
  modalTitle?: string;
  url?: string;
}
