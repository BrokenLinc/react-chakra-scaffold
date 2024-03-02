import { describe, expect, test } from 'vitest';
import { zh } from './zodHelpers';

describe('zodHelpers', () => {
  describe('email.required', () => {
    test('PASS "foo@bar.baz"', () => {
      const result = zh.email().required().safeParse('foo@bar.baz').success;
      expect(result).toBeTruthy();
    });
    test('FAIL "foo bar"', () => {
      const result = zh.email().required().safeParse('foo bar').success;
      expect(result).toBeFalsy();
    });
    test('FAIL ""', () => {
      const result = zh.email().required().safeParse('').success;
      expect(result).toBeFalsy();
    });
    test('FAIL null', () => {
      const result = zh.email().required().safeParse(null).success;
      expect(result).toBeFalsy();
    });
    test('FAIL undefined', () => {
      const result = zh.email().required().safeParse(undefined).success;
      expect(result).toBeFalsy();
    });
  });
  describe('email.nullish', () => {
    test('PASS "foo@bar.baz"', () => {
      const result = zh.email().nullish().safeParse('foo@bar.baz').success;
      expect(result).toBeTruthy();
    });
    test('FAIL "foo bar"', () => {
      const result = zh.email().nullish().safeParse('foo bar').success;
      expect(result).toBeFalsy();
    });
    test('PASS ""', () => {
      const result = zh.email().nullish().safeParse('').success;
      expect(result).toBeTruthy();
    });
    test('PASS null', () => {
      const result = zh.email().nullish().safeParse(null).success;
      expect(result).toBeTruthy();
    });
    test('PASS undefined', () => {
      const result = zh.email().nullish().safeParse(undefined).success;
      expect(result).toBeTruthy();
    });
  });
  describe('intid', () => {
    test('PASS 1', () => {
      const result = zh.intid().safeParse(1).success;
      expect(result).toBeTruthy();
    });
    test('FAIL 0', () => {
      const result = zh.intid().safeParse(0).success;
      expect(result).toBeFalsy();
    });
    test('FAIL -1', () => {
      const result = zh.intid().safeParse(-1).success;
      expect(result).toBeFalsy();
    });
    test('FAIL "foo bar"', () => {
      const result = zh.intid().safeParse('foo bar').success;
      expect(result).toBeFalsy();
    });
    test('FAIL ""', () => {
      const result = zh.intid().safeParse('').success;
      expect(result).toBeFalsy();
    });
    test('FAIL null', () => {
      const result = zh.intid().safeParse(null).success;
      expect(result).toBeFalsy();
    });
    test('FAIL undefined', () => {
      const result = zh.intid().safeParse(undefined).success;
      expect(result).toBeFalsy();
    });
  });
  describe('phone.required', () => {
    test('PASS "1234567890"', () => {
      const result = zh.phone().required().safeParse('1234567890').success;
      expect(result).toBeTruthy();
    });
    test('FAIL "5555555"', () => {
      const result = zh.phone().required().safeParse('5555555').success;
      expect(result).toBeFalsy();
    });
    test('FAIL ""', () => {
      const result = zh.phone().required().safeParse('').success;
      expect(result).toBeFalsy();
    });
    test('FAIL null', () => {
      const result = zh.phone().required().safeParse(null).success;
      expect(result).toBeFalsy();
    });
    test('FAIL undefined', () => {
      const result = zh.phone().required().safeParse(undefined).success;
      expect(result).toBeFalsy();
    });
  });
  describe('phone.nullish', () => {
    test('PASS "1234567890"', () => {
      const result = zh.phone().nullish().safeParse('1234567890').success;
      expect(result).toBeTruthy();
    });
    test('FAIL "5555555"', () => {
      const result = zh.phone().nullish().safeParse('5555555').success;
      expect(result).toBeFalsy();
    });
    test('PASS ""', () => {
      const result = zh.phone().nullish().safeParse('').success;
      expect(result).toBeTruthy();
    });
    test('PASS null', () => {
      const result = zh.phone().nullish().safeParse(null).success;
      expect(result).toBeTruthy();
    });
    test('PASS undefined', () => {
      const result = zh.phone().nullish().safeParse(undefined).success;
      expect(result).toBeTruthy();
    });
  });
  describe('string.required', () => {
    test('PASS "foo bar"', () => {
      const result = zh.string().required().safeParse('test').success;
      expect(result).toBeTruthy();
    });
    test('FAIL ""', () => {
      const result = zh.string().required().safeParse('').success;
      expect(result).toBeFalsy();
    });
    test('FAIL null', () => {
      const result = zh.string().required().safeParse(null).success;
      expect(result).toBeFalsy();
    });
    test('FAIL undefined', () => {
      const result = zh.string().required().safeParse(undefined).success;
      expect(result).toBeFalsy();
    });
  });
  describe('string.nullish', () => {
    test('PASS "foo bar"', () => {
      const result = zh.string().nullish().safeParse('test').success;
      expect(result).toBeTruthy();
    });
    test('PASS ""', () => {
      const result = zh.string().nullish().safeParse('').success;
      expect(result).toBeTruthy();
    });
    test('PASS null', () => {
      const result = zh.string().nullish().safeParse(null).success;
      expect(result).toBeTruthy();
    });
    test('PASS undefined', () => {
      const result = zh.string().nullish().safeParse(undefined).success;
      expect(result).toBeTruthy();
    });
  });
  describe('url.required', () => {
    test('PASS "http://www.google.com"', () => {
      const result = zh
        .url()
        .required()
        .safeParse('http://www.google.com').success;
      expect(result).toBeTruthy();
    });
    test('FAIL "www.google.com"', () => {
      const result = zh.url().required().safeParse('www.google.com').success;
      expect(result).toBeFalsy();
    });
    test('FAIL "foo bar"', () => {
      const result = zh.url().required().safeParse('foo bar').success;
      expect(result).toBeFalsy();
    });
    test('FAIL ""', () => {
      const result = zh.url().required().safeParse('').success;
      expect(result).toBeFalsy();
    });
    test('FAIL null', () => {
      const result = zh.url().required().safeParse(null).success;
      expect(result).toBeFalsy();
    });
    test('FAIL undefined', () => {
      const result = zh.url().required().safeParse(undefined).success;
      expect(result).toBeFalsy();
    });
  });
  describe('url.nullish', () => {
    test('PASS "http://www.google.com"', () => {
      const result = zh
        .url()
        .nullish()
        .safeParse('http://www.google.com').success;
      expect(result).toBeTruthy();
    });
    test('FAIL "www.google.com"', () => {
      const result = zh.url().required().safeParse('www.google.com').success;
      expect(result).toBeFalsy();
    });
    test('FAIL "foo bar"', () => {
      const result = zh.url().nullish().safeParse('foo bar').success;
      expect(result).toBeFalsy();
    });
    test('PASS ""', () => {
      const result = zh.url().nullish().safeParse('').success;
      expect(result).toBeTruthy();
    });
    test('PASS null', () => {
      const result = zh.url().nullish().safeParse(null).success;
      expect(result).toBeTruthy();
    });
    test('PASS undefined', () => {
      const result = zh.url().nullish().safeParse(undefined).success;
      expect(result).toBeTruthy();
    });
  });
  describe('uuid', () => {
    test('PASS "00000000-0000-0000-0000-000000000000"', () => {
      const result = zh
        .uuid()
        .safeParse('00000000-0000-0000-0000-000000000000').success;
      expect(result).toBeTruthy();
    });
    test('FAIL "foo bar"', () => {
      const result = zh.uuid().safeParse('foo bar').success;
      expect(result).toBeFalsy();
    });
    test('FAIL 1', () => {
      const result = zh.uuid().safeParse(1).success;
      expect(result).toBeFalsy();
    });
    test('FAIL ""', () => {
      const result = zh.uuid().safeParse('').success;
      expect(result).toBeFalsy();
    });
    test('FAIL null', () => {
      const result = zh.uuid().safeParse(null).success;
      expect(result).toBeFalsy();
    });
    test('FAIL undefined', () => {
      const result = zh.uuid().safeParse(undefined).success;
      expect(result).toBeFalsy();
    });
  });
});
