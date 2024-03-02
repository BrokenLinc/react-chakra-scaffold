import axios from 'axios';
import { useQuery } from 'react-query';
import { z } from 'zod';
import { zh } from './helpers/zodHelpers';

export const sampleInputSchema = z.object({
  name: zh.string().required(),
});
export type SampleInput = z.infer<typeof sampleInputSchema>;

export const sampleSchema = sampleInputSchema.extend({
  id: zh.uuid(),
});
export type Sample = z.infer<typeof sampleSchema>;

const baseApiPath = '/samples';
const baseQueryKey = 'samples';

export const useSamples = () => {
  return useQuery<Sample[], Error>(baseQueryKey, () =>
    axios.get(baseApiPath).then((res) => res.data)
  );
};

export const useSample = (id: string) => {
  return useQuery<Sample, Error>([baseQueryKey, id], () =>
    axios.get(`${baseApiPath}/${id}`).then((res) => res.data)
  );
};
