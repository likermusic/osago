// на бэк отправляем только тогда когда пользователь участвует в конкретном эксперименте ОСАГО
export const getABTestOsago = (statisticsString?: string, experimentName?: string) => {
  if (!statisticsString || !experimentName) {
    return null;
  }

  return statisticsString
    .split('|')
    .filter((statistic) => statistic.includes(experimentName))
    .join('|');
};
