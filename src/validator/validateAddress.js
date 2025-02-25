import { z } from 'zod';

export const addressSchemaValidation = z.object({
    // name: z.string().trim().min(3,"Name should have minimum 3 characters"),
    line1: z.string({
        required_error :"address is required"
    }).trim().min(6,"address should contain 6 character"),
    line2: z.optional(z.string().trim().min(3,"address should contain 3 character")),
    state: z.string().trim().min(3,"state name have three character"),
    city: z.string().trim().min(3,"state name have three character"),
    landMark: z.optional(z.string().trim().min(5,"land mark must have 5 character")),
    pinCode: z.number().int() // Make sure it's an integer
    .gte(100000) // Greater than or equal to the smallest 5 digit int
    .lte(999999)
});