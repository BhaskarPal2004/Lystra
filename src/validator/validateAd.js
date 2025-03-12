import { z } from 'zod';
import { addressSchemaValidation, updateAddressSchemaValidation} from './validateAddress.js';

const condition = ["new", "used", "refurbished"]




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


export const updateAdSchema = z.object({
  name: z.string().trim().min(3),
  category: z.string().trim().min(3),
  subCategory: z.string().trim().min(3),
  description: z.string().trim().min(3),
  details: z.record(z.string(), z.union([z.string(), z.number()])),
  price: z.number().nonnegative(),
  condition: z.enum(condition),
  expireInDays: (z.number().nonnegative().max(90)),
  address:updateAddressSchemaValidation,
}).partial()

export const renewAdSchema = z.object({
  expireInDays: z.number().min(1).max(90)
}).strict()
