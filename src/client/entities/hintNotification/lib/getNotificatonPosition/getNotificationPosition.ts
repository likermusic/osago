import { convertToNumber } from 'shared/lib/convertToNumber/convertToNumber';

export const getNotificationPosition = (elementRopPosition: number) =>
  convertToNumber(elementRopPosition) + convertToNumber(document?.scrollingElement?.scrollTop);
