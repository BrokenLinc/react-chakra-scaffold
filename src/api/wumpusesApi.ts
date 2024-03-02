import { delay } from '@@helpers/delay';
import * as UI from '@@ui';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { z } from 'zod';
import { zh } from './helpers/zodHelpers';

const baseQueryKey = 'wumpuses';

export const wumpusSchema = z.object({
  id: zh.intid(),
  firstName: zh.string().required(),
  lastName: zh.string().required(), //.min(2).or(z.literal('')).nullish(), // optional string with requirements
  phone: zh.phone().nullish(),
  businessPhone: zh.phone().nullish(),
  email: zh.email().nullish(),
  zip: zh.string(11, 5).nullish(),
  profilePhoto: zh.string().nullish(),
  bio: zh.string().nullish(),
  color: zh.string().nullish(),
  pet: zh.string().nullish(),
  location1Id: zh.intid().nullish(),
  location1: z
    .object({
      id: zh.intid(),
      name: zh.string().required(),
    })
    .nullish(),
  location2Id: zh.intid().nullish(),
  location2: z
    .object({
      id: zh.intid(),
      name: zh.string().required(),
    })
    .nullish(),
  location3Id: zh.intid().nullish(),
  location3: z
    .object({
      id: zh.intid(),
      name: zh.string().required(),
    })
    .nullish(),
  location4Id: zh.intid().nullish(),
  location4: z
    .object({
      id: zh.intid(),
      name: zh.string().required(),
    })
    .nullish(),
  percent: z.number(),
  price: z.number().nullish(),
  isActive: z.boolean().nullish(),
  agreedToTerms: z
    .literal(true, {
      errorMap: () => ({ message: 'You must agree to the terms & conditions' }),
    })
    .nullish(),
  deadline: z.date().nullish(),
  deadlineRestricted: z.date().nullish(),
  eventDates: z
    .array(z.date())
    .length(2, 'A start and end date are required')
    .nullish(),
  fruit: z.array(z.object({ id: zh.intid() })).nullish(),
  isDeleted: z.boolean().optional(),
});

export type Wumpus = z.infer<typeof wumpusSchema>;

const rawData: Wumpus[] = [
  {
    id: 1,
    firstName: 'Albert',
    lastName: 'Anderson',
    percent: 18,
    isActive: true,
    phone: '1234567890',
    businessPhone: '1234567890',
    email: 'albert.anderson@gmail.com',
    zip: '90210',
    deadline: new Date(),
    color: 'red',
    price: 100,
  },
  {
    id: 2,
    firstName: 'Bert',
    lastName: 'Bertson',
    percent: 19,
    isActive: true,
    phone: '1234567890',
    businessPhone: '1234567890',
    email: 'bert.bertson@gmail.com',
    zip: '90210',
    color: 'red',
  },
  {
    id: 3,
    firstName: 'Charles',
    lastName: 'Charletson',
    percent: 20,
    isActive: true,
    phone: '1234567890',
    businessPhone: '1234567890',
    color: 'green',
    price: 420.69,
    zip: '90210',
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Davidson',
    percent: 21,
    isActive: true,
    phone: '1234567890',
    businessPhone: '1234567890',
    deadline: new Date(),
    color: 'green',
    zip: '90210',
  },
  {
    id: 5,
    firstName: 'Edward',
    lastName: 'Edwards',
    percent: 22,
    email: 'edward.edwards@gmail.com',
    deadline: new Date(),
    color: 'blue',
    price: 352,
  },
  {
    id: 6,
    firstName: 'Frank',
    lastName: 'Franklin',
    percent: 23,
    isActive: true,
    email: 'frank.franklin@gmail.com',
    color: 'blue',
  },
  {
    id: 7,
    firstName: 'George',
    lastName: 'Georgetown',
    percent: 24,
    isActive: true,
    deadline: new Date(),
    price: 666,
  },
  {
    id: 8,
    firstName: 'Henry',
    lastName: 'Henrietta',
    percent: 25,
    isActive: true,
    price: 19.99,
  },
  {
    id: 9,
    firstName: 'Isaac',
    lastName: 'Isaacson',
    percent: 26,
    isActive: false,
    phone: '1234567890',
    businessPhone: '1234567890',
    email: 'isaac.isaacson@gmail.com',
    zip: '90210',
  },
  {
    id: 10,
    firstName: 'John',
    lastName: 'Johnson',
    percent: 27,
    isActive: false,
    phone: '1234567890',
    businessPhone: '1234567890',
    email: 'john.johnson@gmail.com',
    zip: '90210',
    deadline: new Date(),
    color: 'red',
    price: 602,
  },
  {
    id: 11,
    firstName: 'Karl',
    lastName: 'Karlson',
    percent: 28,
    phone: '1234567890',
    businessPhone: '1234567890',
    deadline: new Date(),
    color: 'red',
    zip: '90210',
  },
  {
    id: 12,
    firstName: 'Louis',
    lastName: 'Louisville',
    percent: 29,
    isActive: false,
    phone: '1234567890',
    businessPhone: '1234567890',
    color: 'green',
    price: 17,
    zip: '90210',
  },
  {
    id: 13,
    firstName: 'Martin',
    lastName: 'Martinson',
    percent: 30,
    isActive: false,
    email: 'martin.martinson@gmail.com',
    color: 'green',
  },
  {
    id: 14,
    firstName: 'Nathan',
    lastName: 'Nathanson',
    percent: 31,
    isActive: false,
    email: 'nathan.nathanson@gmail.com',
    price: 30.0,
  },
  {
    id: 15,
    firstName: 'Olli',
    lastName: 'Oliver',
    percent: 32,
    deadline: new Date(),
    price: 99,
  },
  {
    id: 16,
    firstName: 'Peter',
    lastName: 'Peterson',
    percent: 33,
    isActive: false,
    deadline: new Date(),
    color: 'blue',
  },
];

export const useWumpuses = () => {
  return useQuery<Wumpus[], Error>(baseQueryKey, async () => {
    await delay(1000);
    return rawData;
  });
};

export const useSearchWumpuses = (params: UI.DataGridParams<Wumpus>) => {
  return useQuery<Wumpus[], Error>(
    [baseQueryKey, 'search', params],
    async () => {
      await delay(1000);
      return _.sampleSize(rawData, params.pagination?.pageSize || 10);
    }
  );
};
