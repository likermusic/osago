import { mapUserWithPassport } from 'shared/lib/normalizers/mapUser';
import type { UserCommonFields } from 'shared/types';

import type { ContactsCommonFields } from 'entities/contacts';

import { mapAddress } from './mapAddress';

export const mapInsurerOwner = (
  user: UserCommonFields,
  contacts: Pick<ContactsCommonFields, 'email' | 'mobilePhone'>,
  withContacts: boolean,
) => {
  const userContacts = withContacts
    ? {
        email: contacts.email,
        phone: contacts.mobilePhone,
      }
    : {};

  return {
    ...mapUserWithPassport(user),
    ...userContacts,
    registrationAddress: user?.registrationAddress?.value
      ? mapAddress(user.registrationAddress.value.toString(), user?.registrationAddressFlat ?? undefined)
      : undefined,
    formattedFiasLevel: user?.registrationAddress?.data?.fias_level,
  };
};
