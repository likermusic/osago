import type React from 'react';
import { useCallback, useState } from 'react';

import { isEventFromActiveElement } from 'shared/lib/activeElementClickInterceptor';

export const useTogglePropositionDetails = () => {
  const [isCardDetailsOpened, setIsCarDetailsOpened] = useState(false);

  const togglePropositionDetails = useCallback((newValue: boolean) => {
    setIsCarDetailsOpened(newValue);
  }, []);

  const openPropositionDetails = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isCardDetailsOpened || isEventFromActiveElement(e)) {
        return;
      }

      /**
       * При всплытии события click тригирит этот хендлер,
       * и не дает попапу закрыться, поэтому не вызываем обновление стейта,
       * если расширенная инфа уже открыта
       * */
      setIsCarDetailsOpened(true);
    },
    [isCardDetailsOpened],
  );

  return {
    isCardDetailsOpened,
    togglePropositionDetails,
    openPropositionDetails,
  };
};
