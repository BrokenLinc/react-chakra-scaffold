import { describe, expect, test } from 'vitest';
import { getColumnSortDirection } from './getColumnSortDirection';

describe('getColumnSortDirection', () => {
  test('single key, unsorted', () => {
    expect(
      getColumnSortDirection(
        {
          columns: [
            {
              key: 'id',
            },
          ],
        },
        'id'
      )
    ).toBeUndefined();
  });
  test('single key, sorted', () => {
    expect(
      getColumnSortDirection(
        {
          columns: [
            {
              key: 'id',
            },
          ],
          params: {
            sortingOptions: [
              {
                field: 'id',
                direction: 'ASC',
              },
            ],
          },
        },
        'id'
      )
    ).toBe('ASC');
  });
  test('single key override, sorted', () => {
    expect(
      getColumnSortDirection(
        {
          columns: [
            {
              key: 'id',
              sortableKeys: ['firstName'],
            },
          ],
          params: {
            sortingOptions: [
              {
                field: 'firstName',
                direction: 'ASC',
              },
            ],
          },
        },
        'id'
      )
    ).toBe('ASC');
  });
  test('multiple key override, sorted', () => {
    expect(
      getColumnSortDirection(
        {
          columns: [
            {
              key: 'id',
              sortableKeys: ['firstName', 'lastName'],
            },
          ],
          params: {
            sortingOptions: [
              {
                field: 'firstName',
                direction: 'ASC',
              },
              {
                field: 'lastName',
                direction: 'ASC',
              },
            ],
          },
        },
        'id'
      )
    ).toBe('ASC');
  });
  test('multiple key override, sorted but partial', () => {
    expect(
      getColumnSortDirection(
        {
          columns: [
            {
              key: 'id',
              sortableKeys: ['firstName', 'lastName'],
            },
          ],
          params: {
            sortingOptions: [
              {
                field: 'firstName',
                direction: 'ASC',
              },
            ],
          },
        },
        'id'
      )
    ).toBeUndefined();
  });
  test('multiple key override, sorted but inconsistent direction', () => {
    expect(
      getColumnSortDirection(
        {
          columns: [
            {
              key: 'id',
              sortableKeys: ['firstName', 'lastName'],
            },
          ],
          params: {
            sortingOptions: [
              {
                field: 'firstName',
                direction: 'ASC',
              },
              {
                field: 'lastName',
                direction: 'DESC',
              },
            ],
          },
        },
        'id'
      )
    ).toBeUndefined();
  });
  test('no columns/sorting', () => {
    expect(getColumnSortDirection({ columns: [] }, 'id')).toBeUndefined();
  });
});
