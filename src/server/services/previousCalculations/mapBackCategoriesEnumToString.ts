const MAP_NUMERIC_TO_STRING = {
  0: 'b',
  1: 'c',
  2: 'a',
  3: 'd',
  4: 'e',
};

// TODO: спилить костыль, после того как бек будет готов к переезду в гейтвей. На текущий момент мы ходим в стафф и в стаффе не можем поменять енам с числового на строку
// https://sravni-corp.atlassian.net/browse/OS-10309
export const mapBackCategoriesEnumToString = <
  T extends { result?: null | Array<{ vehicleCategory?: string | keyof typeof MAP_NUMERIC_TO_STRING }> },
>(
  data: T,
) => ({
  ...data,
  result: data?.result?.map(({ vehicleCategory, ...item }) => ({
    ...item,
    vehicleCategory: typeof vehicleCategory === 'number' ? MAP_NUMERIC_TO_STRING[vehicleCategory] : vehicleCategory,
  })),
});
