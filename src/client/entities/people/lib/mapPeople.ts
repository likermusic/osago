import type { Profile } from 'commonTypes/api/profile';
import { formatDate } from 'commonUtils/formatters';

import type { TPerson } from '../types';

export const mapPeople = (response: Profile.PostPeopleResponse): TPerson[] =>
  response?.people
    ?.filter((person) => person?.fullName)
    ?.map(
      (person): TPerson => ({
        phone: person.phone || '',
        email: person.email || '',
        fromEsia: person.fromEsia ?? false,
        address: {
          value: person.address?.formattedAddress ?? undefined,
          source:
            person.address?.formattedFiasLevel && person.address?.data?.region
              ? {
                  data: {
                    fias_level: person.address.formattedFiasLevel,
                    region: person.address.data.region,
                  },
                }
              : undefined,
        },
        addressFlat: person.address?.data?.flatNumber ?? undefined,
        birthday: person?.birthDate ? formatDate.toClientFromServer(person.birthDate) : undefined,
        experienceStartDate: person?.license?.experienceStartDate
          ? formatDate.toClientFromServer(person?.license?.experienceStartDate)
          : undefined,
        fullName: person.fullName?.toString() ?? '',
        hasPreviousLicence: false,
        licenceNumber: person?.license?.number ?? undefined,
        passportNumber: person?.passport?.number ?? undefined,
        passportIssueDate: person?.passport?.obtainingDate
          ? formatDate.toClientFromServer(person.passport.obtainingDate)
          : undefined,
      }),
    )
    .sort((a, b) => Number(b.fromEsia) - Number(a.fromEsia)) ?? [];
