/**
 * ASC - from small to big
 * DESC - from big to small
 */
export const doSort = (type: 'ASC' | 'DESC', a?: number | null, b?: number | null) => {
  const itemA = type === 'ASC' ? a : b;
  const itemB = type === 'ASC' ? b : a;

  if (!itemA || !itemB) {
    return 0;
  }

  return itemA - itemB;
};
