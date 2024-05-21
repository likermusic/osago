import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import scrollToElement from 'scroll-to-element';

interface Options {
  offset: number;
  align?: 'top' | 'middle' | 'bottom' | undefined;
  ease?: string | undefined;
  duration?: number | undefined;
}

export const useScrollIntoView = (htmlId: string) => {
  const { ref, inView: isBlockInView } = useInView({
    initialInView: true,
    threshold: 0,
  });

  const scrollElementIntoView = useCallback(
    (options?: Options) => {
      scrollToElement(`#${htmlId}`, options);
    },
    [htmlId],
  );

  return {
    htmlId,
    scrollElementIntoView,
    ref,
    isBlockInView,
  };
};
