import { describe, expect, test } from 'vitest';
import { convertDataToOptions } from './convertDataToOptions';

describe('convertDataToOptions', () => {
  test('3 items, unsorted', () => {
    expect(
      convertDataToOptions([
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice' },
        { id: 3, name: 'Charley' },
      ])
    ).toEqual([
      { value: 2, label: 'Bob' },
      { value: 1, label: 'Alice' },
      { value: 3, label: 'Charley' },
    ]);
  });
  test('3 items, sorted by label', () => {
    expect(
      convertDataToOptions(
        [
          { id: 2, name: 'Bob' },
          { id: 1, name: 'Alice' },
          { id: 3, name: 'Charley' },
        ],
        { sort: true }
      )
    ).toEqual([
      { value: 1, label: 'Alice' },
      { value: 2, label: 'Bob' },
      { value: 3, label: 'Charley' },
    ]);
  });
  test('3 items, sorted by key', () => {
    expect(
      convertDataToOptions(
        [
          { id: 2, name: 'Bob', displayOrder: 3 },
          { id: 1, name: 'Alice', displayOrder: 1 },
          { id: 3, name: 'Charley', displayOrder: 2 },
        ],
        { sort: 'displayOrder' }
      )
    ).toEqual([
      { value: 1, label: 'Alice' },
      { value: 3, label: 'Charley' },
      { value: 2, label: 'Bob' },
    ]);
  });
  test('3 items, sorted by deep key', () => {
    expect(
      convertDataToOptions(
        [
          { id: 2, name: 'Bob', meta: { displayOrder: 3 } },
          { id: 1, name: 'Alice', meta: { displayOrder: 1 } },
          { id: 3, name: 'Charley', meta: { displayOrder: 2 } },
        ],
        { sort: 'meta.displayOrder' }
      )
    ).toEqual([
      { value: 1, label: 'Alice' },
      { value: 3, label: 'Charley' },
      { value: 2, label: 'Bob' },
    ]);
  });
  test('3 items, value fn', () => {
    expect(
      convertDataToOptions(
        [
          { id: 2, name: 'Bob' },
          { id: 1, name: 'Alice' },
          { id: 3, name: 'Charley' },
        ],
        { valueKey: (row) => row.id * 10 }
      )
    ).toEqual([
      { value: 20, label: 'Bob' },
      { value: 10, label: 'Alice' },
      { value: 30, label: 'Charley' },
    ]);
  });
  test('3 items, label fn', () => {
    expect(
      convertDataToOptions(
        [
          { id: 2, name: 'Bob' },
          { id: 1, name: 'Alice' },
          { id: 3, name: 'Charley' },
        ],
        { labelKey: (row) => row.name.toUpperCase() }
      )
    ).toEqual([
      { value: 2, label: 'BOB' },
      { value: 1, label: 'ALICE' },
      { value: 3, label: 'CHARLEY' },
    ]);
  });
  test('3 items, label fn, sorted by label', () => {
    expect(
      convertDataToOptions(
        [
          { id: 2, name: 'Bob' },
          { id: 1, name: 'Alice' },
          { id: 3, name: 'Charley' },
        ],
        { labelKey: (row) => row.name.slice(1), sort: true }
      )
    ).toEqual([
      { value: 3, label: 'harley' },
      { value: 1, label: 'lice' },
      { value: 2, label: 'ob' },
    ]);
  });
  test('empty', () => {
    expect(convertDataToOptions([])).toEqual([]);
  });
  test('undefined', () => {
    expect(convertDataToOptions(undefined)).toEqual([]);
  });
});
