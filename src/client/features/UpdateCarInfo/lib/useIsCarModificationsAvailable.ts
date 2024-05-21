import { useOptions } from './useOptions';

export const useIsCarModificationsAvailable = () => {
  const { modifications } = useOptions();
  return modifications?.length > 0;
};
