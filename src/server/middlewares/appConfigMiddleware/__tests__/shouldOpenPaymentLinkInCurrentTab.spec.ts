import { PARTNERS_IDS } from '../../../../constants/partners';
import { shouldOpenPaymentLinkInCurrentTab } from '../shouldOpenPaymentLinkInCurrentTab';

describe('WHEN "shouldOpenPaymentLinkInCurrentTab" is called', () => {
  it.each([
    [undefined, undefined, false],
    ['', undefined, false],
    ['', '', false],
    ['', '', false],
    [PARTNERS_IDS.cardsMobileApp, '', true],
    ['', 'true', true],
  ])(
    'AND "parentId" is %p AND "paymentLinkInCurrentTab" is %p, MUST return %p',
    (parentId?: string | number, paymentLinkInCurrentTab?: string, result?: boolean) => {
      expect(shouldOpenPaymentLinkInCurrentTab(parentId as number, paymentLinkInCurrentTab)).toBe(result);
    },
  );
});
