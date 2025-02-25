import { z } from 'zod';

export const productSchemaValidation = z.object({
    name: z.string().trim().min(3,"Name should have minimum 3 characters"),
    isFeatured: z.boolean(),
    category:z.string().trim().array().nonempty(),
    description:z.string().trim().min(3,"Description should have minimum 3 characters"),
    keyWords:z.string().trim().array().nonempty(),
    address:z.string().trim().min(10,"Address should have minimum 3 characters"),
    email: z.string().email("Email is of invalid format"),
    costPrice: z.number().min(1,"Costprice must have one number"),
    markedPrice: z.number().min(1,"Markedpricde must have one number"),
    discount: z.number(),
    count: z.number()
}).strict();