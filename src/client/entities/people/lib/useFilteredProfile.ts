import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { selectFioSuggestions } from '../model/people.selectors';

export const useFilteredProfile = (excludedPeopleFullNames?: string[]) => {
  const suggestions = useAppSelector(selectFioSuggestions);

  return useMemo(() => {
    if (!excludedPeopleFullNames) {
      return suggestions;
    }

    return suggestions.filter((person) => !excludedPeopleFullNames.includes(person.label));
  }, [suggestions, excludedPeopleFullNames]);
};
