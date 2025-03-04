import { z } from 'zod';
const TYPE = ['cod', 'upi', 'card']
const STATUS = ['pending', 'paid', 'cancelled']

export const paymentSchema = z.object({
  amount: z.number().min(1, "Minimum 1 number required"),
  paymentType: z.enum(TYPE),
  status: z.enum(STATUS)

}).strict()