export const convertLocationToMap = (locations?: ILocation[]): Record<number, ILocation> =>
  locations?.reduce(
    (acc, serviceLocation) => ({
      ...acc,
      [serviceLocation.id]: serviceLocation,
    }),
    {},
  ) || {};
