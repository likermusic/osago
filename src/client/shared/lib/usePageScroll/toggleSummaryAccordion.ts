import { SUMMARY_ACCORDION_ID } from './config';

export const toggleSummaryAccordion = () => {
  const element = document.getElementById(SUMMARY_ACCORDION_ID)?.firstElementChild?.firstElementChild;

  if (element) {
    (element as HTMLElement).click?.();
  }
};
