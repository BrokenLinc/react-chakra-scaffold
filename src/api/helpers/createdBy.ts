import _ from 'lodash';
import { z } from 'zod';
import { zh } from './zodHelpers';

export const createdBySchema = z.object({
  email: zh.email().nullish(),
  firstName: zh.string().nullish(),
  lastName: zh.string().nullish(),
});
export type CreatedBy = z.infer<typeof createdBySchema>;

export const getCreatedByLabel = (createdBy?: CreatedBy | null) => {
  let authorName = _.compact([createdBy?.firstName, createdBy?.lastName]).join(
    ' '
  );
  if (!authorName) authorName = createdBy?.email || 'Anonymous User';
  return authorName;
};
