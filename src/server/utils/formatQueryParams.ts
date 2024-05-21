export const formatQueryParams = (query: string): string => {
  if (!query) {
    return '';
  }

  const formattedParams = decodeURI(String(query)).replace(/["']/g, '');

  return formattedParams || '';
};
