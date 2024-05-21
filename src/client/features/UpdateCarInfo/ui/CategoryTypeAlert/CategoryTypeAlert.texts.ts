export const getCategoryAlertTitle = (category: string | undefined) => {
  if (category === 'A') return `Вы оформляете полис на категорию «A»`;

  return `Вы оформляете полис на категорию «${category || ''}». Если у вас другая категория, обратитесь в страховую`;
};
