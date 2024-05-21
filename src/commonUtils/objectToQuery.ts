export const objectToQuery = (obj: Record<string, unknown>) => {
  if (!obj) {
    return '';
  }

  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};
