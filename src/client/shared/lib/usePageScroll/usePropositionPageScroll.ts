import { useCallback } from 'react';

import { useScrollIntoView } from '../useScrollIntoView';

import { ANKETA_ID, AnketaScrollingLabels, PROPOSITION_LIST_ID, SUCCESS_PROPOSITION_LIST_ID } from './config';
import { toggleSummaryAccordion } from './toggleSummaryAccordion';

export const usePropositionPageScroll = () => {
  const { scrollElementIntoView: scrollAnketaIntoView, htmlId: anketaId } = useScrollIntoView(ANKETA_ID);
  const { scrollElementIntoView: scrollToPropositions, htmlId: propositionId } = useScrollIntoView(PROPOSITION_LIST_ID);
  const { scrollElementIntoView: scrollToSuccessPropositions, htmlId: successPropositionId } =
    useScrollIntoView(SUCCESS_PROPOSITION_LIST_ID);

  const navigateToAnketa = useCallback(() => {
    const isSummaryOpened = document.getElementById(anketaId);
    if (!isSummaryOpened) {
      toggleSummaryAccordion();
    }

    scrollAnketaIntoView();
  }, [anketaId, scrollAnketaIntoView]);

  const openSummaryBlockById = useCallback(
    (id: keyof typeof AnketaScrollingLabels) => {
      if (id === 'DND') {
        // Блок ДНД не в аккордионе, нет смысла дергать открывать аккордион, если он закрыт
        scrollAnketaIntoView();
      } else {
        navigateToAnketa();
      }

      setTimeout(() => {
        /**
         * Если аккордион саммари был свернут, то он не успевает разренуться до клика по блоку,
         * поэтому приходится отправлять часть кода в макротаску,
         * чтобы дать время скроллеру доехать до самари и развернуть ее
         * */
        const label = AnketaScrollingLabels[id];
        let element = document.getElementById(label === AnketaScrollingLabels.Driver ? `${label}0` : label);

        if (label === AnketaScrollingLabels.CarInsurer && !element) {
          // insurer может быть собственником и тогда надо навигировать на собственника
          element = document.getElementById(AnketaScrollingLabels.CarOwner);
        }

        if (element) {
          element.click();
        }
      }, 0);
    },
    [navigateToAnketa, scrollAnketaIntoView],
  );

  const openSingleDriverOnly = useCallback(() => {
    const isDriverMoreThenOne = document.getElementById(`${AnketaScrollingLabels.Driver}1`);

    if (isDriverMoreThenOne) {
      // если есть драйвер с первым индексом, то просто скролим до анкеты, юзер сам откроет нужного драйвера
      navigateToAnketa();
      return;
    }

    openSummaryBlockById('Driver');
  }, [navigateToAnketa, openSummaryBlockById]);

  const navigateToPropositionList = useCallback(() => {
    /**
     * Отступ рассчитываем в зависимости от высоты экрана.
     * На старых браузерах innerHeight пустой, поэтому там по дефолту будет смещение на 150
     * */
    const offset = -(window.innerHeight ? window.innerHeight / 4 : 150);

    scrollToPropositions({
      offset,
    });
  }, [scrollToPropositions]);

  const navigateToSuccessPropositionList = useCallback(() => {
    /**
     * Отступ рассчитываем в зависимости от высоты экрана.
     * На старых браузерах innerHeight пустой, поэтому там по дефолту будет смещение на 150
     * 70 - высота кнопки + марджин к которой привязываемся из-за того что есть анмаунт у самого списка и мы не можем к его id привязаться
     * */
    const offset = -(window.innerHeight ? window.innerHeight / 4 : 150) + 70;

    scrollToSuccessPropositions({
      offset,
    });
  }, [scrollToSuccessPropositions]);

  return {
    anketaId,
    propositionId,
    navigateToPropositionList,
    navigateToAnketa,
    openSummaryBlockById,
    openSingleDriverOnly,
    navigateToSuccessPropositionList,
    successPropositionId,
  };
};
