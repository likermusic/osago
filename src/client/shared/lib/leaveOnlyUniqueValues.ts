export const leaveOnlyUniqueValues = <T>(array: T[]): T[] =>
  array?.filter((value, index, self) => self.indexOf(value) === index) ?? [];
