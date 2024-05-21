export const PARAM_ATTR_DIVIDER = '_';
export const PARAM_ATTR_ID = 'p';

/**
 * Генерирует урл для страницы сео в формате REGEXP
 * @param rootRoute - урл страницы от которого строить роут
 * @param params - список параметров в урле, если параметр имеет префикс _p -
 * это переменная куда KOA скинет фактическое значение при парсинге
 * */
export const generateSeoPageRoute = (rootRoute: string, params: string[]) => {
  const pageUrl = `^${rootRoute}${params
    .map((param) => {
      const [key, paramAttr] = param.split(PARAM_ATTR_DIVIDER);

      return paramAttr?.toLowerCase() === PARAM_ATTR_ID ? `/(?<${key}>[-\\w]*)` : `/${key}`;
    })
    .join('')}/?$`;

  return new RegExp(pageUrl);
};
