import { z } from 'zod';

export const listingSchema = z.object({
  name: z.string().trim().min(3),
  isFeatured: z.boolean(),
  category:z.string().trim().min(1).array().nonempty(),
  description:z.string().trim().min(3),
  keyWords:z.string().trim().min(1).array().nonempty(),
  address:z.string().trim().min(10)
}).strict()