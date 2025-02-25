import { z, ZodError } from 'zod';

export const listingSchema = z.object({
  name: z.string().trim().min(3,"Name should have minimum 3 characters"),
  isFeatured: z.boolean(),
  category:z.string().trim().array().nonempty(),
  description:z.string().trim().min(3,"Description should have minimum 3 characters"),
  keyWords:z.string().trim().array().nonempty(),
  address:z.string().trim().min(10,"Address should have minimum 3 characters")
}).strict()