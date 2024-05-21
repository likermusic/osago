import { capitalizeFirstLetter } from 'shared/lib/formatters';

export const capitalizeFullName = (val = '') => {
  if (!val?.trim()) {
    return '';
  }
  const [firstName, lastName, middleName] = val.trim().toLowerCase().split(' ');
  return [capitalizeFirstLetter(firstName), capitalizeFirstLetter(lastName), capitalizeFirstLetter(middleName)].join(
    ' ',
  );
};
