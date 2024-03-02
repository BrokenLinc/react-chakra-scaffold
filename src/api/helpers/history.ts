import { z } from 'zod';
import { zh } from './zodHelpers';

export const historySchema = z.object({
  // _seq is a numeric bigint identifier
  _seq: z.number().int(),
  modifiedByEmail: zh.email().required(),
  modifiedByFirstName: zh.string().required(),
  modifiedByLastName: zh.string().required(),
  createdAt: z.date(),
});
export type History = z.infer<typeof historySchema>;
