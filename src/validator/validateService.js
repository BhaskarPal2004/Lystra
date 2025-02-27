import { z } from 'zod';

export const serviceSchemaValidation = z.object({
    name: z.string().trim().min(3,"Name should have minimum 3 characters"),
    // isFeatured: z.boolean(),
    category:z.string().trim().min(1,"catagory Should have minimum one character").array().nonempty(),
    description:z.string().trim().min(3,"Description should have minimum 3 characters"),
    // rate:z.string().trim().min(5,"rate must have 5 character")
    // .refine((rate) => /[0-5]/.test(rate), { message: "rate should contain number" })
}).strict();

