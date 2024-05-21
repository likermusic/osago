import { useRouter } from 'next/router';

import { parseUrlQuery } from 'commonUtils/parseUrlQuery/parseUrlQuery';

export const useDeeplink = () => {
  const { query } = useRouter();

  return {
    params: parseUrlQuery(query as Record<string, string>),
    // TODO: Добавить метод для генерации ссылок когда это потребуется(например для перехода с анкеты в выдачу)
  };
};
