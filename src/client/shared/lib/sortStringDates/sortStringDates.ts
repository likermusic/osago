// dates format DD.MM.YYYY
export const sortStringDates = (dates: string[]) =>
  dates.sort((a, b) => {
    const convertedDateA = a.split('.').reverse().join('');
    const convertedDateB = b.split('.').reverse().join('');

    return Number(convertedDateA) - Number(convertedDateB);
  });
