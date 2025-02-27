import { z } from 'zod';

const category = ['electronics', 'vehicles', 'real estate', 'home and furniture', 'jobs and services', 'fashion and beauty']
const listingType = ['service', 'product', 'secondHandProduct', 'others']

const performanceSchema = z.object({
  views:z.number().optional(),
  clicks:z.number().optional()
})


export const adSchema = z.object({
  name: z.string().trim().min(3),
  isFeatured: z.optional(z.boolean()),
  listingType:z.enum(listingType),
  category:z.enum(category),
  subCategory:z.string().trim().min(3),
  description:z.string().trim().min(3),
  details:z.record(z.string(),z.union([z.string(),z.number()])),
  images:z.optional(z.array(z.string().trim().min(3)).nonempty()),
  price:z.number(),
  performance:z.optional(performanceSchema),
  userId:z.string()
}).strict()



 