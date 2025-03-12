import { z } from 'zod';
import { addressSchemaValidation} from './validateAddress.js';

// const category = ['electronics', 'vehicles', 'real estate', 'home and furniture', 'jobs and services', 'fashion and beauty']
// const listingType = ['service', 'product', 'secondHandProduct', 'others']
const condition = ["new", "used", "refurbished"]

// const performanceSchema = z.object({
//   views: z.number().optional(),
//   clicks: z.number().optional()
// })


export const adSchema = z.object({
  name: z.string().trim().min(3),
  category: z.string().trim().min(3),
  subCategory: z.optional(z.string().trim().min(3)),
  description: z.string().trim().min(3),
  details: z.optional(z.record(z.string(), z.union([z.string(), z.number()]))),
  price: z.number().nonnegative(),
  address: z.optional(addressSchemaValidation),
  condition: z.enum(condition),
}).strict()


// export const updateAdSchema = z.object({
//   name: z.optional(z.string().trim().min(3)),
//   isFeatured: z.optional(z.boolean()),
//   listingType: z.optional(z.enum(listingType)),
//   category: z.optional(z.enum(category)),
//   subCategory: z.optional(z.string().trim().min(3)),
//   description: z.optional(z.string().trim().min(3)),
//   details: z.optional(z.record(z.string(), z.union([z.string(), z.number()]))),
//   images: z.optional(z.array(z.string().trim().min(3)).nonempty()),
//   price: z.optional(z.number().nonnegative()),
//   performance: z.optional(performanceSchema),
//   condition: z.optional(z.enum(condition)),
//   expireInDays: z.optional(z.number().nonnegative().max(90)),
//   address: z.optional(updateAddressSchemaValidation),
// }).strict()

export const renewAdSchema = z.object({
  expireInDays: z.number().min(1).max(90)
}).strict()
