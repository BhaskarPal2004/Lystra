import { z } from 'zod';

export const productSchemaValidation = z.object({
    name: z.string().trim().min(3,"Name should have minimum 3 characters"),
    isFeatured: z.boolean(),
    category:z.string().trim().min(1,"catagory Should have minimum one character").array().nonempty(),
    description:z.string().trim().min(3,"Description should have minimum 3 characters"),
    keyWords:z.string().trim().min(1,"keyword Should have minimum one character").array().nonempty(),
    address:z.string().trim().min(10,"Address should have minimum 3 characters"),
    costPrice: z.number().min(1,"Costprice must have one number"),
    markedPrice: z.number().min(1,"Markedpricde must have one number"),
    discount: z.optional(z.number().min(1,"discount must have 1 number")),
    count: z.number()
}).strict();