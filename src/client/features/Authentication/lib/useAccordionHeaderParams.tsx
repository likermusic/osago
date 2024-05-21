import { beautifyPhoneNumber, concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';
import { useMemo } from 'react';

import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';

import type { ContactsCommonFields } from 'entities/contacts';

import { AuthenticationTexts } from '../ui/Authentication.texts';

export const useAccordionHeaderParams = (data: Nullable<ContactsCommonFields>, isOpen: boolean) => {
  const { title = 'Ваши контакты', description = '' } = useMemo(() => {
    if (!data || isOpen) {
      return {};
    }

    return {
      title: AuthenticationTexts.fullFilledCaption,
      description: concatWithPrefix(data.email, beautifyPhoneNumber(data.mobilePhone), TEXT_DOT_SEPARATOR),
    };
  }, [data, isOpen]);

  return [title, description] as const;
};
