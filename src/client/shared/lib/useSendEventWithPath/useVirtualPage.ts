import { useRouter } from 'next/router';

import { PAGE_TO_VIRTUAL_PAGE_RECORD } from './pageToVirtualPage';

export const useVirtualPage = () => {
  const router = useRouter();

  return PAGE_TO_VIRTUAL_PAGE_RECORD[router.pathname];
};
