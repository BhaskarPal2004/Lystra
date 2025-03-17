import { z } from 'zod';

export const adReportValidation = z.object({

    message: z.string().trim().min(3, "message should be atleat 3 characters long"),
    isFake :z.optional(z.boolean()),
    isFraudulent:z.optional(z.boolean()),

});