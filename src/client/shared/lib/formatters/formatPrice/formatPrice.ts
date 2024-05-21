export const formatPrice = (value: number | null | undefined) =>
  value
    ? `${Math.floor(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '\xa0')}\xa0₽`
    : '';
