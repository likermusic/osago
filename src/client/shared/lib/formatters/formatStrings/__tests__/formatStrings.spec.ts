import {
  removeDashes,
  removeMaskSymbols,
  removeUnderscores,
  replaceSpacesToUnbreakableGap,
  trim,
} from '../formatStrings';

describe('modules/formatters/formatStrings', () => {
  describe('removeUnderscores', () => {
    it('should not change empty str', () => {
      expect(removeUnderscores('')).toBe('');
    });

    it('should return str without underscores', () => {
      expect(removeUnderscores(`a_b_c_d`)).toBe('abcd');
    });
  });

  describe('removeDashes', () => {
    it('should not change empty str', () => {
      expect(removeDashes('')).toBe('');
    });

    it('should return str without dashes', () => {
      expect(removeDashes(`a-b-c-d`)).toBe('abcd');
    });
  });

  describe('removeMaskSymbols', () => {
    it('should not change empty str', () => {
      expect(removeMaskSymbols('')).toBe('');
    });

    it('should return str without spaces, tabs, underscores and new lines', () => {
      expect(removeMaskSymbols(`a b\tc\nd_e`)).toBe('abcde');
    });
  });

  describe('trim', () => {
    it('should not change empty str', () => {
      expect(trim('')).toBe('');
    });

    it('should return trimmed str', () => {
      expect(trim(` \t\nabcd\t\n `)).toBe('abcd');
    });
  });

  describe('replaceSpaces', () => {
    it('WHEN provided empty string MUST not change empty str', () => {
      expect(replaceSpacesToUnbreakableGap('')).toBe('');
    });

    it('WHEN provided string with spaces MUST replace spaces', () => {
      expect(replaceSpacesToUnbreakableGap(`a b c d`)).toBe('a\u00A0b\u00A0c\u00A0d');
    });

    it.each([null, undefined])('WHEN provided nullable value - $p with spaces MUST replace spaces', (val) => {
      expect(replaceSpacesToUnbreakableGap(val)).toBe('');
    });
  });
});
