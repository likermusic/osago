import { isSaveInQueryValid } from '../isSaveInQueryValid';

const FULL_SAVE = {
  save: {
    searchId: 123345,
    productId: 56789,
  },
};

const PARTIAL_SAVE_WITH_PRODUCT_ID = {
  save: {
    productId: 56789,
  },
};

const PARTIAL_SAVE_WITH_SEARCH_ID = {
  save: {
    searchId: 56789,
  },
};

describe('WHEN "isSaveInQueryValid" called', () => {
  it.each`
    query                           | res
    ${undefined}                    | ${false}
    ${null}                         | ${false}
    ${{}}                           | ${false}
    ${''}                           | ${false}
    ${PARTIAL_SAVE_WITH_PRODUCT_ID} | ${false}
    ${PARTIAL_SAVE_WITH_SEARCH_ID}  | ${false}
    ${FULL_SAVE}                    | ${true}
  `('MUST return $res with query - $query', ({ query, res }) => {
    expect(isSaveInQueryValid(query)).toEqual(res);
  });
});
