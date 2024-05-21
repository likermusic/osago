export const getQueryParamsFromUrl = (url: string) => {
  const index = url?.lastIndexOf('?');
  if (index === -1 || !url) return '';

  return url.slice(index + 1);
};
