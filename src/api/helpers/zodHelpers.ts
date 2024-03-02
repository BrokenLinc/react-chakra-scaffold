import { z } from 'zod';

/**
 * A note on the email(), phone(), string() and url() methods:
 *
 * The app's string validation is a bit more complicated than the basic zod.string().
 * - Max length checks are done first, then min length checks after a whitespace trim().
 * - Required checks should not allow empty strings.
 * - Nullish checks should also allow empty strings.
 * Note that when you use these methods, you must call either required() or nullish().
 */

export const zh = {
  email: () => {
    return {
      // required fields should not allow empty strings, or whitespace strings
      required: () => z.string().email().max(100).trim().min(1),
      // allow empty strings for nullish (optional) fields
      nullish: () => z.string().email().max(100).or(z.literal('')).nullish(),
    };
  },
  intid: () => z.number().int().positive(),
  phone: () => {
    return {
      // required fields should not allow empty strings, or whitespace strings
      required: () => z.string().trim().min(10),
      // allow empty strings for nullish (optional) fields
      nullish: () => z.string().trim().min(10).or(z.literal('')).nullish(),
    };
  },
  string: (max?: number, min?: number) => {
    return {
      required: () => {
        let schema = z.string();
        if (max !== undefined) {
          schema = schema.max(max);
        }
        // remove whitespace before min check (this doesn't mutate the input value)
        // required fields should not allow empty strings, or whitespace strings
        schema = schema.trim().min(min ?? 1);
        return schema;
      },
      nullish: () => {
        let schema = z.string();
        if (max !== undefined) {
          schema = schema.max(max);
        }
        if (min !== undefined) {
          // remove whitespace before min check (this doesn't mutate the input value)
          schema = schema.trim().min(min);
        }
        // allow empty strings for nullish (optional) fields
        return schema.or(z.literal('')).nullish();
      },
    };
  },
  url: () => {
    return {
      // required fields should not allow empty strings, or whitespace strings
      required: () => z.string().url().trim().min(1),
      // allow empty strings for nullish (optional) fields
      nullish: () => z.string().url().or(z.literal('')).nullish(),
    };
  },
  uuid: () => z.string().uuid(),
};
