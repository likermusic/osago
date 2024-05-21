import { concatWithPrefix, formatDocumentNumber } from '@sravni/cosago-react-library/lib/utils';

import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';

import { removeUnderscores, replaceSpacesToUnbreakableGap } from '../formatStrings';

export const formatPersonDataDescription = (
  prefix: string,
  birthday?: string,
  passport?: string,
  passportIssueDate?: string,
  address?: string,
  flat?: string,
  isExtendedData?: boolean,
) => {
  let description = prefix;

  if (birthday) {
    description = concatWithPrefix(description, removeUnderscores(birthday), TEXT_DOT_SEPARATOR);
  }

  if (passport) {
    description = concatWithPrefix(
      description,
      `Паспорт ${replaceSpacesToUnbreakableGap(formatDocumentNumber(removeUnderscores(passport)))}`,
      TEXT_DOT_SEPARATOR,
    );
  }

  if (passportIssueDate && isExtendedData) {
    description = concatWithPrefix(description, `от ${removeUnderscores(passportIssueDate)}`, ' ');
  }

  if (address && isExtendedData) {
    description = concatWithPrefix(description, removeUnderscores(address), TEXT_DOT_SEPARATOR);

    if (flat) {
      description = concatWithPrefix(description, removeUnderscores(flat), ', кв. ');
    }
  }

  return description;
};
