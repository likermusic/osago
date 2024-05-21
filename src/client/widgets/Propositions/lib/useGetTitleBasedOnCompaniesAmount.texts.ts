export const useGetTitleBasedOnCompaniesAmountTexts = {
  startText: 'Опрашиваем страховые компании',
  getTimerText: (respondCompanies: number) => `Опрашиваем страховые компании: ${respondCompanies} уже ответили`,
  getProgressBarText: (respondCompanies: number) => `Ответило компаний: ${respondCompanies} `,
};
