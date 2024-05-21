import { getQueryParamsFromUrl } from '../getQueryParamsFromUrl';

const QUERY =
  'utm_source=yandex&utm_medium=cpc&utm_term=%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%20%D0%9E%D0%A1%D0%90%D0%93%D0%9E&position_type=premium&utm_campaign=sravni_osago_search_msk_brand_57821661&utm_placement=none_{device}&utm_content=k50id--0100000024348951762_24348951762--cid--57821661--gid--4408910433--aid--12334154823--adp--no--pos--premium1--src--search_none--dvc--desktop--%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0_213_12334154823&yclid=17644536462828109823';

describe('WHEN "getQueryParamsFromUrl" is called', () => {
  test.each`
    url                                                     | query
    ${'https://www.sravni.ru/osago/?platenumber=A777AA777'} | ${'platenumber=A777AA777'}
    ${`https://www.sravni.ru/osago/?${QUERY}`}              | ${QUERY}
    ${'https://www.sravni.ru/osago/?'}                      | ${''}
    ${'https://www.sravni.ru/osago/'}                       | ${''}
  `('MUST map $fullAddress to $address - $address and flat - $flat', ({ url, query }) => {
    expect(getQueryParamsFromUrl(url)).toEqual(query);
  });

  test.each([undefined, '', null])('MUST map falsy values correctly', (url) => {
    expect(getQueryParamsFromUrl(url as string)).toEqual('');
  });
});
