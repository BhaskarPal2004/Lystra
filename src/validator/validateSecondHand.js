import { z } from 'zod';
const VALUES = ['NEW','OLD', 'MINT', 'REFURBISHED'] 

export const secondHandModelSchema = z.object({
  name: z.string().trim().min(3),
  isFeatured: z.boolean(),
  category:z.string().trim().min(1).array().nonempty(),
  description:z.string().trim().min(3),
  keyWords:z.string().trim().min(1).array().nonempty(),
  address:z.string().trim().min(10),
  price:z.number(),
  boughtOn:z.string().date(),
  condition:z.union([z.enum(VALUES),z.null()]),
  listedOn:z.string().date()
}).strict()