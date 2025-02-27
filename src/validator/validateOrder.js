import { z } from 'zod';
const VALUES = ['created', 'confirmed', 'shipped', 'cancelled', 'delivered', 'failure']

export const orderSchema = z.object({
  status:z.union([z.enum(VALUES),z.null()])
}).strict()