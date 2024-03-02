import { describe, expect, test } from 'vitest';
import { getFullName } from './getFullName';
import { list } from './stringHelpers';

describe('stringHelpers', () => {
  describe('list', () => {
    test('2 items', () => {
      expect(list(['apples', 'oranges'])).toBe('apples & oranges');
    });
    test('3 items', () => {
      expect(list(['apples', 'oranges', 'bananas'])).toBe(
        'apples, oranges & bananas'
      );
    });
    test('no items', () => {
      expect(list([])).toBe('');
    });
  });

  describe('getFullName', () => {
    test('empty', () => {
      expect(getFullName({ firstName: '', lastName: '' })).toBe('');
    });
    test('first last', () => {
      expect(getFullName({ firstName: 'John', lastName: 'Smith' })).toBe(
        'John Smith'
      );
    });
    test('first middle last', () => {
      expect(
        getFullName({
          firstName: 'John',
          middleName: 'D',
          lastName: 'Smith',
        })
      ).toBe('John D Smith');
    });
    test('last, first', () => {
      expect(
        getFullName(
          {
            firstName: 'John',
            lastName: 'Smith',
          },
          {
            lastNameFirst: true,
          }
        )
      ).toBe('Smith, John');
    });
    test('last, first middle', () => {
      expect(
        getFullName(
          {
            firstName: 'John',
            middleName: 'D',
            lastName: 'Smith',
          },
          {
            lastNameFirst: true,
          }
        )
      ).toBe('Smith, John D');
    });
  });
});
