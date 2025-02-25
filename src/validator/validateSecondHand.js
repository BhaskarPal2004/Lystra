import { z, ZodError } from 'zod';
const VALUES = ['NEW','OLD', 'MINT', 'REFURBISHED'] 

export const secondHandModelSchema = z.object({
  name: z.string().trim().min(3,"Name should have minimum 3 characters"),
  isFeatured: z.boolean(),
  category:z.string().trim().min(1,"Category should have minimum 1 character").array().nonempty(),
  description:z.string().trim().min(3,"Description should have minimum 3 characters"),
  keyWords:z.string().trim().min(1,"keyWords should have minimum 1 character").array().nonempty(),
  address:z.string().trim().min(10,"Address should have minimum 3 characters"),
  price:z.number(),
  boughtOn:z.string().date(),
  condition:z.union([z.enum(VALUES),z.null()]),
  listedOn:z.string().date()
}).strict()