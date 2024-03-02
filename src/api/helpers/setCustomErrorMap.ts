import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // Due to the form inputs conforming type, the invalid_type error
  //   will usually only be seen with null or undefined (ie. empty field)
  if (issue.code === z.ZodIssueCode.invalid_type) {
    return { message: 'Required' };
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'string') {
      return { message: `Maximum ${issue.maximum} characters` };
    }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string') {
      if (issue.minimum === 1) return { message: 'Required' };
      return { message: `Minimum ${issue.minimum} characters` };
    }
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
