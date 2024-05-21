import { Documents } from '@sravni/cosago-react-library/lib/constants';
import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';
import { parseFullName } from '@sravni/cosago-react-library/lib/utils';

import { formatDate } from 'commonUtils/formatters';

import { getDocumentSeriesNumberObj } from 'shared/lib/getDocumentSeriesNumberObj';

type IUser = {
  fullName: Nullable<ICustomSelectValue>;
  birthday: string;
};

type TUserWithPassport = IUser & {
  passportNumber: string;
  passportIssueDate: string;
};

export const mapUser = (user: IUser) => {
  const fullName = user.fullName ? parseFullName(user.fullName) : undefined;
  return {
    ...fullName,
    birthDate: user.birthday ? formatDate.toServerFromClient(user.birthday) : undefined,
  };
};

export const mapUserWithPassport = (user: TUserWithPassport) => ({
  ...mapUser(user),
  passport: {
    ...getDocumentSeriesNumberObj(user.passportNumber, Documents.EParticipantDocuments.PASSPORT),
    issueDate: user.passportIssueDate ? formatDate.toServerFromClient(user.passportIssueDate) : undefined,
  },
});
