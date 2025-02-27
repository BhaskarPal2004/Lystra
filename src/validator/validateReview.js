import { z } from 'zod';

export const reviewSchemaValidation = z.object({
    rating: z.optional( z.number().int() 
    .gte(0) 
    .lte(5)),
    review:z.optional(z.string().min(5,"review must have five character"))
});
